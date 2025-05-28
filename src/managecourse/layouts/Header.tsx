import React from 'react';
import { Bell, HelpCircle, Settings, ChevronDown } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export const Header: React.FC = () => {
  const { course } = useCourse();

  return (
    <header className="sticky top-0 z-10 flex h-16 bg-white shadow-sm">
      <div className="flex flex-1 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900 mr-2">
            {course?.title || 'Course Dashboard'}
          </h1>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            course?.published 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {course?.published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <HelpCircle size={20} />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Settings size={20} />
          </button>
          
          <div className="flex items-center ml-4">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              JS
            </div>
            <span className="ml-2 mr-1 text-sm font-medium text-gray-700 hidden sm:inline-block">
              John Smith
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};