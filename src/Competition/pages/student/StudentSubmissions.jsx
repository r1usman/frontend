import React from 'react';
import { Link } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const StudentSubmissions = () => {
  const { competitions, submissions, getSubmissionsByUser } = useCompetition();
  const { user } = useAuth();

  if (!user) {
    return <div>User not found</div>;
  }

  const userSubmissions = getSubmissionsByUser(user.id);

  // Group submissions by competition
  const submissionsByCompetition = {};
  userSubmissions.forEach((submission) => {
    if (!submissionsByCompetition[submission.competitionId]) {
      submissionsByCompetition[submission.competitionId] = [];
    }
    submissionsByCompetition[submission.competitionId].push(submission);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Submissions</h1>

      {Object.keys(submissionsByCompetition).length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">
            You haven't made any submissions yet
          </p>
          <Link
            to="/student/competitions"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <span>Browse Competitions</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(submissionsByCompetition).map(
            ([competitionId, competitionSubmissions]) => {
              const competition = competitions.find(
                (c) => c.id === competitionId
              );
              if (!competition) return null;

              return (
                <div
                  key={competitionId}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="p-4 bg-indigo-600 text-white">
                    <h2 className="text-lg font-semibold">
                      {competition.name}
                    </h2>
                    <p className="text-sm opacity-80">
                      {format(
                        new Date(competition.startTime),
                        'MMM d, yyyy'
                      )}{' '}
                      -{' '}
                      {format(new Date(competition.endTime), 'MMM d, yyyy')}
                    </p>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Problem
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submission Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Language
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {competitionSubmissions
                        .sort(
                          (a, b) =>
                            new Date(b.submissionTime).getTime() -
                            new Date(a.submissionTime).getTime()
                        )
                        .map((submission) => {
                          const problem = competition.problems.find(
                            (p) => p.id === submission.problemId
                          );
                          if (!problem) return null;

                          return (
                            <tr
                              key={submission.id}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {problem.title}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock size={16} className="mr-1" />
                                  {format(
                                    new Date(submission.submissionTime),
                                    'MMM d, yyyy HH:mm:ss'
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 capitalize">
                                  {submission.language}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {submission.status === 'completed' ? (
                                    <CheckCircle
                                      size={16}
                                      className="mr-1 text-green-500"
                                    />
                                  ) : (
                                    <XCircle
                                      size={16}
                                      className="mr-1 text-yellow-500"
                                    />
                                  )}
                                  <span className="text-sm text-gray-900 capitalize">
                                    {submission.status}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {submission.status === 'completed' ? (
                                  <div
                                    className={`text-sm font-medium ${
                                      submission.score >= 70
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                    }`}
                                  >
                                    {submission.score}%
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-500">
                                    -
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSubmissions;
