import React, { useContext, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../GlobalContext/UserContext";

const CourseItem = ({ title, category, instructor, image }) => {
  return (
    <div className="cursor-pointer flex border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="w-32 h-24 overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-xs text-gray-600 mb-2">by {instructor}</p>
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

        <div className="flex justify-end mt-2">
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const navigate = useNavigate();
  const { User } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch("http://localhost:3000/courses");
        if (!res.ok) throw new Error(`GET / failed (${res.status})`);
        const data = await res.json();
        if (isMounted) {
          const list = Array.isArray(data) ? data : data?.courses || [];
          setCourses(list);
        }
      } catch (e) {
        if (isMounted) setErr(e.message || "Failed to load courses");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleCourses = courses.slice(0, 4);

  return (
    <div className="px-4 py-3 rounded-lg shadow-sm shadow-purple-300 bg-white">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-lg font-medium">Your courses</h2>
        <button
          onClick={() => navigate("/student/courses")}
          className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
        >
          See all
        </button>
      </div>

      {err && <div className="text-sm text-red-600 mb-3">Error: {err}</div>}

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex border border-gray-100 rounded-lg overflow-hidden bg-white"
            >
              <div className="w-32 h-24 bg-gray-200" />
              <div className="p-3 flex-1">
                <div className="h-4 bg-gray-200 w-40 mb-3 rounded" />
                <div className="h-3 bg-gray-200 w-24 rounded mb-2" />
                <div className="h-3 bg-gray-200 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visibleCourses.length === 0 ? (
            <div className="col-span-full text-sm text-gray-500">
              No courses found.
            </div>
          ) : (
            visibleCourses.map((c, idx) => (
              <CourseItem
                key={c._id || idx}
                title={c.title || "Untitled"}
                category={c.category || c.subject || "General"}
                instructor={c.instructor || c.instructor || "Instructor"}
                image={
                  c.image ||
                  c.thumbnail ||
                  "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=300"
                }
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CourseList;
