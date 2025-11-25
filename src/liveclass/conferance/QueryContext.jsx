import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useHMSActions,
  useHMSStore,
  selectLocalPeer,
  selectHMSMessages,
} from "@100mslive/react-sdk";

const QueryContext = createContext(null);
const TAG = "queries-v1";

// Add: initial seed queries and stable IDs
const INITIAL_QUERY_TEXTS = [
  "At what temperature does pure water boil when measured at standard atmospheric pressure?",
  "Can you describe the primary function of chlorophyll in green foliage?",
  "Would you please detail the essential steps required for a plant to convert light energy into chemical energy?",
  "Could you tell me what the boiling point is for H₂O at sea level?",
  "What is the mechanism by which plants synthesize their own food using sunlight?",
  "What is the thermal point at which liquid water turns into a gas?",
  "What are the core differences that exist between the mitochondrion and the chloroplast?",
  "Could you explain how the process of photosynthesis is actually carried out in a typical plant cell?",
  "What is the molecular formula for water, and exactly how many atoms does that molecule contain?",
  "Can you explain the cellular procedure where plants create glucose from carbon dioxide and water?",
];

// Simple stable hash for consistent IDs across peers
function stableIdFromText(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (h * 33) ^ text.charCodeAt(i);
  return `seed-${(h >>> 0).toString(16)}`;
}

function seedInitialQueries() {
  const now = Date.now();
  return INITIAL_QUERY_TEXTS.map((t, i) => ({
    id: stableIdFromText(t),
    text: t,
    createdAt: now + i, // preserves order
    authorId: "system",
    authorName: "System",
  }));
}

export function QueryProvider({ children }) {
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  const messages = useHMSStore(selectHMSMessages);

  const [queries, setQueries] = useState(() => seedInitialQueries()); // pre-populated
  const [uniqueQueries, setUniqueQueries] = useState(null);
  const [isClustering, setIsClustering] = useState(false);
  const [error, setError] = useState(null);

  // Prevent re-processing the same HMS message (avoids loops)
  const lastProcessedMsgKeyRef = useRef(null);

  const myId = localPeer?.id;
  const myName = localPeer?.name || "Anonymous";

  const dedupeById = useCallback((arr) => {
    const seen = new Set();
    const out = [];
    for (const q of arr) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        out.push(q);
      }
    }
    return out;
  }, []);

  const send = useCallback(
    async (payload) => {
      try {
        await hmsActions.sendBroadcastMessage(JSON.stringify(payload));
      } catch {
        // no-op
      }
    },
    [hmsActions]
  );

  const addQuery = useCallback(
    async (text) => {
      const trimmed = text?.trim();
      if (!trimmed) return;
      const q = {
        id: crypto.randomUUID(),
        text: trimmed,
        createdAt: Date.now(),
        authorId: myId,
        authorName: myName,
      };
      setQueries((prev) => dedupeById([...prev, q]));
      await send({ t: TAG, op: "add", q });
    },
    [dedupeById, myId, myName, send]
  );

  const clearQueries = useCallback(async () => {
    setQueries([]);
    setUniqueQueries(null);
    await send({ t: TAG, op: "clear" });
  }, [send]);

  const clusterQueries = useCallback(async () => {
    if (!queries.length) return;
    setIsClustering(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/courses/cluster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queries: queries.map((q) => q.text) }),
      });
      if (!res.ok)
        throw new Error(`Cluster API failed: ${res.status} ${res.statusText}`);
      const data = await res.json();

      // Expect API to return { unique_queries: string[] }
      const list = Array.isArray(data?.unique_queries)
        ? data.unique_queries
        : Array.isArray(data?.uniqueQueries)
        ? data.uniqueQueries
        : [];
      const unique = Array.from(
        new Set(
          list
            .map((it) => (typeof it === "string" ? it.trim() : String(it)))
            .filter(Boolean)
        )
      );
      setUniqueQueries(unique);
    } catch (e) {
      setError(e.message || "Failed to cluster");
    } finally {
      setIsClustering(false);
    }
  }, [queries]);

  // Incoming message handler
  useEffect(() => {
    if (!messages?.length) return;
    // Only handle latest message per render; HMS appends new messages, so process the tail window
    const latest = messages[messages.length - 1];
    if (typeof latest?.message !== "string") return;

    // Build a stable key for the latest message to avoid re-processing it
    const msgSender = latest.sender?.id || latest.from || latest.clientId || "";
    const msgTs = latest.ts || latest.time || latest.timestamp || "";
    const msgKey = `${msgSender}::${msgTs}::${latest.message}`;
    if (lastProcessedMsgKeyRef.current === msgKey) return;
    lastProcessedMsgKeyRef.current = msgKey;

    try {
      const msg = JSON.parse(latest.message);
      if (msg?.t !== TAG) return;

      switch (msg.op) {
        case "add": {
          const q = msg.q;
          if (q?.id) {
            setQueries((prev) => {
              if (prev.some((x) => x.id === q.id)) return prev;
              return dedupeById(
                [...prev, q].sort((a, b) => a.createdAt - b.createdAt)
              );
            });
          }
          break;
        }
        case "clear": {
          setQueries([]);
          setUniqueQueries(null);
          break;
        }
        case "sync_req": {
          // Ignore requests originating from self
          if (msg.from === myId) break;
          // Respond with current queries only
          send({ t: TAG, op: "sync_state", queries });
          break;
        }
        case "sync_state": {
          // Merge queries only (clusters are local-only)
          if (Array.isArray(msg.queries)) {
            setQueries((prev) =>
              dedupeById([...prev, ...msg.queries]).sort(
                (a, b) => a.createdAt - b.createdAt
              )
            );
          }
          break;
        }
        default:
          break;
      }
    } catch {
      // ignore non-JSON or unrelated messages
    }
  }, [messages, queries, dedupeById, send, myId]);

  // Ask for sync when joining/opening the panel (ensures late joiners get history)
  const requestedSyncRef = useRef(false);
  useEffect(() => {
    if (!requestedSyncRef.current) {
      requestedSyncRef.current = true;
      send({ t: TAG, op: "sync_req", from: myId, ts: Date.now() });
    }
  }, [send, myId]);

  const value = useMemo(
    () => ({
      queries,
      uniqueQueries,
      isClustering,
      error,
      addQuery,
      clearQueries,
      clusterQueries,
    }),
    [
      queries,
      uniqueQueries,
      isClustering,
      error,
      addQuery,
      clearQueries,
      clusterQueries,
    ]
  );

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
}

export const useQueries = () => useContext(QueryContext);
