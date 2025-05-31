import React from 'react';
import { Link } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';
import { useAuth } from '../../context/AuthContext';
import { Code, Trophy, Clock } from 'lucide-react';
import { format } from 'date-fns';

const StudentCompetitions = () => {
  const { competitions } = useCompetition();
  const { user } = useAuth();

  const now = new Date();

  // Separate competitions into active, upcoming, and past
  const activeCompetitions = competitions.filter(
    (comp) => now >= new Date(comp.startTime) && now <= new Date(comp.endTime)
  );

  const upcomingCompetitions = competitions.filter(
    (comp) => now < new Date(comp.startTime)
  );

  const pastCompetitions = competitions.filter((comp) => now > new Date(comp.endTime));

  const CompetitionCard = ({ competition, status }) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold mb-2">{competition.name}</h2>
            {status === 'active' && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Active
              </span>
            )}
            {status === 'upcoming' && (
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                Upcoming
              </span>
            )}
            {status === 'past' && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                Ended
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{competition.description}</p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Start:</span>
              <span>
                {format(new Date(competition.startTime), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>End:</span>
              <span>
                {format(new Date(competition.endTime), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Problems:</span>
              <span>{competition.problems.length}</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-between">
          {status === 'active' && (
            <Link
              to={`/Mod/student/competitions/${competition.id}`}
              className="w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Enter Competition
            </Link>
          )}
          {status === 'upcoming' && (
            <div className="w-full flex items-center justify-center text-yellow-600">
              <Clock size={18} className="mr-2" />
              <span>Starts in {formatTimeUntil(new Date(competition.startTime))}</span>
            </div>
          )}
          {status === 'past' && (
            <Link
              to={`/student/competitions/${competition.id}/leaderboard`}
              className="w-full text-center text-indigo-600 py-2 px-4 border border-indigo-600 rounded-md hover:bg-indigo-50"
            >
              View Results
            </Link>
          )}
        </div>
      </div>
    );
  };

  const formatTimeUntil = (date) => {
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${
        hours > 1 ? 's' : ''
      }`;
    }

    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Competitions</h1>

      {activeCompetitions.length === 0 &&
      upcomingCompetitions.length === 0 &&
      pastCompetitions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Trophy size={48} className="text-gray-400" />
          </div>
          <p className="text-gray-500">No competitions available</p>
        </div>
      ) : (
        <div className="space-y-8  ">
          {activeCompetitions.length > 0 && (
            <div className='  bg-[#f7f7f7] px-6 py-5 border border-gray-200 rounded-md'>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Code size={20} className="mr-2 text-green-600" />
                Active Competitions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCompetitions.map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    competition={competition}
                    status="active"
                  />
                ))}
              </div>
            </div>
          )}

          {upcomingCompetitions.length > 0 && (
            <div className='bg-[#f7f7f7] px-6 py-5 border border-gray-200 rounded-md'>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-yellow-600" />
                Upcoming Competitions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingCompetitions.map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    competition={competition}
                    status="upcoming"
                  />
                ))}
              </div>
            </div>
          )}

          {pastCompetitions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Trophy size={20} className="mr-2 text-gray-600" />
                Past Competitions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastCompetitions.map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    competition={competition}
                    status="past"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCompetitions;
