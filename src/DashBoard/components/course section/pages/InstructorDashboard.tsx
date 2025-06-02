import React, { useState, useMemo } from "react";
import { BookOpen, Users, Calendar, Award } from "lucide-react";
import { Layout } from "../../Layout";
import CourseFilters from "../components/CourseFilters";
import CourseGrid from "../components/CourseGrid";
import { instructorCourses } from "../components/mockData";
import { Course } from "../components";

const InstructorDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Extract unique categories from courses
  const categories = useMemo(() => {
    return [...new Set(instructorCourses.map((course) => course.category))];
  }, []);

  // Filter courses based on search term, category, and status
  const filteredCourses = useMemo(() => {
    return instructorCourses.filter((course) => {
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
  const totalStudents = useMemo(() => {
    return instructorCourses.reduce(
      (total, course) => total + course.enrollmentCount,
      0
    );
  }, []);

  const coursesByStatus = useMemo(() => {
    const statusCounts: Record<string, number> = {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
    };

    instructorCourses.forEach((course) => {
      statusCounts[course.status] += 1;
    });

    return statusCounts;
  }, []);

  return (
    <Layout>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start">
          <div className="rounded-full bg-indigo-100 p-3 mr-4">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Courses</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {instructorCourses.length}
            </h3>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Students</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {totalStudents}
            </h3>
          </div>
        </div>

        {/* Active Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <Calendar className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Courses</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {coursesByStatus.ongoing}
            </h3>
          </div>
        </div>

        {/* Completed Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-start">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Award className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Completed Courses
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {coursesByStatus.completed}
            </h3>
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
      <CourseGrid courses={filteredCourses} />
    </Layout>
  );
};

export default InstructorDashboard;
