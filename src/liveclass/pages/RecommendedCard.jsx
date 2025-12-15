import { BookOpen, Clock, Users, Video, Eye, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RecommendedCard({ course, showJoinButton = false }) {
  const navigate = useNavigate();

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleJoinLiveClass = (e) => {
    e.stopPropagation();
    navigate("/liveclass/" + course._id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-slate-300 group cursor-pointer flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-slate-600 mb-3">
          by <span className="font-medium">{course.instructor}</span>
        </p>

        <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
          {course.description}
        </p>

        <div className="mt-auto flex items-center gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Eye className="w-4 h-4 text-slate-500" />
            {course.totalViews ?? 0} views
          </span>
          <span className="inline-flex items-center gap-1">
            <Heart className="w-4 h-4 text-rose-500" />
            {course.totalLikes ?? 0} likes
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecommendedCard;
