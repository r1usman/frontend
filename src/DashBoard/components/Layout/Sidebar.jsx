// Sidebar.jsx
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart2,
  BookOpen,
  Calendar,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import { UserContext } from "../../../GlobalContext/UserContext";

// Tailwind classes
const ACTIVE_CLASS = "bg-gray-700  text-white font-semibold shadow-md";
const INACTIVE_CLASS = "text-gray-400 hover:text-white hover:bg-gray-700";

// NavItem Component
const NavItem = ({ icon, label, path, isActive, tooltip }) => {
  return (
    <Link
      to={path}
      title={tooltip}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive ? ACTIVE_CLASS : INACTIVE_CLASS
      }`}
      // className={`
      //   flex items-center px-4 py-3 rounded-lg transition-colors duration-200
      //   ${
      //     isActive
      //       ? "bg-blue-500 text-white"
      //       : "text-gray-300 hover:bg-gray-800 hover:text-white"
      //   }
      // `}
    >
      <div className="w-5 h-5 mr-3">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

// Navigation config array

export const Sidebar = () => {
  const location = useLocation();
  const { role } = useContext(UserContext);
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/Dash",
      tooltip: "View your dashboard",
      permission: "user",
    },
    {
      label: "Courses",
      icon: <BookOpen size={18} />,
      path: role === "instructor" ? "/instructor/courses" : "/student/courses",
      tooltip: "Browse your courses",
      permission: "user",
    },
    {
      label: "Events",
      icon: <Calendar size={18} />,
      path: "/Mod/*",
      tooltip: "Check your calendar",
      permission: "user",
    },
    {
      label: "Assignment",
      icon: <FileText size={18} />,
      path: "/assignments",
      tooltip: "See your tasks",
      permission: "user",
    },
    {
      label: "Analytics",
      icon: <BarChart2 size={18} />,
      path: "/analytics",
      tooltip: "Track performance",
      permission: "admin",
    },
    {
      label: "Messages",
      icon: <MessageSquare size={18} />,
      path: "/messages",
      tooltip: "Read messages",
      permission: "user",
    },
    {
      label: "Settings",
      icon: <Settings size={18} />,
      path: "/settings",
      tooltip: "Account settings",
      permission: "user",
    },
  ];
  const handleLogout = () => {
    navigate("/Login");
  };

  return (
    <aside className="w-64 hidden md:flex flex-col bg-gray-800 text-gray-300">
      {/* Logo / Branding */}
      <div className="px-4 py-6 flex items-center">
        <div className="bg-amber-500 rounded-lg p-2 mr-2">
          <span className="font-bold text-gray-900">CA</span>
        </div>
        <span className="font-bold text-xl">Code Ascend</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item, idx) => {
          const cleanPath = item.path.replace("/*", "");
          const isActive =
            currentPath === cleanPath ||
            currentPath.startsWith(cleanPath + "/");

          return (
            <NavItem
              key={idx}
              icon={item.icon}
              label={item.label}
              path={cleanPath}
              isActive={isActive}
              tooltip={item.tooltip}
            />
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-3 border-t border-purple-800/30">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-white hover:text-white transition-colors duration-200"
        >
          <LogOut size={18} className="mr-3" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};
