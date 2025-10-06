import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../GlobalContext/UserContext';
import { problemsApi } from '../services/api';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { User } = useContext(UserContext);
  
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [editingNote, setEditingNote] = useState(false);

  useEffect(() => {
    if (!User) {
      navigate('/login');
      return;
    }
    fetchSubmission();
  }, [id, User]);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      const data = await problemsApi.getSubmissionById(id);
      setSubmission(data);
      setNote(data.note || '');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching submission:', error);
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    try {
      await problemsApi.updateSubmissionNote(id, note);
      setEditingNote(false);
      alert('Note saved successfully!');
    } catch (error) {
      alert('Failed to save note');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Submission not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/submissions" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Submissions
        </Link>

        {/* Submission Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Submission Details</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full font-medium text-sm ${
                submission.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {submission.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Language</p>
              <p className="font-medium">{submission.language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time Taken</p>
              <p className="font-medium">
                {submission.elapsedTimeMs ? `${(submission.elapsedTimeMs / 1000).toFixed(2)}s` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="font-medium">{new Date(submission.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Code</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{submission.code}</code>
          </pre>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Notes</h2>
            <button
              onClick={() => setEditingNote(!editingNote)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {editingNote ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editingNote ? (
            <div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Add notes about this submission..."
              />
              <button
                onClick={handleSaveNote}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Note
              </button>
            </div>
          ) : (
            <p className="text-gray-700">{note || 'No notes added yet.'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;