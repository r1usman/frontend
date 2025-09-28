import React, { useContext, useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { UserContext } from "../../GlobalContext/UserContext";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { User } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/courses/instructor", {
      method: "GET",
      credentials: "include", // This sends cookies with the request
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          instructor: User.name,
          instructorId: User._id,
        }),
      });
      if (response.ok) {
        const newCourse = await response.json();
        setCourses([...courses, newCourse]);
        setFormData({ title: "", description: "", image: "" });
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Course Catalog
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our comprehensive collection of courses designed to
              enhance your skills and advance your career
            </p>
          </div>
          <button
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Create Course
          </button>
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

      {/* Modal for Create Course Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Create New Course
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Course Title
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Description
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                    rows="4"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Image URL
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowCourses;
