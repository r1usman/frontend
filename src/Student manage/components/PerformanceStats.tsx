import React from 'react';
import { TrendingUp, Award, Clock } from 'lucide-react';

interface PerformanceStatsProps {
  averageScore: number;
  completedAssignments: number;
  timeSpent: string;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  averageScore,
  completedAssignments,
  timeSpent,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 mr-4">
            <TrendingUp className="text-indigo-600\" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Score</p>
            <p className="text-2xl font-bold text-gray-800">{averageScore}%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 mr-4">
            <Award className="text-indigo-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completed Assignments</p>
            <p className="text-2xl font-bold text-gray-800">{completedAssignments}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 mr-4">
            <Clock className="text-indigo-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Time Spent</p>
            <p className="text-2xl font-bold text-gray-800">{timeSpent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;