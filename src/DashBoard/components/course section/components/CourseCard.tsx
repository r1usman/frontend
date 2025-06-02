import React, { useContext } from "react";
import { Calendar, Users, Clock, Tag } from "lucide-react";
import { Course } from ".";
import { Link } from "react-router";
import { UserContext } from "../../../../GlobalContext/UserContext";

interface CourseCardProps {
  course: Course;
  isStudentView?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isStudentView = false,
}) => {
  const { role } = useContext(UserContext);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-amber-100 text-amber-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link to={role === "student" ? "/ic" : "/sc"}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        <div className="relative h-40">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold leading-tight line-clamp-2">
              {course.title}
            </h3>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                course.status
              )}`}
            >
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-4 flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">
              {course.instructor.name}
            </span>
          </div>

          {isStudentView && course.progress !== undefined && (
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="text-indigo-600 font-medium">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(course.startDate)} - {formatDate(course.endDate)}
              </span>
            </div>

            {!isStudentView && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{course.enrollmentCount} enrolled</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-medium rounded"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                +{course.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
