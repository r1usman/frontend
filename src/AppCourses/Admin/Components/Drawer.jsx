import { LuSparkles, LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[70px] right-0 z-40 h-[calc(100dvh-70px)]  p-4 overflow-y-auto transition-transform bg-white md:w-[35vw] shadow-2xl shadow-cyan-800/10 border-r border-gray-500 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-3 items-start">
          <span className="flex items-center gap-2 bg-cyan-100/60 text-xs text-sky-500 font-medium px-3 py-1 rounded-full text-nowrap">
            <LuSparkles /> Summarize this post
          </span>
          <h5
            id="drawer-right-label"
            className="text-base font-semibold flex items-center text-black"
          >
            {title}
          </h5>
          
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-900  hover:bg-gray-200 rounded-lg text-sm size-8 inline-flex items-center justify-center bg-transparent"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      {/* Body Content */}
      <div className="mx-3 mb-6 text-sm">{children}</div>
    </div>
  );
};

export default Drawer;
