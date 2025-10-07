// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { UserContext } from '../GlobalContext/UserContext';
// import { problemsApi } from '../services/api';

// const SubmissionsPage = () => {
//   const { problemId } = useParams(); // Optional: for problem-specific submissions
//   const navigate = useNavigate();
//   const { User } = useContext(UserContext);
  
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // 'all', 'accepted', 'rejected'

//   useEffect(() => {
//     if (!User) {
//       navigate('/login');
//       return;
//     }
//     fetchSubmissions();
//   }, [User, problemId]);

//   const fetchSubmissions = async () => {
//     try {
//       setLoading(true);
//       const data = await problemsApi.getUserSubmissions();
      
//       // Filter by problem if problemId is provided
//       let filteredData = data;
//       if (problemId) {
//         filteredData = data.filter(sub => sub.problemId === problemId);
//       }
      
//       setSubmissions(filteredData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//       setLoading(false);
//     }
//   };

//   const filteredSubmissions = submissions.filter(sub => {
//     if (filter === 'accepted') return sub.status === 'accepted';
//     if (filter === 'rejected') return sub.status === 'rejected';
//     return true;
//   });

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'accepted': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             {problemId ? 'Problem Submissions' : 'My Submissions'}
//           </h1>
//           <p className="text-gray-600">
//             {problemId 
//               ? 'View all your submissions for this problem' 
//               : 'View all your code submissions across all problems'}
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="mb-6 flex gap-4">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               filter === 'all' 
//                 ? 'bg-blue-600 text-white' 
//                 : 'bg-white text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             All ({submissions.length})
//           </button>
//           <button
//             onClick={() => setFilter('accepted')}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               filter === 'accepted' 
//                 ? 'bg-green-600 text-white' 
//                 : 'bg-white text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             Accepted
//           </button>
//           <button
//             onClick={() => setFilter('rejected')}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               filter === 'rejected' 
//                 ? 'bg-red-600 text-white' 
//                 : 'bg-white text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             Rejected
//           </button>
//         </div>

//         {/* Submissions List */}
//         {filteredSubmissions.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//             <p className="text-gray-600">No submissions found</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredSubmissions.map((submission) => (
//               <Link
//                 key={submission._id}
//                 to={`/submissions/${submission._id}`}
//                 className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-lg text-gray-900 mb-2">
//                       {submission.problemName || `Problem ${submission.problemId}`}
//                     </h3>
//                     <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                       <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(submission.status)}`}>
//                         {submission.status}
//                       </span>
//                       <span>Language: {submission.language}</span>
//                       <span>Time: {submission.elapsedTimeMs ? `${(submission.elapsedTimeMs / 1000).toFixed(2)}s` : 'N/A'}</span>
//                       <span>Submitted: {new Date(submission.createdAt).toLocaleString()}</span>
//                     </div>
//                   </div>
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubmissionsPage;


// =============================================== (2)


// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { UserContext } from '../GlobalContext/UserContext';
// import { problemsApi } from '../services/api';

// const SubmissionsPage = () => {
//   const { problemId } = useParams();
//   const navigate = useNavigate();
//   const { User } = useContext(UserContext);
  
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [authChecked, setAuthChecked] = useState(false); // Track if initial auth check is complete
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     fetchSubmissions();
//   }, [User, problemId]); // Remove navigate from dependencies

//   const fetchSubmissions = async () => {
//     try {
//       setLoading(true);
//       const data = await problemsApi.getUserSubmissions();
      
//       let filteredData = data;
//       if (problemId) {
//         filteredData = data.filter(sub => sub.problemId === problemId);
//       }
      
//       setSubmissions(filteredData);
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//       // Handle authentication error from API
//       if (error.message === 'AUTHENTICATION_REQUIRED') {
//         navigate('/login');
//         return;
//       }
//       // Handle other errors as needed
//     } finally {
//       setLoading(false);
//       setAuthChecked(true); // Mark initial auth check as complete
//     }
//   };

//   // Show loading spinner only during initial load
//   if (loading && !authChecked) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
//       </div>
//     );
//   }

//   // The rest of your component JSX remains the same...
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             {problemId ? 'Problem Submissions' : 'My Submissions'}
//           </h1>
//           <p className="text-gray-600">
//             {problemId 
//               ? 'View all your submissions for this problem' 
//               : 'View all your code submissions across all problems'}
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="mb-6 flex gap-4">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               filter === 'all' 
//                 ? 'bg-blue-600 text-white' 
//                 : 'bg-white text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             All ({submissions.length})
//           </button>
//           <button
//             onClick={() => setFilter('accepted')}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               filter === 'accepted' 
//                 ? 'bg-green-600 text-white' 
//                 : 'bg-white text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             Accepted
//           </button>
//           <button
//             onClick={() => setFilter('rejected')}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//               filter === 'rejected' 
//                 ? 'bg-red-600 text-white' 
//                 : 'bg-white text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             Rejected
//           </button>
//         </div>

