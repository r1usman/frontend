import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';
import { Plus, Minus, Save, ArrowLeft } from 'lucide-react';

const CompetitionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { competitions, problems, addCompetition, updateCompetition } = useCompetition();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    problemIds: [],
    timeLimit: '',
    autoSubmission: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const competition = competitions.find(c => c.id === id);
      if (competition) {
        setFormData({
          name: competition.name,
          description: competition.description,
          startTime: new Date(competition.startTime).toISOString().slice(0, 16),
          endTime: new Date(competition.endTime).toISOString().slice(0, 16),
          problemIds: competition.problems.map(p => p.id),
          timeLimit: competition.timeLimit ? String(competition.timeLimit / 60000) : '',
          autoSubmission: competition.autoSubmission,
        });
      }
    } else {
      // Default start = now, end = 2 hours later
      const now = new Date();
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      setFormData({
        ...formData,
        startTime: now.toISOString().slice(0, 16),
        endTime: twoHoursLater.toISOString().slice(0, 16),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, competitions]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    } else if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (formData.problemIds.length === 0) {
      newErrors.problemIds = 'At least one problem is required';
    }

    if (formData.timeLimit && isNaN(Number(formData.timeLimit))) {
      newErrors.timeLimit = 'Time limit must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const competitionData = {
      name: formData.name,
      description: formData.description,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
      problems: problems.filter(p => formData.problemIds.includes(p.id)),
      timeLimit: formData.timeLimit ? Number(formData.timeLimit) * 60000 : undefined,
      autoSubmission: formData.autoSubmission,
    };

    if (id) {
      updateCompetition(id, competitionData);
    } else {
      addCompetition(competitionData);
    }

    navigate('/competitions');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const toggleProblem = (problemId) => {
    if (formData.problemIds.includes(problemId)) {
      setFormData({
        ...formData,
        problemIds: formData.problemIds.filter(id => id !== problemId),
      });
    } else {
      setFormData({
        ...formData,
        problemIds: [...formData.problemIds, problemId],
      });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/Mod/competitions')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">
          {id ? 'Edit Competition' : 'Create Competition'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Competition Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Competition Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Start & End Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.startTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>
                )}
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.endTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                Time Limit (minutes, optional)
              </label>
              <input
                type="number"
                id="timeLimit"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                placeholder="Leave empty for no time limit"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.timeLimit ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.timeLimit && (
                <p className="mt-1 text-sm text-red-500">{errors.timeLimit}</p>
              )}
            </div>

            {/* Auto Submission Checkbox */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoSubmission"
                  name="autoSubmission"
                  checked={formData.autoSubmission}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="autoSubmission" className="ml-2 block text-sm text-gray-700">
                  Enable auto-submission at deadline
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                If enabled, the last saved code will be automatically submitted when the
                competition ends.
              </p>
            </div>

            {/* Problems List */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Problems</label>
              {errors.problemIds && (
                <p className="mb-2 text-sm text-red-500">{errors.problemIds}</p>
              )}

              {problems.length === 0 ? (
                <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500 mb-2">No problems available</p>
                  <button
                    type="button"
                    onClick={() => navigate('/problems/new')}
                    className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus size={16} />
                    <span>Create a problem</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
                  {problems.map((problem) => (
                    <div
                      key={problem.id}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                        formData.problemIds.includes(problem.id)
                          ? 'bg-indigo-50 border border-indigo-200'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleProblem(problem.id)}
                    >
                      <div>
                        <h3 className="font-medium">{problem.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {problem.description}
                        </p>
                      </div>
                      <div>
                        {formData.problemIds.includes(problem.id) ? (
                          <Minus size={18} className="text-indigo-600" />
                        ) : (
                          <Plus size={18} className="text-gray-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/competitions')}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
              >
                <Save size={18} />
                <span>Save Competition</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompetitionForm;
