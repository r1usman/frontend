import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({
  title,
  description,
  buttonText,
  color,
  icon,
  progress,
  onClick, // Handler for card click
}) => {
 
  const progressColor =
    progress >= 70
      ? 'bg-green-500' 
      : progress >= 40
      ? 'bg-yellow-500' 
      : 'bg-red-500'; 

  return (
    <div
      className={`${color} p-4 rounded-lg w-80 flex-shrink-0 transition-transform duration-200 hover:bg-opacity-80 cursor-pointer hover:shadow-lg`}
      onClick={onClick} // Trigger the passed onClick event when card is clicked
    >
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white text-xs mb-4">{description}</p>
      
      <div className="">
        <div className="text-xs text-white mb-2">Progress</div>
        <div className="h-2 bg-gray-300 rounded-full">
          <div
            className={`h-full rounded-full ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-white text-right">{progress}%</div>
      </div>

      <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition-colors">
        {buttonText}
      </button>
    </div>
  );
};

const CourseContinue = () => {
  const navigate = useNavigate(); // Hook to navigate to other pages
  
  // Handler to be triggered on card click
  const handleCardClick = (courseId) => {
    if(courseId == "python")
    {
      navigate("/0")
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Continue Courses</h2>
        <div className="flex space-x-2">
          <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        <CourseCard
          title="Python Programming"
          description="Learn Python from scratch."
          buttonText="Start Learning"
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
          icon={<span className="text-white text-lg">🐍</span>}
          progress={70}
          onClick={() => handleCardClick('python')} // Pass courseId to handler
        />
        <CourseCard
          title="Java Programming"
          description="Master Java programming concepts."
          buttonText="Start Learning"
          color="bg-gradient-to-br from-orange-400 to-red-500"
          icon={<span className="text-white text-lg">☕</span>}
          progress={50}
          onClick={() => handleCardClick('java')} // Pass courseId to handler
        />
        <CourseCard
          title="C++ Programming"
          description="Begin your journey with C++."
          buttonText="Start Learning"
          color="bg-gradient-to-br from-purple-500 to-indigo-600"
          icon={<span className="text-white text-lg">➕</span>}
          progress={80} 
          onClick={() => handleCardClick('cpp')} 
        />
      </div>
    </div>
  );
};

export default CourseContinue;
