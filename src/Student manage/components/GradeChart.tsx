import React, { useEffect, useRef } from 'react';

interface GradeChartProps {
  grades: {
    name: string;
    value: number;
  }[];
}

const GradeChart: React.FC<GradeChartProps> = ({ grades }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.bar-fill');
      bars.forEach((bar) => {
        setTimeout(() => {
          (bar as HTMLElement).style.transform = 'scaleY(1)';
        }, 100);
      });
    }
  }, []);

  // Find the max value for scaling
  const maxValue = Math.max(...grades.map(g => g.value));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Grade Distribution</h2>
      <div ref={chartRef} className="flex items-end justify-between h-40 space-x-2">
        {grades.map((grade, index) => {
          const height = (grade.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full h-32 flex items-end justify-center">
                <div 
                  className="bar-fill w-full bg-indigo-600 rounded-t-sm origin-bottom transform scale-y-0 transition-transform duration-1000"
                  style={{ 
                    height: `${height}%`,
                    opacity: 0.7 + (grade.value / maxValue) * 0.3
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2 font-medium">{grade.name}</div>
              <div className="text-xs font-bold text-indigo-600">{grade.value}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradeChart;