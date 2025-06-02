import { Award, BookOpen, Clock, GraduationCap } from "lucide-react";
import React, { useMemo, useState } from "react";
import CourseFilters from "../components/CourseFilters";
import CourseGrid from "../components/CourseGrid";
import { studentCourses } from "../components/mockData";
import { Layout } from "../../Layout";

const StudentDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Extract unique categories from courses
  const categories = useMemo(() => {
    return [...new Set(studentCourses.map((course) => course.category))];
  }, []);

  // Filter courses based on search term, category, and status
  const filteredCourses = useMemo(() => {
    return studentCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === "all" || course.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  // Calculate stats
  const coursesByStatus = useMemo(() => {
    const statusCounts: Record<string, number> = {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
    };

    studentCourses.forEach((course) => {
      statusCounts[course.status] += 1;
    });

    return statusCounts;
  }, []);

  const averageProgress = useMemo(() => {
    const ongoingCourses = studentCourses.filter(
      (course) => course.status === "ongoing"
    );
    if (ongoingCourses.length === 0) return 0;

    const totalProgress = ongoingCourses.reduce(
      (sum, course) => sum + (course.progress || 0),
      0
    );
    return Math.round(totalProgress / ongoingCourses.length);
  }, []);

  return (
    <Layout>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Enrolled */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start">
          <div className="rounded-full bg-indigo-100 p-3 mr-4">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Enrolled Courses
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {studentCourses.length}
            </h3>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">In Progress</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {coursesByStatus.ongoing}
            </h3>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Award className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {coursesByStatus.completed}
            </h3>
          </div>
        </div>

        {/* Average Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-start mb-4">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Average Progress
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {averageProgress}%
              </h3>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${averageProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <CourseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categories={categories}
      />

      {/* Course Grid */}
      <CourseGrid courses={filteredCourses} isStudentView={true} />
    </Layout>
  );
};

export default StudentDashboard;
