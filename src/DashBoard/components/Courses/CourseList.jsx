import React, { useContext } from "react";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { UserContext } from "../../../GlobalContext/UserContext";

const CourseItem = ({
  title,
  category,
  instructor,
  instructorAvatar,
  duration,
  level,
  image,
}) => {
  console.log("hello");

  return (
    <div className="cursor-pointer flex border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="w-32 h-24 overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <div className="flex items-center mb-2">
              <img
                src={instructorAvatar}
                alt={instructor}
                className="w-5 h-5 rounded-full object-cover mr-2"
              />
              <p className="text-xs text-gray-600">{instructor}</p>
            </div>
          </div>
          <div
            className={`text-xs ${
              category === "Illustrations"
                ? "text-red-500"
                : category === "Mobile Design"
                ? "text-blue-500"
                : "text-purple-500"
            }`}
          >
            {category}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>{duration}</span>
            <span className="mx-2">•</span>
            <span>{level}</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Your courses</h2>
        <button className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
          See all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CourseItem
          title="Illustrations from scratch"
          category="Illustrations"
          instructor="Whitney Rhode"
          instructorAvatar="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
          duration="14 hours"
          level="Elementary"
          image="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=300"
        />
        <CourseItem
          title="Mobile design"
          category="Mobile Design"
          instructor="Lisa Williams"
          instructorAvatar="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
          duration="10 hours"
          level="Advanced"
          image="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300"
        />
        <CourseItem
          title="Front-end basics"
          category="Web Development"
          instructor="Mike Johnson"
          instructorAvatar="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150"
          duration="18 hours"
          level="Elementary"
          image="https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=300"
        />
        <CourseItem
          title="Advanced React Patterns"
          category="Web Development"
          instructor="John Doe"
          instructorAvatar="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
          duration="12 hours"
          level="Advanced"
          image="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300"
        />
      </div>
    </div>
  );
};

export default CourseList;
