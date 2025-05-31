import React, { useMemo } from 'react';
import { Trophy, Medal } from 'lucide-react';
import { format } from 'date-fns';

const Leaderboard = ({ submissions, competitionId }) => {
  const leaderboard = useMemo(() => {
    // Filter submissions for this competition
    const competitionSubmissions = submissions.filter(
      (sub) => sub.competitionId === competitionId && sub.status === 'completed'
    );

    // Group by user
    const userSubmissions = {};
    competitionSubmissions.forEach((sub) => {
      if (!userSubmissions[sub.userId]) {
        userSubmissions[sub.userId] = [];
      }
      userSubmissions[sub.userId].push(sub);
    });

    // Calculate scores and stats for each user
    const leaderboardEntries = Object.entries(userSubmissions).map(([userId, subs]) => {
      // Get the best submission for each problem
      const problemBestSubmissions = {};

      subs.forEach((sub) => {
        const existing = problemBestSubmissions[sub.problemId];
        if (
          !existing ||
          sub.score > existing.score ||
          (sub.score === existing.score &&
            new Date(sub.submissionTime) < new Date(existing.submissionTime))
        ) {
          problemBestSubmissions[sub.problemId] = sub;
        }
      });

      const bestSubmissions = Object.values(problemBestSubmissions);
      const totalScore = bestSubmissions.reduce((sum, sub) => sum + sub.score, 0);
      const problemsSolved = bestSubmissions.filter((sub) => sub.score > 0).length;

      // Find the latest submission time
      const lastSubmissionTime = new Date(
        Math.max(...bestSubmissions.map((sub) => new Date(sub.submissionTime).getTime()))
      ).toISOString();

      return {
        userId,
        username: subs[0].username, // All submissions from same user have same username
        problemsSolved,
        totalScore,
        lastSubmissionTime,
      };
    });

    // Sort by score (desc), then by problems solved (desc), then by submission time (asc)
    return leaderboardEntries.sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (b.problemsSolved !== a.problemsSolved) return b.problemsSolved - a.problemsSolved;
      return new Date(a.lastSubmissionTime).getTime() - new Date(b.lastSubmissionTime).getTime();
    });
  }, [submissions, competitionId]);

  const getPositionIcon = (position) => {
    switch (position) {
      case 0:
        return <Trophy className="text-yellow-500" size={20} />;
      case 1:
        return <Medal className="text-gray-400" size={20} />;
      case 2:
        return <Medal className="text-amber-600" size={20} />;
      default:
        return <span className="text-gray-500 font-medium">{position + 1}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-indigo-600 text-white px-6 py-4">
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>

      {leaderboard.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No submissions yet. Be the first to submit!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problems Solved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Submission
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((entry, index) => (
                <tr key={entry.userId} className={index < 3 ? 'bg-indigo-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getPositionIcon(index)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{entry.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{entry.problemsSolved}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-medium">{entry.totalScore}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(entry.lastSubmissionTime), 'MMM d, yyyy HH:mm:ss')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
