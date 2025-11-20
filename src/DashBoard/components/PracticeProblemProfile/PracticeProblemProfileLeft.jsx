// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { problemsApi, authApi, userApi } from '../../../services/api';

// export default function PracticeProblemProfileLeft() {
//   const [recentSubmissions, setRecentSubmissions] = useState([]);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [profileLoading, setProfileLoading] = useState(true);

//   const [problemStats, setProblemStats] = useState(null); // dynamic stats from backend
//   const [userStats, setUserStats] = useState(null); // user's solved counts

//   const [statsLoading, setStatsLoading] = useState(true);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchRecentSubmissions();
//     fetchProblemStats();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       setProfileLoading(true);
//       const data = await authApi.getUserProfile();
//       setUserProfile(data.user);

//       // After getting user profile, fetch their stats
//       if (data.user && data.user._id) {
//         await fetchUserStats(data.user._id);
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   // Fetch user stats from backend
//   const fetchUserStats = async (userId) => {
//     try {
//       const stats = await userApi.getUserStats(userId);
//       setUserStats(stats);
//       console.log('User stats fetched:', stats);
//     } catch (error) {
//       console.error('Error fetching user stats:', error);
//       setUserStats(null);
//     }
//   };

//   const fetchRecentSubmissions = async () => {
//     try {
//       setLoading(true);
//       const data = await problemsApi.getUserSubmissions();

//       // Filter submissions from the past week
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//       const weeklySubmissions = (data || [])
//         .filter(sub => new Date(sub.createdAt) >= oneWeekAgo)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         .slice(0, 5); // Show only the 5 most recent

//       setRecentSubmissions(weeklySubmissions);
//     } catch (error) {
//       console.error('Error fetching recent submissions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch problem stats (total counts per difficulty)
//   const fetchProblemStats = async () => {
//     try {
//       setStatsLoading(true);
//       const stats = await problemsApi.getProblemStats();
//       setProblemStats(stats);
//     } catch (error) {
//       console.error('Error fetching problem stats:', error);
//       setProblemStats(null);
//     } finally {
//       setStatsLoading(false);
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'EASY': return 'bg-green-100 text-green-800';
//       case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
//       case 'MEDIUM_HARD': return 'bg-orange-100 text-orange-800';
//       case 'HARD': return 'bg-red-100 text-red-800';
//       case 'VERY_HARD': return 'bg-purple-100 text-purple-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status) => {
//     if (status === 'accepted') return '✓';
//     if (status === 'rejected') return '✗';
//     return '⋯';
//   };

//   const getStatusColor = (status) => {
//     if (status === 'accepted') return 'text-green-600';
//     if (status === 'rejected') return 'text-red-600';
//     return 'text-yellow-600';
//   };

//   const getTimeAgo = (date) => {
//     const now = new Date();
//     const submittedDate = new Date(date);
//     const diffInMs = now - submittedDate;
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (diffInDays === 0) return 'Today';
//     if (diffInDays === 1) return '1 day ago';
//     if (diffInDays < 7) return `${diffInDays} days ago`;
//     return submittedDate.toLocaleDateString();
//   };

//   // Calculate progress percentage for the circle
//   const getProgressPercentage = () => {
//     const total = (problemStats && problemStats.TOTAL) ? problemStats.TOTAL : 0;
//     const solved = getTotalSolved();
//     if (!total) return 0;
//     return (solved / total) * 100;
//   };

//   // Calculate stroke dash offset for the progress circle
//   const getStrokeDashOffset = () => {
//     const circumference = 2 * Math.PI * 45; // 282.6
//     const percentage = getProgressPercentage();
//     return circumference - (circumference * percentage) / 100;
//   };

//   // Get total solved count from userStats
//   const getTotalSolved = () => {
//     if (!userStats) return 0;
//     return userStats.TOTAL || 0;
//   };

//   // Get solved count by difficulty from userStats
//   const getSolvedByDifficulty = (difficulty) => {
//     if (!userStats) return 0;
//     return userStats[difficulty] || 0;
//   };

//   // Calculate active days from submissions
//   const getActiveDays = () => {
//     if (!userProfile || !userProfile.submissions) return 0;
//     return userProfile.submissions.length;
//   };

//   // Show loader for profile or stats while required
//   if (profileLoading || statsLoading) {
//     return (
//       <div className="bg-white rounded-lg p-4 shadow-sm">
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   // Provide fallback totals if API failed or not present
//   const fallbackTotals = { EASY: 879, MEDIUM: 1852, HARD: 839, MEDIUM_HARD: 500, VERY_HARD: 500, TOTAL: 4570 };
//   const totals = problemStats || fallbackTotals;

//   return (
//     <div className="bg-white rounded-lg p-4 shadow-sm">
//       <h2 className="text-lg font-bold text-gray-900">Student Statistics</h2>

//       {/* Stats Circle and Problem Count */}
//       <div className="bg-white rounded-lg p-6">
//         <div className="flex items-center justify-between mb-6">
//           {/* Circle Progress */}
//           <div className="flex items-center">
//             <div className="relative w-40 h-40 mr-10">
//               <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
//                 {/* Background circle */}
//                 <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />

//                 {/* Progress circle */}
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="45"
//                   stroke="url(#gradient)"
//                   strokeWidth="8"
//                   fill="none"
//                   strokeDasharray="282.6"
//                   strokeDashoffset={getStrokeDashOffset()}
//                   strokeLinecap="round"
//                 />

//                 {/* Gradient definition */}
//                 <defs>
//                   <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#8b5cf6" />
//                     <stop offset="100%" stopColor="#3b82f6" />
//                   </linearGradient>
//                 </defs>
//               </svg>

//               {/* Inner Text */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-4xl font-bold text-purple-600">{getTotalSolved()}</div>
//                   <div className="text-sm text-gray-500">/{totals.TOTAL} Problems</div>
//                 </div>
//               </div>
//             </div>

//             {/* Side Info */}
//             <div className="space-y-2">
//               <div className="flex items-center">
//                 <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
//                 <span className="text-sm font-medium">Solved</span>
//               </div>
//               <div className="text-sm text-gray-500">0 Attempting</div>
//             </div>
//           </div>

//           {/* Difficulty Breakdown */}
//           <div className="space-y-2">
//             {/* EASY */}
//             <div className="flex items-center space-x-3">
//               <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-400 rounded-full">EASY</span>
//               <span className="text-sm font-semibold text-gray-700">
//                 {getSolvedByDifficulty('EASY')}
//                 <span className="text-gray-400"> / {totals.EASY}</span>
//               </span>
//             </div>

//             {/* MEDIUM */}
//             <div className="flex items-center space-x-3">
//               <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">MEDIUM</span>
//               <span className="text-sm font-semibold text-gray-700">
//                 {getSolvedByDifficulty('MEDIUM')}
//                 <span className="text-gray-400"> / {totals.MEDIUM}</span>
//               </span>
//             </div>

//             {/* MEDIUM_HARD */}
//             <div className="flex items-center space-x-3">
//               <span className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">MEDIUM_HARD</span>
//               <span className="text-sm font-semibold text-gray-700">
//                 {getSolvedByDifficulty('MEDIUM_HARD')}
//                 <span className="text-gray-400"> / {totals.MEDIUM_HARD}</span>
//               </span>
//             </div>

//             {/* HARD */}
//             <div className="flex items-center space-x-3">
//               <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">HARD</span>
//               <span className="text-sm font-semibold text-gray-700">
//                 {getSolvedByDifficulty('HARD')}
//                 <span className="text-gray-400"> / {totals.HARD}</span>
//               </span>
//             </div>

//             {/* VERY_HARD */}
//             <div className="flex items-center space-x-3">
//               <span className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full">VERY_HARD</span>
//               <span className="text-sm font-semibold text-gray-700">
//                 {getSolvedByDifficulty('VERY_HARD')}
//                 <span className="text-gray-400"> / {totals.VERY_HARD}</span>
//               </span>
//             </div>
//           </div>


//           {/* Badges */}
//           <div className="text-right">
//             <div className="flex items-center mb-2">
//               <span className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-2 py-1 rounded text-xs font-medium mr-2">Badges</span>
//               <span className="text-2xl font-bold bg-gradient-to-r from-[#5737F6] to-[#9612FA] bg-clip-text text-transparent">
//                 {userProfile?.badges?.length || 0}
//               </span>
//             </div>
//             <div className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-3 py-1 rounded text-xs font-medium">
//               Locked Badge
//             </div>
//             <div className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-3 py-1 rounded text-xs font-medium mt-1">
//               Jun LeetCoding Challenge
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Activity Tabs */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
//         <div className="border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">
//                 {recentSubmissions.length}
//               </span>
//               <span className="text-gray-900 font-semibold text-sm">Latest Submissions (Past Week)</span>
//             </div>
//             <Link
//               to="/singleProblems/submissions"
//               className="text-blue-600 text-sm hover:underline font-medium"
//             >
//               View all submissions →
//             </Link>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="p-4">
//           {loading ? (
//             <div className="flex items-center justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
//             </div>
//           ) : recentSubmissions.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500 text-sm">No submissions in the past week</p>
//               <Link
//                 to="/singleProblems/submissions"
//                 className="mt-2 inline-block text-blue-600 text-sm hover:underline"
//               >
//                 View all submissions
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {recentSubmissions.map((submission) => (
//                 <div
//                   key={submission._id}
//                   className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors"
//                 >
//                   <div className="flex items-center flex-1 min-w-0">
//                     <span
//                       className={`text-lg font-bold mr-3 ${getStatusColor(submission.status)}`}
//                       title={submission.status}
//                     >
//                       {getStatusIcon(submission.status)}
//                     </span>
//                     <div className="flex-1 min-w-0 mr-3">
//                       <h3 className="font-medium text-gray-900 text-sm truncate">
//                         {submission.problem?.name || `Problem ${submission.problem?._id}`}
//                       </h3>
//                       <p className="text-xs text-gray-600 truncate">
//                         {submission.language} • {submission.executionTime || 'N/A'}ms
//                       </p>
//                     </div>
//                     {submission.problem?.difficulty && (
//                       <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getDifficultyColor(submission.problem.difficulty)}`}>
//                         {submission.problem.difficulty}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
//                     {getTimeAgo(submission.createdAt)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//==========================================================

/*
What to do?
(1) make upper section which include "Stats Circle and Problem Count", "Difficulty Breakdown", "Badges" more good looking and aligned properly like lower section = "Activity Tabs"
(2) colors of "Difficulty Breakdown" donot look very good and aligned, make them better like you did for lower section = "Activity Tabs"
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { problemsApi, authApi, userApi, badgesApi } from '../../../services/api';
import { ASSET_BASE_URL } from '../../../services/api';

export default function PracticeProblemProfileLeft() {
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  const [problemStats, setProblemStats] = useState(null); // dynamic stats from backend
  const [userStats, setUserStats] = useState(null); // user's solved counts

  const [statsLoading, setStatsLoading] = useState(true);

  const [badges, setBadges] = useState([]);
  const [badgesLoading, setBadgesLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
    fetchRecentSubmissions();
    fetchProblemStats();
    fetchUserBadges();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const data = await authApi.getUserProfile();
      setUserProfile(data.user);

      // After getting user profile, fetch their stats
      if (data.user && data.user._id) {
        await fetchUserStats(data.user._id);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch user stats from backend
  const fetchUserStats = async (userId) => {
    try {
      const stats = await userApi.getUserStats(userId);
      setUserStats(stats);
      console.log('User stats fetched:', stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      setUserStats(null);
    }
  };

  const fetchRecentSubmissions = async () => {
    try {
      setLoading(true);
      const data = await problemsApi.getUserSubmissions();

      // Filter submissions from the past week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const weeklySubmissions = (data || [])
        .filter(sub => new Date(sub.createdAt) >= oneWeekAgo)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5); // Show only the 5 most recent

      setRecentSubmissions(weeklySubmissions);
    } catch (error) {
      console.error('Error fetching recent submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch problem stats (total counts per difficulty)
  const fetchProblemStats = async () => {
    try {
      setStatsLoading(true);
      const stats = await problemsApi.getProblemStats();
      setProblemStats(stats);
    } catch (error) {
      console.error('Error fetching problem stats:', error);
      setProblemStats(null);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchUserBadges = async () => {
    try {
      setBadgesLoading(true);
      const data = await badgesApi.getMyBadges();
      setBadges(data.badges || []);
    } catch (error) {
      console.error("Error fetching badges:", error);
    } finally {
      setBadgesLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'MEDIUM_HARD': return 'bg-orange-100 text-orange-800';
      case 'HARD': return 'bg-red-100 text-red-800';
      case 'VERY_HARD': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'accepted') return '✓';
    if (status === 'rejected') return '✗';
    return '⋯';
  };

  const getStatusColor = (status) => {
    if (status === 'accepted') return 'text-green-600';
    if (status === 'rejected') return 'text-red-600';
    return 'text-yellow-600';
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const submittedDate = new Date(date);
    const diffInMs = now - submittedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return submittedDate.toLocaleDateString();
  };

  // Calculate progress percentage for the circle
  const getProgressPercentage = () => {
    const total = (problemStats && problemStats.TOTAL) ? problemStats.TOTAL : 0;
    const solved = getTotalSolved();
    if (!total) return 0;
    return (solved / total) * 100;
  };

  // Calculate stroke dash offset for the progress circle
  const getStrokeDashOffset = () => {
    const circumference = 2 * Math.PI * 45; // 282.6
    const percentage = getProgressPercentage();
    return circumference - (circumference * percentage) / 100;
  };

  // Get total solved count from userStats
  const getTotalSolved = () => {
    if (!userStats) return 0;
    return userStats.TOTAL || 0;
  };

  // Get solved count by difficulty from userStats
  const getSolvedByDifficulty = (difficulty) => {
    if (!userStats) return 0;
    return userStats[difficulty] || 0;
  };

  // Calculate active days from submissions
  const getActiveDays = () => {
    if (!userProfile || !userProfile.submissions) return 0;
    return userProfile.submissions.length;
  };

  // Show loader for profile or stats while required
  if (profileLoading || statsLoading) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  // Provide fallback totals if API failed or not present
  const fallbackTotals = { EASY: 879, MEDIUM: 1852, HARD: 839, MEDIUM_HARD: 500, VERY_HARD: 500, TOTAL: 4570 };
  const totals = problemStats || fallbackTotals;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">Student Statistics</h2>

      {/* Stats Circle and Problem Count */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Circle Progress */}
          <div className="flex items-center">
            <div className="relative w-40 h-40 mr-10">
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
                  strokeDasharray="282.6"
                  strokeDashoffset={getStrokeDashOffset()}
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
                  <div className="text-4xl font-bold text-purple-600">{getTotalSolved()}</div>
                  <div className="text-sm text-gray-500">/{totals.TOTAL} Problems</div>
                </div>
              </div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="space-y-2">
            {/* EASY */}
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-400 rounded-full">EASY</span>
              <span className="text-sm font-semibold text-gray-700">
                {getSolvedByDifficulty('EASY')}
                <span className="text-gray-400"> / {totals.EASY}</span>
              </span>
            </div>

            {/* MEDIUM */}
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">MEDIUM</span>
              <span className="text-sm font-semibold text-gray-700">
                {getSolvedByDifficulty('MEDIUM')}
                <span className="text-gray-400"> / {totals.MEDIUM}</span>
              </span>
            </div>

            {/* MEDIUM_HARD */}
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">MEDIUM_HARD</span>
              <span className="text-sm font-semibold text-gray-700">
                {getSolvedByDifficulty('MEDIUM_HARD')}
                <span className="text-gray-400"> / {totals.MEDIUM_HARD}</span>
              </span>
            </div>

            {/* HARD */}
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">HARD</span>
              <span className="text-sm font-semibold text-gray-700">
                {getSolvedByDifficulty('HARD')}
                <span className="text-gray-400"> / {totals.HARD}</span>
              </span>
            </div>

            {/* VERY_HARD */}
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full">VERY_HARD</span>
              <span className="text-sm font-semibold text-gray-700">
                {getSolvedByDifficulty('VERY_HARD')}
                <span className="text-gray-400"> / {totals.VERY_HARD}</span>
              </span>
            </div>
          </div>


          {/* Badges */}
          <div className="w-64">

            {badgesLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-t-blue-600"></div>
              </div>
            ) : badges.length === 0 ? (
              <div className="text-gray-400 text-sm text-center py-2">No badges earned yet</div>
            ) : (
              <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-100 pr-1">
                {badges.map((badge) => (
                  <div
                    key={badge._id}
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#5737F6]/10 to-[#9612FA]/10 hover:from-[#5737F6]/20 hover:to-[#9612FA]/20 rounded-lg p-2 mb-2 transition"
                  >
                    

                    <img
                      src={`${ASSET_BASE_URL}/badges/${badge.assetPath}`}
                      alt={badge.name}
                      className="w-28 h-28"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.type} • Rank {badge.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Activity Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                {recentSubmissions.length}
              </span>
              <span className="text-gray-900 font-semibold text-sm">Latest Submissions (Past Week)</span>
            </div>
            <Link
              to="/singleProblems/submissions"
              className="text-blue-600 text-sm hover:underline font-medium"
            >
              View all submissions →
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600"></div>
            </div>
          ) : recentSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No submissions in the past week</p>
              <Link
                to="/singleProblems/submissions"
                className="mt-2 inline-block text-blue-600 text-sm hover:underline"
              >
                View all submissions
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <span
                      className={`text-lg font-bold mr-3 ${getStatusColor(submission.status)}`}
                      title={submission.status}
                    >
                      {getStatusIcon(submission.status)}
                    </span>
                    <div className="flex-1 min-w-0 mr-3">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {submission.problem?.name || `Problem ${submission.problem?._id}`}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {submission.language} • {submission.executionTime || 'N/A'}ms
                      </p>
                    </div>
                    {submission.problem?.difficulty && (
                      <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getDifficultyColor(submission.problem.difficulty)}`}>
                        {submission.problem.difficulty}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                    {getTimeAgo(submission.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}