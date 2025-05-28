import React from 'react';

const ProgressItem = ({ value, max, label, color }) => (
  <div className="flex items-center space-x-2">
    <div className="w-16 text-xs text-right text-gray-500">{label}</div>
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color}`} 
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <div className="w-12 text-xs text-gray-500">{value}/{max}</div>
  </div>
);

export const ProgressStats = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-medium mb-4">My progress</h2>
      
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Circular progress background */}
          <svg className="w-32 h-32 transform -rotate-90">
            <circle 
              cx="64" 
              cy="64" 
              r="54" 
              fill="transparent" 
              stroke="#f0f0f0" 
              strokeWidth="10"
            />
            {/* Progress indicator for completed */}
            <circle 
              cx="64" 
              cy="64" 
              r="54" 
              fill="transparent" 
              stroke="#3B82F6" 
              strokeWidth="10"
              strokeDasharray="339.29"
              strokeDashoffset={339.29 * (1 - 0.1)}
              strokeLinecap="round"
            />
            {/* Progress indicator for in progress */}
            <circle 
              cx="64" 
              cy="64" 
              r="54" 
              fill="transparent" 
              stroke="#F97316" 
              strokeWidth="10"
              strokeDasharray="339.29"
              strokeDashoffset={339.29 * (1 - 0.25)}
              strokeLinecap="round"
            />
            {/* Progress indicator for not started */}
            <circle 
              cx="64" 
              cy="64" 
              r="54" 
              fill="transparent" 
              stroke="#EF4444" 
              strokeWidth="10"
              strokeDasharray="339.29"
              strokeDashoffset={339.29 * 0.65}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">54<span className="text-sm font-normal">/90</span></span>
            <span className="text-xs text-gray-500">Total hours</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div>
          <p className="text-lg font-semibold text-blue-500">10/100</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-orange-500">24/60</p>
          <p className="text-xs text-gray-500">In progress</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-red-500">6/60</p>
          <p className="text-xs text-gray-500">Not started</p>
        </div>
      </div>
    </div>
  );
};
