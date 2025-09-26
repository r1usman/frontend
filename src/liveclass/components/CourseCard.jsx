import { BookOpen, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-slate-300 group cursor-pointer"
      onClick={() => navigate(`/instructor/course/${course._id}`)}
    >
      {/* Course Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Level Badge */}

        {/* Course Title */}
        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-slate-600 mb-3">
          by <span className="font-medium">{course.instructor}</span>
        </p>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Course Stats */}
        
      </div>
    </div>
  );
}

export default CourseCard;
