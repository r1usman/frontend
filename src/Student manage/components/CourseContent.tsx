import React from 'react';

interface CourseContentProps {
  children: React.ReactNode;
}

const CourseContent: React.FC<CourseContentProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Course Content</h2>
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
};

export default CourseContent;