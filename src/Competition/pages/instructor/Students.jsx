import React from 'react';
import { useCompetition } from '../../context/CompetitionContext';
import { User, Clock } from 'lucide-react';
import { format } from 'date-fns';

const Students = () => {
  const { submissions } = useCompetition();

  // Get unique students from submissions
  const students = submissions.reduce((acc, sub) => {
    if (!acc[sub.userId]) {
      acc[sub.userId] = {
        username: sub.username,
        submissions: 0,
        lastSubmission: sub.submissionTime,
      };
    }

    acc[sub.userId].submissions += 1;

    if (new Date(sub.submissionTime) > new Date(acc[sub.userId].lastSubmission)) {
      acc[sub.userId].lastSubmission = sub.submissionTime;
    }

    return acc;
  }, {});

  const studentList = Object.entries(students).map(([id, data]) => ({
    id,
    username: data.username,
    submissions: data.submissions,
    lastSubmission: data.lastSubmission,
  }));

  // Sort by most recent submission
  studentList.sort(
    (a, b) => new Date(b.lastSubmission).getTime() - new Date(a.lastSubmission).getTime()
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Students</h1>

      {studentList.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No students have made submissions yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Submissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Submission
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentList.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                        <User size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.username}</div>
                        <div className="text-sm text-gray-500">ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.submissions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      {format(new Date(student.lastSubmission), 'MMM d, yyyy HH:mm:ss')}
                    </div>
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

export default Students;
