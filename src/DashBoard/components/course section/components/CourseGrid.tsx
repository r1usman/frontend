import React from "react";
import CourseCard from "./CourseCard";
import { Course } from ".";

interface CourseGridProps {
  courses: Course[];
  isStudentView?: boolean;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  isStudentView = false,
}) => {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <img
          src="https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt="No courses found"
          className="w-40 h-40 object-cover rounded-full mb-6 opacity-50"
        />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No courses found
        </h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any courses that match your current filters. Try
          adjusting your search or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isStudentView={isStudentView}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
