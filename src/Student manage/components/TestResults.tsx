import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Test {
  id: number;
  title: string;
  date: string;
  score: number;
  maxScore: number;
}

interface TestResultsProps {
  tests: Test[];
}

const TestResults: React.FC<TestResultsProps> = ({ tests }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Tests</h2>
      <div className="space-y-4">
        {tests.map((test) => {
          const percentage = (test.score / test.maxScore) * 100;
          const isPassing = percentage >= 70;
          
          return (
            <div 
              key={test.id} 
              className="border border-gray-100 rounded-lg p-4 transition-all duration-300 hover:border-indigo-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <h3 className="font-medium text-gray-800">{test.title}</h3>
                  <p className="text-sm text-gray-500">{test.date}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium mr-2 ${isPassing ? 'text-green-600' : 'text-red-600'}`}>
                    {test.score}/{test.maxScore} ({percentage.toFixed(0)}%)
                  </span>
                  {isPassing ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <XCircle size={20} className="text-red-600" />
                  )}
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${isPassing ? 'bg-green-600' : 'bg-red-600'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestResults;