// // src/problemset/components/Leaderboard.jsx
// import React from "react";

// const Leaderboard = ({ title, entries }) => {
//   return (
//     <>
//       <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
//       <div className="space-y-3">
//         {entries.map((entry, index) => (
//           <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
//             <div className="flex items-center">
//               <span className="font-bold text-gray-700 mr-3">#{entry.rank}</span>
//               <span className="font-medium">{entry.username}</span>
//             </div>
//             <span className="text-blue-500 font-medium">{entry.points}pts</span>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Leaderboard;

import React from "react";

const Leaderboard = ({ title, entries }) => {
  return (
    <div className="h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
            <div className="flex items-center">
              <span className="font-bold text-gray-700 mr-2">#{entry.rank}</span>
              <span className="font-medium truncate">{entry.username}</span>
            </div>
            <span className="text-blue-500 font-medium">{entry.points}pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;