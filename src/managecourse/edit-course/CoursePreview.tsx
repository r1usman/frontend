import React from "react";
import { X } from "lucide-react";
import { Course } from "../../../../edit course/src/types/course";

interface CoursePreviewProps {
  course: Course;
  onClose: () => void;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 overflow-y-auto">
      <div className="flex min-h-screen justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full relative animate-fade-in">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-800">
              Course Preview
            </h2>
            <p className="text-sm text-gray-500">
              How your course will appear to students
            </p>
          </div>

          <div className="p-6">
            <div className="rounded-lg overflow-hidden shadow-sm mb-6">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {course.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{course.subtitle}</p>

            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
                {course.level}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                ${course.price}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-3">
                About this course
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {course.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-3">
                What you'll learn
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-3">
                Requirements
              </h2>
              <ul className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
