// import React from 'react';

// export default function PracticeProblemProfileLeft() {
//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* Left Column */}
//           <div className="lg:col-span-2">
//           <h2 className="text-lg font-bold text-gray-900 mb-4">Stats</h2>

//             {/* Stats Circle and Problem Count */}
//             <div className="bg-white rounded-lg p-6 mb-6">
//               <div className="flex items-center justify-between mb-6">
//                 {/* Circle Progress */}
//                 <div className="flex items-center">
//                   <div className="relative w-32 h-32 mr-8">
//                     <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
//                       <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
//                       <circle cx="50" cy="50" r="40" stroke="url(#gradient)" strokeWidth="8" fill="none" 
//                               strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round"/>
//                       <defs>
//                         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                           <stop offset="0%" stopColor="#8b5cf6"/>
//                           <stop offset="100%" stopColor="#3b82f6"/>
//                         </linearGradient>
//                       </defs>
//                     </svg>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-purple-600">248</div>
//                         <div className="text-sm text-gray-500">/3570 Problems</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center">
//                       <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
//                       <span className="text-sm font-medium">Solved</span>
//                     </div>
//                     <div className="text-sm text-gray-500">0 Attempting</div>
//                   </div>
//                 </div>

//                 {/* Problem Stats */}
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Easy</span>
//                     <span className="text-sm font-medium">1/879</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Med.</span>
//                     <span className="text-sm font-medium">0/1852</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Hard</span>
//                     <span className="text-sm font-medium">0/839</span>
//                   </div>
//                 </div>

//                 {/* Badges */}
//                 <div className="text-right">
//                   <div className="flex items-center mb-2">
//                     <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Badges</span>
//                     <span className="text-2xl font-bold text-blue-500">0</span>
//                   </div>
//                   <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium">
//                     Locked Badge
//                   </div>
//                   <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium mt-1">
//                     Jun LeetCoding Challenge
//                   </div>
//                 </div>
//               </div>

//               {/* Submission Stats */}
//               <div className="border-t pt-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <div className="flex items-center">
//                     <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">1</span>
//                     <span className="text-blue-600 font-medium">submissions in the past one year</span>
//                     <svg className="w-4 h-4 text-gray-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
//                     </svg>
//                   </div>
//                   <div className="text-gray-500">
//                     <span>Total active days: 1</span>
//                     <span className="ml-4">Max streak: 1</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Activity Tabs */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="border-b mb-6">
//                 <nav className="flex space-x-8">
//                   <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">Recent AC</button>
//                   <button className="text-gray-500 pb-2 hover:text-gray-700">List</button>
//                   <button className="text-gray-500 pb-2 hover:text-gray-700">Solutions</button>
//                   <button className="text-gray-500 pb-2 hover:text-gray-700">Discuss</button>
//                   <div className="ml-auto">
//                     <button className="text-blue-600 text-sm hover:underline">View all submissions →</button>
//                   </div>
//                 </nav>
//               </div>

//               {/* Recent Activity */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
//                   <div className="flex items-center">
//                     <div className="mr-4">
//                       <h3 className="font-medium text-gray-900">Two Sum</h3>
//                       <p className="text-sm text-gray-600">Solved using HashMap approach with O(n) time complexity</p>
//                     </div>
//                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Easy</span>
//                   </div>
//                   <span className="text-sm text-blue-600">6 days ago</span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
//                   <div className="flex items-center">
//                     <div className="mr-4">
//                       <h3 className="font-medium text-gray-900">Binary Search</h3>
//                     </div>
//                     <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Medium</span>
//                   </div>
//                   <span className="text-sm text-blue-600">1 week ago</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';

export default function PracticeProblemProfileLeft() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">Student Statistics</h2>

      {/* Stats Circle and Problem Count */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Circle Progress */}
          {/* <div className="flex items-center">
            <div className="relative w-32 h-32 mr-8">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                <circle cx="50" cy="50" r="40" stroke="url(#gradient)" strokeWidth="8" fill="none" 
                        strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">248</div>
                  <div className="text-sm text-gray-500">/3570 Problems</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm font-medium">Solved</span>
              </div>
              <div className="text-sm text-gray-500">0 Attempting</div>
            </div>
          </div> */}
          {/* Circle Progress */}
          <div className="flex items-center">
            <div className="relative w-40 h-40 mr-10"> {/* Increased size */}
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />

                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="282.6" // 2 * π * r (approx. 2 * 3.14 * 45)
                  strokeDashoffset="200" // Adjust based on progress
                  strokeLinecap="round"
                />

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">248</div> {/* Larger text */}
                  <div className="text-sm text-gray-500">/3570 Problems</div>
                </div>
              </div>
            </div>

            {/* Side Info */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm font-medium">Solved</span>
              </div>
              <div className="text-sm text-gray-500">0 Attempting</div>
            </div>
          </div>

          {/* Problem Stats */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Easy</span>
              <span className="text-sm font-semibold text-gray-700">1<span className="text-gray-400"> / 879</span></span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">Med.</span>
              <span className="text-sm font-semibold text-gray-700">0<span className="text-gray-400"> / 1852</span></span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">Hard</span>
              <span className="text-sm font-semibold text-gray-700">0<span className="text-gray-400"> / 839</span></span>
            </div>
          </div>


          {/* Badges */}
          {/* Badges */}
          <div className="text-right">
            <div className="flex items-center mb-2">
              <span className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-2 py-1 rounded text-xs font-medium mr-2">Badges</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#5737F6] to-[#9612FA] bg-clip-text text-transparent">0</span>
            </div>
            <div className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-3 py-1 rounded text-xs font-medium">
              Locked Badge
            </div>
            <div className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-3 py-1 rounded text-xs font-medium mt-1">
              Jun LeetCoding Challenge
            </div>
          </div>
        </div>

        {/* Submission Stats */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">1</span>
              <span className="text-blue-600 font-medium">submissions in the past one year</span>
              <svg className="w-4 h-4 text-gray-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-gray-500">
              <span>Total active days: 1</span>
              <span className="ml-4">Max streak: 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="bg-white rounded-lg p-6">
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">Recent AC</button>
            <button className="text-gray-500 pb-2 hover:text-gray-700">List</button>
            <button className="text-gray-500 pb-2 hover:text-gray-700">Solutions</button>
            <button className="text-gray-500 pb-2 hover:text-gray-700">Discuss</button>
            <div className="ml-auto">
              <button className="text-blue-600 text-sm hover:underline">View all submissions →</button>
            </div>
          </nav>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
            <div className="flex items-center">
              <div className="mr-4">
                <h3 className="font-medium text-gray-900">Two Sum</h3>
                <p className="text-sm text-gray-600">Solved using HashMap approach with O(n) time complexity</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Easy</span>
            </div>
            <span className="text-sm text-blue-600">6 days ago</span>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
            <div className="flex items-center">
              <div className="mr-4">
                <h3 className="font-medium text-gray-900">Binary Search</h3>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Medium</span>
            </div>
            <span className="text-sm text-blue-600">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}