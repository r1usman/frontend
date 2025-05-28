import React from "react";
import { Search, Filter, Download, ExternalLink } from "lucide-react";
import { useCourse } from "../../context/CourseContext";

export interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  enrolled: string;
}
const students = 1458;
const studentList = [
  {
    id: "student-1",
    name: "Emma Thompson",
    email: "emma@example.com",
    progress: 87,
    lastActive: "2 hours ago",
    enrolled: "Mar 15, 2025",
  },
  {
    id: "student-2",
    name: "James Wilson",
    email: "james@example.com",
    progress: 42,
    lastActive: "1 day ago",
    enrolled: "Mar 22, 2025",
  },
  {
    id: "student-3",
    name: "Sophie Chen",
    email: "sophie@example.com",
    progress: 100,
    lastActive: "5 hours ago",
    enrolled: "Feb 10, 2025",
  },
  {
    id: "student-4",
    name: "Miguel Rodriguez",
    email: "miguel@example.com",
    progress: 63,
    lastActive: "3 days ago",
    enrolled: "Apr 5, 2025",
  },
  {
    id: "student-5",
    name: "Aisha Patel",
    email: "aisha@example.com",
    progress: 28,
    lastActive: "Just now",
    enrolled: "Apr 12, 2025",
  },
];
export const StudentsSection: React.FC = () => {
  // if (!course) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Students</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your course students and track their progress
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Download size={16} className="mr-1" /> Export
          </button>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <ExternalLink size={16} className="mr-1" /> View All
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {/* Search & Filter */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button className="inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none">
              <Filter size={16} className="mr-1" /> Filter
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Progress
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Active
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Enrolled
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentList.map((student: Student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                        <div
                          className={`h-2.5 rounded-full ${
                            student.progress >= 80
                              ? "bg-green-600"
                              : student.progress >= 40
                              ? "bg-blue-600"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-700">
                        {student.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.enrolled}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">5</span> of{" "}
                <span className="font-medium">{students}</span> students
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  &laquo;
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  &raquo;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
