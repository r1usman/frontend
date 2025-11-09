import { PencilLine, X } from "lucide-react";
import { useWhiteboard } from "./WhiteboardProvider";

export function WhiteboardToggle() {
  const { isOpen, toggle } = useWhiteboard();

  return (
    <button
      onClick={toggle}
      className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200"
      title={isOpen ? "Close Whiteboard" : "Open Whiteboard"}
    >
      {isOpen ? <X className="w-5 h-5" /> : <PencilLine className="w-5 h-5" />}
      <span className="text-sm font-medium">
        {isOpen ? "Close Whiteboard" : "Whiteboard"}
      </span>
    </button>
  );
}
