// // src/problemset/components/SpeedChallenge.jsx
// import React from "react";

// const SpeedChallenge = ({ title, description, challenges }) => {
//   return (
//     <>
//       <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
//       <p className="text-gray-600 mb-4">{description}</p>
//       <div className="space-y-2">
//         {challenges.map((challenge, index) => (
//           <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
//             <span className="font-medium">{challenge.name}</span>
//             <span className="text-sm text-gray-500">{challenge.difficulty}</span>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default SpeedChallenge;

import React from "react";

const SpeedChallenge = ({ title, description, challenges }) => {
  return (
    <div className="h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {challenges.map((challenge, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
            <span className="font-medium">{challenge.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {challenge.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeedChallenge;