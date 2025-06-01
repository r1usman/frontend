import React from "react";
import { Menu } from "lucide-react";

interface MobileNavProps {
  onOpenSidebar: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenSidebar }) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-20 flex h-16 bg-white shadow-sm items-center px-4">
      <button
        type="button"
        className="text-gray-500 hover:text-gray-600 focus:outline-none"
        onClick={onOpenSidebar}
      >
        <Menu size={24} />
      </button>
      <span className="ml-4 text-lg font-medium text-gray-900">
        Course Dashboard
      </span>
    </div>
  );
};
