import React from 'react';
import {
  LayoutDashboard, BookOpen, Calendar, FileText,
  BarChart2, MessageSquare, Settings, LogOut
} from 'lucide-react';

const NavItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 
    ${active
      ? 'bg-blue-500 text-white'
      : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
  >
    <div className="w-5 h-5 mr-3">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

// ✅ Navigation config array
const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard', active: true, tooltip: 'View your dashboard', permission: 'user' },
  { label: 'Courses', icon: <BookOpen size={18} />, path: '/courses', tooltip: 'Browse your courses', permission: 'user' },
  { label: 'Events', icon: <Calendar size={18} />, path: '/events', tooltip: 'Check your calendar', permission: 'user' },
  { label: 'Assignment', icon: <FileText size={18} />, path: '/assignments', tooltip: 'See your tasks', permission: 'user' },
  { label: 'Analytics', icon: <BarChart2 size={18} />, path: '/analytics', tooltip: 'Track performance', permission: 'admin' },
  { label: 'Messages', icon: <MessageSquare size={18} />, path: '/messages', tooltip: 'Read messages', permission: 'user' },
  { label: 'Settings', icon: <Settings size={18} />, path: '/settings', tooltip: 'Account settings', permission: 'user' }
];


export const Sidebar = () => {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-gray-900 text-white">
     
      <div className="px-4 py-6 flex items-center">
        <div className="bg-amber-500 rounded-lg p-2 mr-2">
          <span className="font-bold text-gray-900">St</span>
        </div>
        <span className="font-bold text-xl">studify.</span>
      </div>

      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item, idx) => (
          <NavItem
            key={idx}
            icon={item.icon}
            label={item.label}
            active={item.active}
          />
        ))}
      </nav>

     
      <div className="px-4 py-6 bg-gray-800 rounded-lg mx-2 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-2 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold">76</span>
          </div>
          <p className="text-xs text-gray-400">learning hours</p>
          <p className="text-xs text-gray-400">keep it going!</p>
        </div>
      </div>

      
      <div className="px-4 py-3 border-t border-gray-800">
        <button className="flex items-center w-full text-gray-300 hover:text-white transition-colors duration-200">
          <LogOut size={18} className="mr-3" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};
