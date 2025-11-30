import React, { useState } from "react";
import { Clock, BookOpen, Star, ChevronRight } from "lucide-react";

const Courses = () => {
  const categories = [
    "All",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "DevOps",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const courses = [
    {
      id: 1,
      title: "Complete JavaScript Mastery",
      category: "Web Development",
      rating: 4.8,
      students: 12500,
      duration: "32 hours",
      level: "Beginner",
      image:
        "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      title: "React and Redux Bootcamp",
      category: "Web Development",
      rating: 4.9,
      students: 8700,
      duration: "28 hours",
      level: "Intermediate",
      image:
        "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "Python for Data Science",
      category: "Data Science",
      rating: 4.7,
      students: 9200,
      duration: "40 hours",
      level: "Intermediate",
      image:
        "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      title: "Flutter App Development",
      category: "Mobile Development",
      rating: 4.6,
      students: 5800,
      duration: "36 hours",
      level: "Intermediate",
      image:
        "https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      title: "DevOps with Docker & Kubernetes",
      category: "DevOps",
      rating: 4.8,
      students: 4200,
      duration: "30 hours",
      level: "Advanced",
      image:
        "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      title: "Machine Learning Fundamentals",
      category: "Data Science",
      rating: 4.9,
      students: 7300,
      duration: "45 hours",
      level: "Advanced",
      image:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <section id="courses" className=" bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-purple-600">
              Featured Courses
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Discover top-rated courses designed by industry experts to help you
            master the skills employers are looking for.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-white/40 hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium ml-1">
                      {course.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {course.title}
                </h3>
                <div className="flex flex-wrap gap-y-2 text-sm text-slate-600 mb-4">
                  <div className="flex items-center mr-4">
                    <Clock className="h-4 w-4 mr-1 text-slate-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <BookOpen className="h-4 w-4 mr-1 text-slate-500" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
                <button className="w-full mt-2 py-2 px-4 bg-white border border-indigo-600 text-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-50 transition-colors duration-300">
                  <span>View Course</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
            Explore All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
