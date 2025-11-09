import React, { useEffect, useMemo, useRef, useState } from "react";
import { LiveList, LiveObject } from "@liveblocks/client";
import {
  useMutation,
  useMyPresence,
  useOthers,
  useStorage,
} from "@liveblocks/react";
import { useWhiteboard } from "./WhiteboardProvider";
import { Eraser, Palette, RotateCcw } from "lucide-react";

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#22d3ee",
  "#6366f1",
  "#a855f7",
  "#f472b6",
  "#ffffff",
  "#000000",
];

export default function Whiteboard() {
  const { isOpen } = useWhiteboard();
  if (!isOpen) return null;
  return <WhiteboardCanvas />;
}

function WhiteboardCanvas() {
  const { canDraw } = useWhiteboard();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#22d3ee");
  const [size, setSize] = useState(3);

  const [presence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  const strokes = useStorage((root) => root.strokes);

  const startStroke = useMutation(({ storage }, pt) => {
    const list = storage.get("strokes"); // LiveList
    const stroke = new LiveObject({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      color: pt.color,
      size: pt.size,
      points: new LiveList([{ x: pt.x, y: pt.y }]),
    });
    list.push(stroke);
  }, []);

  const addPoint = useMutation(({ storage }, pt) => {
    const list = storage.get("strokes");
    const len = list.length;
    if (len === 0) return;
    const last = list.get(len - 1);
    const points = last.get("points");
    points.push({ x: pt.x, y: pt.y });
  }, []);

  const clearAll = useMutation(({ storage }) => {
    storage.get("strokes").clear();
  }, []);

  const undo = useMutation(({ storage }) => {
    const list = storage.get("strokes");
    if (list.length > 0) {
      list.delete(list.length - 1);
    }
  }, []);

  // Canvas DPI and redraw
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Grid (subtle)
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    const step = 24;
    for (let x = 0; x < rect.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(rect.width, y + 0.5);
      ctx.stroke();
    }

    // Draw strokes
    if (!strokes || strokes.length === 0) return;

    for (let i = 0; i < strokes.length; i++) {
      const s = strokes[i]; // CHANGED: array access
      const pts = s.points || []; // CHANGED: property access
      if (pts.length < 2) continue;

      ctx.strokeStyle = s.color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = s.size;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let j = 1; j < pts.length; j++) {
        ctx.lineTo(pts[j].x, pts[j].y);
      }
      ctx.stroke();
    }
  };

  useEffect(() => {
    const handle = () => redraw();
    handle();
    // listen to window resize for canvas fit
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // Redraw whenever storage changes (deep updates trigger this hook)
  useEffect(() => {
    redraw();
  }, [strokes]); // CHANGED: rely on proxy updates instead of manual subscriptions

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      const t = e.touches[0];
      clientX = t.clientX;
      clientY = t.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const onPointerDown = (e) => {
    if (!canDraw) return;
    e.preventDefault();
    const pos = getPos(e);
    startStroke({ x: pos.x, y: pos.y, color, size });
    setIsDrawing(true);
    updateMyPresence({ cursor: { x: pos.x, y: pos.y }, color });
  };

  const onPointerMove = (e) => {
    if (!canDraw) return;
    const pos = getPos(e);
    if (isDrawing) {
      addPoint({ x: pos.x, y: pos.y });
      redraw();
    }
    updateMyPresence({ cursor: { x: pos.x, y: pos.y }, color });
  };

  const endDrawing = () => {
    if (!canDraw) return;
    setIsDrawing(false);
    updateMyPresence({ cursor: null });
  };

  const othersCursors = useMemo(
    () =>
      others
        .map((u) => ({
          id: u.connectionId,
          cursor: u.presence?.cursor,
          color: u.presence?.color || "#22d3ee",
        }))
        .filter((u) => u.cursor),
    [others]
  );

  return (
    <div className="fixed inset-x-4 md:inset-x-6 bottom-24 z-40">
      <div
        ref={containerRef}
        className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-gray-800"
      >
        {/* Toolbar (hidden for students) */}
        {canDraw ? (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-gray-900/80 backdrop-blur px-3 py-2 rounded-md border border-gray-700">
            <Palette className="w-4 h-4 text-white/80" />
            <div className="flex items-center gap-1">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="w-5 h-5 rounded-full border border-white/30"
                  style={{
                    backgroundColor: c,
                    outline: c === color ? "2px solid white" : "none",
                  }}
                  title={c}
                />
              ))}
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="ml-2"
              title="Brush Size"
            />
            <button
              onClick={undo}
              className="ml-2 px-2 py-1 text-sm text-white/80 hover:text-white flex items-center gap-1"
              title="Undo"
            >
              <RotateCcw className="w-4 h-4" /> Undo
            </button>
            <button
              onClick={clearAll}
              className="px-2 py-1 text-sm text-white/80 hover:text-white flex items-center gap-1"
              title="Clear Board"
            >
              <Eraser className="w-4 h-4" /> Clear
            </button>
          </div>
        ) : (
          <div className="absolute top-3 left-3 z-10 px-2 py-1 text-xs font-medium rounded bg-gray-900/80 border border-gray-700 text-white/80">
            View only
          </div>
        )}

        {/* Canvas */}
        <div
          className="w-full"
          style={{
            height: 420,
            backgroundColor: "#0f172a",
            cursor: canDraw ? "crosshair" : "default",
          }}
          onMouseDown={canDraw ? onPointerDown : undefined}
          onMouseMove={canDraw ? onPointerMove : undefined}
          onMouseUp={canDraw ? endDrawing : undefined}
          onMouseLeave={canDraw ? endDrawing : undefined}
          onTouchStart={canDraw ? onPointerDown : undefined}
          onTouchMove={canDraw ? onPointerMove : undefined}
          onTouchEnd={canDraw ? endDrawing : undefined}
          aria-readonly={!canDraw}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Remote cursors */}
        {othersCursors.map((u) => (
          <div
            key={u.id}
            className="absolute pointer-events-none"
            style={{
              transform: `translate(${u.cursor.x}px, ${u.cursor.y}px)`,
              top: 0,
              left: 0,
            }}
          >
            <div
              className="w-3 h-3 rounded-full shadow"
              style={{ backgroundColor: u.color, border: "2px solid white" }}
              title="User"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
