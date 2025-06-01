// Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut
} from 'lucide-react';

// Tailwind classes
const ACTIVE_CLASS = 'bg-gray-700  text-white font-semibold shadow-md';
const INACTIVE_CLASS = 'text-gray-400 hover:text-white hover:bg-gray-700';

// NavItem Component
const NavItem = ({ icon, label, path, isActive, tooltip }) => (
  <Link
    to={path}
    title={tooltip}
    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive ? ACTIVE_CLASS : INACTIVE_CLASS
    }`}
  >
    <div className="w-5 h-5 mr-3">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

// Navigation config array
const navItems = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={18} />,
    path: '/Dash',
    tooltip: 'View your dashboard',
    permission: 'user'
  },
  {
    label: 'Courses',
    icon: <BookOpen size={18} />,
    path: '/courses',
    tooltip: 'Browse your courses',
    permission: 'user'
  },
  {
    label: 'Events',
    icon: <Calendar size={18} />,
    path: '/Mod/*',
    tooltip: 'Check your calendar',
    permission: 'user'
  },
  {
    label: 'Assignment',
    icon: <FileText size={18} />,
    path: '/assignments',
    tooltip: 'See your tasks',
    permission: 'user'
  },
  {
    label: 'Analytics',
    icon: <BarChart2 size={18} />,
    path: '/analytics',
    tooltip: 'Track performance',
    permission: 'admin'
  },
  {
    label: 'Messages',
    icon: <MessageSquare size={18} />,
    path: '/messages',
    tooltip: 'Read messages',
    permission: 'user'
  },
  {
    label: 'Settings',
    icon: <Settings size={18} />,
    path: '/settings',
    tooltip: 'Account settings',
    permission: 'user'
  }
];

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

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
          const cleanPath = item.path.replace('/*', '');
          const isActive =
            currentPath === cleanPath || currentPath.startsWith(cleanPath + '/');

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
