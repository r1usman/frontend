import React from 'react';

export const StudyStats = () => {
  // Mock data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Generate random data for the bars
  const generateData = () => {
    return Array.from({ length: 12 }, () => ({
      ux: Math.floor(Math.random() * 60),
      ui: Math.floor(Math.random() * 60),
      illustrations: Math.floor(Math.random() * 60),
    }));
  };
  
  const data = generateData();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Study statistics</h2>
        <select className="text-sm border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Yearly</option>
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>
      
      <div className="mb-2 flex space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-xs text-gray-600">UX Design</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
          <span className="text-xs text-gray-600">UI Design</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-xs text-gray-600">Illustrations</span>
        </div>
      </div>

      <div className="h-40 flex items-end">
        <div className="w-full flex justify-between">
          {months.map((month, index) => (
            <div key={month} className="flex-1 flex items-end justify-center group">
              <div className="relative w-5 flex flex-col items-center">
                <div className="absolute top-0 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none">
                  This week average in {month}
                </div>
                
                <div className="h-20 flex space-x-1">
                  <div 
                    className="w-1 bg-red-500 rounded-t transition-all duration-500 ease-in-out" 
                    style={{ height: `${data[index].ux}%` }}
                  ></div>
                  <div 
                    className="w-1 bg-amber-500 rounded-t transition-all duration-500 ease-in-out" 
                    style={{ height: `${data[index].ui}%` }}
                  ></div>
                  <div 
                    className="w-1 bg-blue-500 rounded-t transition-all duration-500 ease-in-out" 
                    style={{ height: `${data[index].illustrations}%` }}
                  ></div>
                </div>
                
                <div className="text-[10px] text-gray-500 mt-1">{month}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
