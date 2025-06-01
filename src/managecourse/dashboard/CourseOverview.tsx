import React from "react";
import {
  TrendingUp,
  Users,
  Eye,
  Star,
  DollarSign,
  ArrowUpRight,
  Clock,
  BarChart,
} from "lucide-react";
import { mockCourse as course } from "../layouts/data";
export const CourseOverview: React.FC = () => {
  if (!course) return null;

  const stats = [
    {
      name: "Total Students",
      value: course.students.toLocaleString(),
      change: "+12%",
      icon: <Users size={20} className="text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      name: "Course Views",
      value: course.stats.views.toLocaleString(),
      change: "+24%",
      icon: <Eye size={20} className="text-indigo-600" />,
      bgColor: "bg-indigo-50",
    },
    {
      name: "Completion Rate",
      value: `${course.stats.completionRate}%`,
      change: "+5%",
      icon: <TrendingUp size={20} className="text-green-600" />,
      bgColor: "bg-green-50",
    },
    {
      name: "Avg. Rating",
      value: course.stats.avgRating.toFixed(1),
      change: `${course.stats.reviewCount} reviews`,
      icon: <Star size={20} className="text-yellow-600" />,
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Course Overview</h2>
        <p className="text-sm text-gray-500 mt-1">
          Performance metrics and key insights for your course
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-2 ${stat.bgColor}`}>
                  {stat.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-2">
              <div className="text-sm flex items-center">
                <span className="text-green-600 font-medium flex items-center">
                  {stat.change}
                  <ArrowUpRight size={14} className="ml-1" />
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 ">
        {/* Revenue Card */}

        {/* Recent Activity Card */}
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View all
              </a>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Users size={16} className="text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">3 new students</span> enrolled
                    in your course
                  </p>
                  <p className="text-xs text-gray-500">
                    <Clock size={12} className="inline mr-1" />2 hours ago
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                    <Star size={16} className="text-yellow-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">New 5-star review</span> from
                    Emma Thompson
                  </p>
                  <p className="text-xs text-gray-500">
                    <Clock size={12} className="inline mr-1" />
                    Yesterday
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <BarChart size={16} className="text-green-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">
                      Completion rate increased
                    </span>{" "}
                    by 5% this week
                  </p>
                  <p className="text-xs text-gray-500">
                    <Clock size={12} className="inline mr-1" />3 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
