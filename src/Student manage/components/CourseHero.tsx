import React from 'react';

interface CourseHeroProps {
  imageUrl: string;
  category: string;
}

const CourseHero: React.FC<CourseHeroProps> = ({ imageUrl, category }) => {
  return (
    <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden rounded-xl">
      <img
        src={imageUrl}
        alt="Course cover"
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full mb-2">
          {category}
        </span>
      </div>
    </div>
  );
};

export default CourseHero;