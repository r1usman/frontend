import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Course Catalog</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our comprehensive collection of courses designed to enhance your skills and advance your career
            </p>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center text-slate-500">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard course={course} key={course._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowCourses;
