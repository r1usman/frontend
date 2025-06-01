import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';

const InstructorCompetitions = () => {
  const { competitions, deleteCompetition } = useCompetition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [competitionToDelete, setCompetitionToDelete] = useState(null);

  const confirmDelete = (id) => {
    setCompetitionToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (competitionToDelete) {
      deleteCompetition(competitionToDelete);
      setShowDeleteModal(false);
      setCompetitionToDelete(null);
    }
  };

  const getStatusBadge = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
          Upcoming
        </span>
      );
    } else if (now >= start && now <= end) {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          Active
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
          Ended
        </span>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Competitions</h1>
        <Link
          to="/Mod/competitions/new"
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus size={18} />
          <span>New Competition</span>
        </Link>
      </div>

      {competitions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">No competitions found</p>
          <Link
            to="/competitions/new"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={18} />
            <span>Create your first competition</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((competition) => (
            <div key={competition.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold mb-2 min-h-16 ">{competition.name}</h2>
                  {getStatusBadge(competition.startTime, competition.endTime)}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {competition.description}
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between ">
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
                <Link
                  to={`/Mod/competitions/${competition.id}/leaderboard`}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                >
                  <Users size={16} />
                  <span>Leaderboard</span>
                </Link>
                <div className="flex space-x-3 items-center">
                  <Link
                    to={`/Mod/competitions/${competition.id}/edit`}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => confirmDelete(competition.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
  <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
      <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
      <p className="mb-6">
        Are you sure you want to delete this competition? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default InstructorCompetitions;