//         {/* Submissions List */}
//         {filteredSubmissions.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//             <p className="text-gray-600">No submissions found</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredSubmissions.map((submission) => (
//               <Link
//                 key={submission._id}
//                 to={`/submissions/${submission._id}`}
//                 className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-lg text-gray-900 mb-2">
//                       {submission.problemName || `Problem ${submission.problemId}`}
//                     </h3>
//                     <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                       <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(submission.status)}`}>
//                         {submission.status}
//                       </span>
//                       <span>Language: {submission.language}</span>
//                       <span>Time: {submission.elapsedTimeMs ? `${(submission.elapsedTimeMs / 1000).toFixed(2)}s` : 'N/A'}</span>
//                       <span>Submitted: {new Date(submission.createdAt).toLocaleString()}</span>
//                     </div>
//                   </div>
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubmissionsPage;

// ============================================== (3)


import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../GlobalContext/UserContext';
import { problemsApi } from '../services/api';

const SubmissionsPage = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { User } = useContext(UserContext);
  
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [problemId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await problemsApi.getUserSubmissions();
      
      let filteredData = data;
      if (problemId) {
        filteredData = data.filter(sub => sub.problemId === problemId || sub.problem?._id === problemId);
      }
      
      setSubmissions(filteredData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      if (error.message === 'AUTHENTICATION_REQUIRED') {
        navigate('/login');
        return;
      }
      setError('Failed to load submissions. Please try again later.');
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'accepted') return sub.status === 'accepted';
    if (filter === 'rejected') return sub.status === 'rejected';
    if (filter === 'pending') return sub.status === 'pending';
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'EASY': return 'text-green-600';
      case 'MEDIUM': return 'text-yellow-600';
      case 'HARD': return 'text-orange-600';
      case 'VERY_HARD': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  if (loading && !authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {problemId ? 'Problem Submissions' : 'My Submissions'}
          </h1>
          <p className="text-gray-600">
            {problemId 
              ? 'View all your submissions for this problem' 
              : 'View all your code submissions across all problems'}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            All ({submissions.length})
          </button>
          <button
            onClick={() => setFilter('accepted')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'accepted' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Accepted ({submissions.filter(s => s.status === 'accepted').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'rejected' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Rejected ({submissions.filter(s => s.status === 'rejected').length})
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchSubmissions}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Submissions List */}
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600">
              {loading ? 'Loading submissions...' : 'No submissions found'}
            </p>
            {!loading && (
              <button
                onClick={fetchSubmissions}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission._id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {submission.problem?.title || `Problem ${submission.problemId || submission.problem?._id}`}
                      </h3>
                      {submission.problem?.difficulty && (
                        <span className={`text-sm font-medium ${getDifficultyColor(submission.problem.difficulty)}`}>
                          {submission.problem.difficulty}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                      <span className={`px-3 py-1 rounded-full font-medium border ${getStatusColor(submission.status)}`}>
                        {submission.status.toUpperCase()}
                      </span>
                      <span>Language: {submission.language} {submission.version && `(${submission.version})`}</span>
                      <span>Time: {submission.elapsedTimeMs ? formatTime(submission.elapsedTimeMs) : 'N/A'}</span>
                      <span>Exec: {submission.executionTime || 'N/A'}ms</span>
                      <span>Submitted: {new Date(submission.createdAt).toLocaleString()}</span>
                    </div>

                    {/* Code Preview */}
                    <div className="mb-4">
                      <details className="group">
                        <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                          View Code
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs overflow-x-auto border">
                          {submission.code}
                        </pre>
                      </details>
                    </div>

                    {/* Test Cases Results */}
                    {submission.results && submission.results.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Test Cases:</h4>
                        <div className="grid gap-2">
                          {submission.results.map((test, idx) => (
                            <div
                              key={test._id || idx}
                              className={`p-3 rounded border ${
                                test.passed
                                  ? 'bg-green-50 border-green-200'
                                  : 'bg-red-50 border-red-200'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">Test {idx + 1}</span>
                                <span className={`text-xs font-medium ${
                                  test.passed ? 'text-green-700' : 'text-red-700'
                                }`}>
                                  {test.passed ? '✓ PASSED' : '✗ FAILED'}
                                  {test.executionTime && ` (${test.executionTime}ms)`}
                                </span>
                              </div>
                              
                              <div className="text-xs space-y-2">
                                <div>
                                  <span className="font-medium">Input:</span>
                                  <pre className="mt-1 p-2 bg-white rounded border text-xs">{test.input}</pre>
                                </div>
                                {!test.passed && (
                                  <>
                                    <div>
                                      <span className="font-medium">Expected:</span>
                                      <pre className="mt-1 p-2 bg-white rounded border text-xs">{test.expected}</pre>
                                    </div>
                                    <div>
                                      <span className="font-medium">Output:</span>
                                      <pre className="mt-1 p-2 bg-white rounded border text-xs">{test.output}</pre>
                                    </div>
                                  </>
                                )}
                                {test.error && (
                                  <div>
                                    <span className="font-medium text-red-700">Error:</span>
                                    <pre className="mt-1 p-2 bg-red-100 rounded border text-xs text-red-800">{test.error}</pre>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Note */}
                    {submission.note && (
                      <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                        <span className="font-medium text-sm text-blue-900">Note:</span>
                        <p className="text-sm text-blue-800 mt-1">{submission.note}</p>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    to={`/submissions/${submission._id}`}
                    className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="View submission details"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsPage;