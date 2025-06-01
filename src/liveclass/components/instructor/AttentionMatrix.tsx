import React, { useState } from "react";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";

interface Student {
  id: number;
  name: string;
  avatar: string;
  currentAttention: number; // 0-100
  overallAttention: number; // 0-100
  trend: "up" | "down" | "stable";
}

const AttentionMatrix: React.FC = () => {
  const [students] = useState<Student[]>([
    {
      id: 1,
      name: "Alex Johnson",
      avatar:
        "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
      currentAttention: 85,
      overallAttention: 78,
      trend: "up",
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar:
        "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg",
      currentAttention: 92,
      overallAttention: 88,
      trend: "up",
    },
    {
      id: 3,
      name: "John Smith",
      avatar:
        "https://images.pexels.com/photos/3782226/pexels-photo-3782226.jpeg",
      currentAttention: 45,
      overallAttention: 62,
      trend: "down",
    },
    {
      id: 4,
      name: "Emily Wilson",
      avatar:
        "https://images.pexels.com/photos/3779756/pexels-photo-3779756.jpeg",
      currentAttention: 78,
      overallAttention: 76,
      trend: "stable",
    },
    {
      id: 5,
      name: "David Lee",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      currentAttention: 35,
      overallAttention: 55,
      trend: "down",
    },
    {
      id: 6,
      name: "Sarah Miller",
      avatar:
        "https://images.pexels.com/photos/1906882/pexels-photo-1906882.jpeg",
      currentAttention: 98,
      overallAttention: 92,
      trend: "up",
    },
    {
      id: 7,
      name: "James Wilson",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      currentAttention: 75,
      overallAttention: 71,
      trend: "stable",
    },
    {
      id: 8,
      name: "Linda Chen",
      avatar:
        "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg",
      currentAttention: 82,
      overallAttention: 79,
      trend: "up",
    },
  ]);

  // Calculate class stats
  const avgCurrentAttention = Math.round(
    students.reduce((sum, student) => sum + student.currentAttention, 0) /
      students.length
  );
  const avgOverallAttention = Math.round(
    students.reduce((sum, student) => sum + student.overallAttention, 0) /
      students.length
  );
  const lowAttentionCount = students.filter(
    (student) => student.currentAttention < 50
  ).length;

  const getAttentionColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-400";
    return "bg-red-500";
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-250px)] overflow-y-auto">
      {/* Class stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-indigo-50 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-600 block">Current</span>
          <div className="text-lg font-bold text-indigo-600">
            {avgCurrentAttention}%
          </div>
        </div>
        <div className="bg-indigo-50 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-600 block">Overall</span>
          <div className="text-lg font-bold text-indigo-600">
            {avgOverallAttention}%
          </div>
        </div>
        <div className="bg-indigo-50 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-600 block">Low Attention</span>
          <div className="text-lg font-bold text-indigo-600">
            {lowAttentionCount}
          </div>
        </div>
      </div>

      {/* View mode toggle */}

      {
        <div className="space-y-2">
          {students.map((student) => (
            <div
              key={student.id}
              className={`flex items-center p-2 rounded-lg border ${
                student.currentAttention < 50
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="ml-2 flex-grow">
                <div className="text-sm font-medium">{student.name}</div>
                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div
                    className={`${getAttentionColor(student.currentAttention)}`}
                    style={{ width: `${student.currentAttention}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center ml-2">
                {getTrendIcon(student.trend)}
                <span className="ml-1 text-xs">
                  {student.currentAttention}%
                </span>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default AttentionMatrix;
