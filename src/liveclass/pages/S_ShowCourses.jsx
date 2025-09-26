import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function S_ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [joined, setJoined] = useState([]);
  const [notJoined, setNotJoined] = useState([]);
  const { studentId } = useParams(); // Get studentId from URL params

  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setJoined(
          data.filter(
            (course) =>
              course.studentIds && course.studentIds.includes(studentId)
          )
        );
        setNotJoined(
          data.filter(
            (course) =>
              !course.studentIds || !course.studentIds.includes(studentId)
          )
        );
      });
  }, [studentId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Joined Courses</h2>
      <ul className="mb-8">
        {joined.map((course) => (
          <li key={course._id} className="mb-2 p-2 bg-green-100 rounded">
            {course.title}
          </li>
        ))}
        {joined.length === 0 && (
          <li className="text-gray-500">You have not joined any courses.</li>
        )}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Courses You Can Join</h2>
      <ul>
        {notJoined.map((course) => (
          <li
            key={course._id}
            className="mb-2 p-2 bg-blue-100 rounded flex justify-between items-center"
          >
            <span>{course.title}</span>
            <button
              className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={async () => {
                const res = await fetch(
                  `http://localhost:3000/courses/${course._id}/join`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ studentId }),
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
              Join
            </button>
          </li>
        ))}
        {notJoined.length === 0 && (
          <li className="text-gray-500">
            You have joined all available courses.
          </li>
        )}
      </ul>
    </div>
  );
}

export default S_ShowCourses;
