import React, { createContext, useContext, useMemo, useState } from "react";
import { createClient, LiveList } from "@liveblocks/client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";

// const client = createClient({
//   publicApiKey:
//     "pk_dev_uwuBTBbWy-iL1g68dfTGfu7RD-s565GYBfcyZx0Wl56GyZ7_b4lcadfSIrXQvrgK",
// });

const WhiteboardContext = createContext({
  isOpen: false,
  setOpen: (_open) => {},
  toggle: () => {},
  role: "teacher",
  canDraw: true,
});

export function WhiteboardProvider({
  children,
  roomId = "liveclass-room",
  role = "teacher", // "teacher" | "student"
}) {
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(
    () => ({
      isOpen,
      setOpen,
      toggle: () => setOpen((v) => !v),
      role,
      canDraw: role === "teacher",
    }),
    [isOpen, role]
  );

  return (
    <WhiteboardContext.Provider value={value}>
      <LiveblocksProvider
        publicApiKey={
          "pk_dev_uwuBTBbWy-iL1g68dfTGfu7RD-s565GYBfcyZx0Wl56GyZ7_b4lcadfSIrXQvrgK"
        }
      >
        <RoomProvider
          id={roomId}
          initialPresence={{ cursor: null, color: "#22d3ee" }}
          initialStorage={{ strokes: new LiveList([]) }}
        >
          {children}
        </RoomProvider>
      </LiveblocksProvider>
    </WhiteboardContext.Provider>
  );
}

export function useWhiteboard() {
  return useContext(WhiteboardContext);
}
