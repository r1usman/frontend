import {
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Settings,
  Star,
  Users,
  X,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom"; // Changed from 'react-router'
import { mockCourse as course } from "./data";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Updated navItems: removed 'active' prop, adjusted 'to' paths to be relative
  // These paths are relative to where your routing for this sidebar section is defined.
  // For example, if this sidebar is for routes under "/dashboard/course/:id/",
  // then to: "edit" will link to "/dashboard/course/:id/edit".
  const navItems = [
    { name: "Overview", to: "", icon: <LayoutDashboard size={20} /> }, // Represents the index route of this section
    { name: "Students", to: "students", icon: <Users size={20} /> },
    {
      name: "Curriculum",
      to: "curriculum",
      icon: <MessageSquare size={20} />,
    },
    { name: "Assignments", to: "assign", icon: <Star size={20} /> },
    {
      name: "Test",
      to: "test",
      icon: <Megaphone size={20} />,
    },
    { name: "Settings", to: "edit", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-indigo-500 bg-opacity-75 lg:hidden"
          onClick={onClose}
          aria-hidden="true" // Added for accessibility
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-indigo-600 shadow-lg transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-lg font-semibold text-gray-900">
              Dashboard
            </span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close sidebar" // Added for accessibility
            >
              <X size={24} />
            </button>
          </div>
          <div className="px-4 py-6 flex items-center">
            <div className="bg-amber-500 rounded-lg p-2 mr-2">
              <span className="font-bold text-gray-900">St</span>
            </div>
            <span className="font-bold text-xl">studify.</span>
          </div>

          {/* Course info */}

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto  ">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                // The 'end' prop is important for NavLinks that correspond to index routes (like "Overview" with to: "").
                // It ensures the link is only active when the path is an exact match.
                end={item.to === ""}
                className={(
                  { isActive } // Use NavLink's isActive callback
                ) =>
                  `
                  flex items-center px-3 py-2.5 text-sm font-medium rounded-md
                  group transition-all duration-200
                  ${
                    isActive
                      ? "font-semibold text-indigo-700 	bg-white"
                      : "text-white bg-transparent	 hover:text-white hover:bg-indigo-800"
                  }
                `
                }
              >
                {(
                  { isActive } // You can also get isActive here if needed for complex children
                ) => (
                  <>
                    <span
                      className={`mr-3 ${
                        isActive ? "text-blue-700" : "text-white"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Status */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full mr-2 ${
                  course?.published ? "bg-green-500" : "bg-amber-500"
                }`}
              />
              <span className="text-sm text-white">
                {course?.published ? "Course Published" : "Draft Mode"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
