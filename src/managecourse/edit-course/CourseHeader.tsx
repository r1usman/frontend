import React from "react";
import { Save, Eye, Upload } from "lucide-react";
import { Course } from "../../../../edit course/src/types/course";

interface CourseHeaderProps {
  title: string;
  course: Course;
  onSaveDraft: (course: Course) => void;
  onPublish: (course: Course) => void;
  onPreview: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  course,
  onSaveDraft,
  onPublish,
  onPreview,
}) => {
  const calculateProgress = () => {
    if (!course) return 0;

    let total = 5; // Total number of main fields to complete
    let completed = 0;

    // Check basic info
    if (course.title) completed++;
    if (course.description) completed++;
    if (course.category && course.level) completed++;
    if (course.price) completed++;
    if (course.requirements.length > 0 && course.outcomes.length > 0)
      completed++;

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-800">{title}</h1>
            <div className="mt-2">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-xs">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {progress}% complete
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => onSaveDraft(course)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>

            <button
              onClick={onPreview}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>

            <button
              onClick={() => onPublish(course)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
