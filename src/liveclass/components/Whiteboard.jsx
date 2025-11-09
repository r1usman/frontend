import React from "react";
import { useWhiteboard } from "@100mslive/react-sdk";
import { Whiteboard } from "@100mslive/hms-whiteboard";
import "@100mslive/hms-whiteboard/index.css";

const WhiteboardEmbed = () => {
  const { token, endpoint } = useWhiteboard();

  if (!token) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "650px" }}>
      <Whiteboard
        token={token}
        endpoint={`https://${endpoint}`}
        onMount={({ store, editor }) => {
          console.log(store, editor);
        }}
      />
    </div>
  );
};
