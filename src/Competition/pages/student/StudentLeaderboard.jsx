import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';
import { ArrowLeft } from 'lucide-react';
import Leaderboard from '../../components/Leaderboard';

const StudentLeaderboard = () => {
  const { id } = useParams();
  const { competitions, submissions } = useCompetition();

  if (!id) {
    return <div>Competition ID is required</div>;
  }

  const competition = competitions.find((c) => c.id === id);

  if (!competition) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Competition not found</p>
        <Link
          to="/student/competitions"
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={18} />
          <span>Back to Competitions</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to="/student/competitions"
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">{competition.name} - Leaderboard</h1>
      </div>

      <Leaderboard submissions={submissions} competitionId={id} />
    </div>
  );
};

export default StudentLeaderboard;
