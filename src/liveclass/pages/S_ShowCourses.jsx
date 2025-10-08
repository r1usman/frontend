import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../GlobalContext/UserContext";
import CourseCard from "./S_CourseCard";

function S_ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [joined, setJoined] = useState([]);
  const [notJoined, setNotJoined] = useState([]);
  const { User } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setJoined(
          data.filter(
            (course) =>
              course.studentIds && course.studentIds.includes(User?._id)
          )
        );
        setNotJoined(
          data.filter(
            (course) =>
              !course.studentIds || !course.studentIds.includes(User?._id)
          )
        );
      });
  }, [User?._id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Joined Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            Joined Courses
          </h2>
          {joined.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                You have not joined any courses yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {joined.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  showJoinButton={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Available Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            Available Courses
          </h2>
          {notJoined.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                You have joined all available courses.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notJoined.map((course) => (
                <div key={course._id} className="relative">
                  <CourseCard course={course} showJoinButton={false} />
                  <div className="absolute top-4 right-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const res = await fetch(
                          `http://localhost:3000/courses/join/${course._id}`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ studentId: User?._id }),
                          }
                        );
                        if (res.ok) {
                          // Move course from notJoined to joined
                          setJoined((prev) => [...prev, course]);
                          setNotJoined((prev) =>
                            prev.filter((c) => c._id !== course._id)
                          );
                        }
                      }}
                    >
                      Join Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default S_ShowCourses;
