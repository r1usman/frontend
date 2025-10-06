// import React from "react";

// const ProblemList = ({ problems, currentPage, totalPages, onPageChange }) => {
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   // Difficulty color mapping
//   const difficultyColors = {
//     'EASY': { bg: 'bg-green-100', text: 'text-green-800'},
//     'MEDIUM': { bg: 'bg-yellow-100', text: 'text-yellow-800'},
//     'MEDIUM_HARD': { bg: 'bg-orange-100', text: 'text-orange-800'},
//     'HARD': { bg: 'bg-red-100', text: 'text-red-800'},
//     'VERY_HARD': { bg: 'bg-purple-100', text: 'text-purple-800'}
//   };

//   const formatDifficulty = (difficulty) => {
//     const map = {
//       'EASY': 'Easy',
//       'MEDIUM': 'Medium',
//       'MEDIUM_HARD': 'Medium Hard',
//       'HARD': 'Hard',
//       'VERY_HARD': 'Very Hard'
//     };
//     return map[difficulty] || difficulty;
//   };

//   return (
//     <div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto mb-4">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#14BF96]"> 
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Difficulty</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tags</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {problems.length > 0 ? (
//               problems.map((problem) => {
//                 const difficulty = problem.difficulty?.toUpperCase();
//                 const colors = difficultyColors[difficulty] || { bg: 'bg-gray-100', text: 'text-gray-800'};
//                 const tags = Array.isArray(problem.tags) ? problem.tags : JSON.parse(problem.tags || '[]');
                
//                 return (
//                   <tr key={problem.code} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{problem.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors.bg} ${colors.text}`}>
//                           {formatDifficulty(problem.difficulty)}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-wrap gap-2">
//                         {tags.map((tag, index) => (
//                           <span 
//                             key={index}
//                             className="px-2 py-1 text-xs font-medium bg-[#14BF96] bg-opacity-20 text-white rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
//                   No problems found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
//           <div className="flex-1 flex justify-between sm:hidden">
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//               className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{((currentPage - 1) * 20) + 1}</span> to{' '}
//                 <span className="font-medium">
//                   {Math.min(currentPage * 20, problems.length + ((currentPage - 1) * 20))}
//                 </span> of{' '}
//                 <span className="font-medium">{problems.length + ((currentPage - 1) * 20)}</span> results
//               </p>
//             </div>
//             <div>
//               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                 <button
//                   onClick={handlePrevious}
//                   disabled={currentPage === 1}
//                   className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'}`}
//                 >
//                   <span className="sr-only">Previous</span>
//                   &larr;
//                 </button>
                
//                 {/* Page numbers */}
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => onPageChange(pageNum)}
//                       className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum ? 'z-10 bg-[#14BF96] border-[#14BF96] text-white' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}

//                 <button
//                   onClick={handleNext}
//                   disabled={currentPage === totalPages}
//                   className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'}`}
//                 >
//                   <span className="sr-only">Next</span>
//                   &rarr;
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProblemList;

// ========================================================
// =========================== v2 =========================
// ========================================================

// import React from "react";

// const ProblemList = ({ problems, currentPage, totalPages, onPageChange }) => {
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   // Difficulty color mapping
//   const difficultyColors = {
//     'EASY': {text: 'text-green-400'}, //{ bg: 'bg-green-100', text: 'text-green-800'},
//     'MEDIUM': {text: 'text-yellow-400'}, //{ bg: 'bg-yellow-100', text: 'text-yellow-800'},
//     'MEDIUM_HARD': {text: 'text-orange-400'}, //{ bg: 'bg-orange-100', text: 'text-orange-800'},
//     'HARD': {text: 'text-red-400'},  //{ bg: 'bg-red-100', text: 'text-red-800'},
//     'VERY_HARD': {text: 'text-purple-400'},  //{ bg: 'bg-purple-100', text: 'text-purple-800'}
//   };

//   const formatDifficulty = (difficulty) => {
//     const map = {
//       'EASY': 'Easy',
//       'MEDIUM': 'Medium',
//       'MEDIUM_HARD': 'Medium Hard',
//       'HARD': 'Hard',
//       'VERY_HARD': 'Very Hard'
//     };
//     return map[difficulty] || difficulty;
//   };

//   return (
//     <div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto mb-4">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gradient-to-r from-[#5737F6] to-[#9612FA]"> 
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Difficulty</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tags</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {problems.length > 0 ? (
//               problems.map((problem) => {
//                 const difficulty = problem.difficulty?.toUpperCase();
//                 const colors = difficultyColors[difficulty] || { bg: 'bg-gray-100', text: 'text-gray-800'};
//                 const tags = Array.isArray(problem.tags) ? problem.tags : JSON.parse(problem.tags || '[]');
                
//                 return (
//                   <tr key={problem.code} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{problem.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors.bg} ${colors.text}`}>
//                           {formatDifficulty(problem.difficulty)}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-wrap gap-2">
//                         {tags.map((tag, index) => (
//                           <span 
//                             key={index}
//                             className="px-2 py-1 text-xs font-medium bg-opacity-20 text-[#5737F6] rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
//                   No problems found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
//           <div className="flex-1 flex justify-between sm:hidden">
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//               className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//               className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{((currentPage - 1) * 20) + 1}</span> to{' '}
//                 <span className="font-medium">
//                   {Math.min(currentPage * 20, problems.length + ((currentPage - 1) * 20))}
//                 </span> of{' '}
//                 <span className="font-medium">{problems.length + ((currentPage - 1) * 20)}</span> results
//               </p>
//             </div>
//             <div>
//               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                 <button
//                   onClick={handlePrevious}
//                   disabled={currentPage === 1}
//                   className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'}`}
//                 >
//                   <span className="sr-only">Previous</span>
//                   &larr;
//                 </button>
                
//                 {/* Page numbers */}
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => onPageChange(pageNum)}
//                       className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum ? 'z-10 bg-gradient-to-r from-[#5737F6] to-[#9612FA] border-[#5737F6] text-white' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}

//                 <button
//                   onClick={handleNext}
//                   disabled={currentPage === totalPages}
//                   className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'}`}
//                 >
//                   <span className="sr-only">Next</span>
//                   &rarr;
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProblemList;


// ========================================================
// =========================== v3 =========================
// ========================================================

import React from "react";
import { Link } from "react-router-dom";

const ProblemList = ({ problems, currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Difficulty color mapping
  const difficultyColors = {
    'EASY': {text: 'text-green-400'},
    'MEDIUM': {text: 'text-yellow-400'},
    'MEDIUM_HARD': {text: 'text-orange-400'},
    'HARD': {text: 'text-red-400'},
    'VERY_HARD': {text: 'text-purple-400'}
  };

  const formatDifficulty = (difficulty) => {
    const map = {
      'EASY': 'Easy',
      'MEDIUM': 'Medium',
      'MEDIUM_HARD': 'Medium Hard',
      'HARD': 'Hard',
      'VERY_HARD': 'Very Hard'
    };
    return map[difficulty] || difficulty;
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-[#5737F6] to-[#9612FA]"> 
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tags</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {problems.length > 0 ? (
              problems.map((problem) => {
                const difficulty = problem.difficulty?.toUpperCase();
                const colors = difficultyColors[difficulty] || { bg: 'bg-gray-100', text: 'text-gray-800'};
                const tags = Array.isArray(problem.tags) ? problem.tags : JSON.parse(problem.tags || '[]');
                
                return (
                  <tr key={problem.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        to={`/problemset/${problem.code}`}
                        className="text-[#5737F6] hover:text-[#9612FA] hover:underline transition-colors"
                      >
                        {problem.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors.bg} ${colors.text}`}>
                          {formatDifficulty(problem.difficulty)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 4).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-purple-50 text-[#5737F6] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {tags.length > 4 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            +{tags.length - 4}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No problems found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{((currentPage - 1) * 20) + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * 20, problems.length + ((currentPage - 1) * 20))}
                </span> of{' '}
                <span className="font-medium">{problems.length + ((currentPage - 1) * 20)}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${currentPage === pageNum ? 'z-10 bg-gradient-to-r from-[#5737F6] to-[#9612FA] border-[#5737F6] text-white' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemList;