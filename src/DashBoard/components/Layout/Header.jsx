import React from 'react';
import { Search, Bell } from 'lucide-react';

export const Header = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="border-b border-gray-200 bg-white py-4 px-6 md:px-8 flex justify-between items-center">
      <div>
        <h2 className="text-sm text-gray-500">Welcome back</h2>
        <h1 className="text-xl font-semibold">Sarah Coleman</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search courses"
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <div className="relative">
          <Bell className="text-gray-500 cursor-pointer hover:text-blue-500 transition-colors duration-200" size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
        </div>

        <div className="hidden md:block text-right">
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>

        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <img
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
