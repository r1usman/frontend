import React from 'react';
import { BookOpen, Clock, User } from 'lucide-react';

interface CourseHeaderProps {
  title: string;
  instructor: string;
  duration: string;
  progress: number;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  instructor,
  duration,
  progress,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <User size={18} className="mr-2 text-indigo-600" />
              <span>{instructor}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-2 text-indigo-600" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={18} className="mr-2 text-indigo-600" />
              <span>12 modules</span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600 mr-3">Progress</span>
            <div className="w-48 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-indigo-600">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;