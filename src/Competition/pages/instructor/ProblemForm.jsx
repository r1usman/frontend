import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

const ProblemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { problems, addProblem, updateProblem } = useCompetition();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    timeLimit: '1000',
  });

  const [sampleTestCases, setSampleTestCases] = useState([
    { input: '', output: '' },
  ]);

  const [hiddenTestCases, setHiddenTestCases] = useState([
    { input: '', output: '' },
  ]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const problem = problems.find((p) => p.id === id);
      if (problem) {
        setFormData({
          title: problem.title,
          description: problem.description,
          inputFormat: problem.inputFormat,
          outputFormat: problem.outputFormat,
          timeLimit: String(problem.timeLimit),
        });

        setSampleTestCases(
          problem.sampleTestCases.map((tc) => ({
            id: tc.id, // this field is optional, but we’ll carry it along if it exists
            input: tc.input,
            output: tc.output,
          }))
        );

        setHiddenTestCases(
          problem.hiddenTestCases.map((tc) => ({
            id: tc.id,
            input: tc.input,
            output: tc.output,
          }))
        );
      }
    }
  }, [id, problems]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.inputFormat.trim()) {
      newErrors.inputFormat = 'Input format is required';
    }

    if (!formData.outputFormat.trim()) {
      newErrors.outputFormat = 'Output format is required';
    }

    if (!formData.timeLimit.trim()) {
      newErrors.timeLimit = 'Time limit is required';
    } else if (isNaN(Number(formData.timeLimit)) || Number(formData.timeLimit) <= 0) {
      newErrors.timeLimit = 'Time limit must be a positive number';
    }

    // Validate sample test cases
    let hasEmptySampleTestCase = false;
    sampleTestCases.forEach((tc) => {
      if (!tc.input.trim() || !tc.output.trim()) {
        hasEmptySampleTestCase = true;
      }
    });

    if (hasEmptySampleTestCase) {
      newErrors.sampleTestCases = 'All sample test cases must have input and output';
    }

    // Validate hidden test cases
    let hasEmptyHiddenTestCase = false;
    hiddenTestCases.forEach((tc) => {
      if (!tc.input.trim() || !tc.output.trim()) {
        hasEmptyHiddenTestCase = true;
      }
    });

    if (hasEmptyHiddenTestCase) {
      newErrors.hiddenTestCases = 'All hidden test cases must have input and output';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const problemData = {
      title: formData.title,
      description: formData.description,
      inputFormat: formData.inputFormat,
      outputFormat: formData.outputFormat,
      sampleTestCases: sampleTestCases.map((tc) => ({
        id: tc.id || Math.random().toString(36).substr(2, 9),
        input: tc.input,
        output: tc.output,
      })),
      hiddenTestCases: hiddenTestCases.map((tc) => ({
        id: tc.id || Math.random().toString(36).substr(2, 9),
        input: tc.input,
        output: tc.output,
      })),
      timeLimit: Number(formData.timeLimit),
    };

    if (id) {
      updateProblem(id, problemData);
    } else {
      addProblem(problemData);
    }

    navigate('/problems');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSampleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...sampleTestCases];
    updatedTestCases[index] = { ...updatedTestCases[index], [field]: value };
    setSampleTestCases(updatedTestCases);
  };

  const handleHiddenTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...hiddenTestCases];
    updatedTestCases[index] = { ...updatedTestCases[index], [field]: value };
    setHiddenTestCases(updatedTestCases);
  };

  const addSampleTestCase = () => {
    setSampleTestCases([...sampleTestCases, { input: '', output: '' }]);
  };

  const addHiddenTestCase = () => {
    setHiddenTestCases([...hiddenTestCases, { input: '', output: '' }]);
  };

  const removeSampleTestCase = (index) => {
    if (sampleTestCases.length > 1) {
      setSampleTestCases(sampleTestCases.filter((_, i) => i !== index));
    }
  };

  const removeHiddenTestCase = (index) => {
    if (hiddenTestCases.length > 1) {
      setHiddenTestCases(hiddenTestCases.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/Mod/problems')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">
          {id ? 'Edit Problem' : 'Create Problem'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Problem Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Problem Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Problem Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Problem Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className={`w-full px-3 py-2 border rounded-md resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Input Format */}
            <div>
              <label
                htmlFor="inputFormat"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Input Format
              </label>
              <textarea
                id="inputFormat"
                name="inputFormat"
                value={formData.inputFormat}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md resize-none ${
                  errors.inputFormat ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.inputFormat && (
                <p className="mt-1 text-sm text-red-500">{errors.inputFormat}</p>
              )}
            </div>

            {/* Output Format */}
            <div>
              <label
                htmlFor="outputFormat"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Output Format
              </label>
              <textarea
                id="outputFormat"
                name="outputFormat"
                value={formData.outputFormat}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md resize-none ${
                  errors.outputFormat ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.outputFormat && (
                <p className="mt-1 text-sm text-red-500">{errors.outputFormat}</p>
              )}
            </div>

            {/* Time Limit */}
            <div>
              <label
                htmlFor="timeLimit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time Limit (milliseconds)
              </label>
              <input
                type="number"
                id="timeLimit"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.timeLimit ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.timeLimit && (
                <p className="mt-1 text-sm text-red-500">{errors.timeLimit}</p>
              )}
            </div>

            {/* Sample Test Cases */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sample Test Cases
                </label>
                <button
                  type="button"
                  onClick={addSampleTestCase}
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
                >
                  <Plus size={16} />
                  <span>Add Test Case</span>
                </button>
              </div>
              {errors.sampleTestCases && (
                <p className="mb-2 text-sm text-red-500">{errors.sampleTestCases}</p>
              )}

              <div className="space-y-4">
                {sampleTestCases.map((testCase, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Test Case #{index + 1}</h3>
                      {sampleTestCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSampleTestCase(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Input
                        </label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) =>
                            handleSampleTestCaseChange(index, 'input', e.target.value)
                          }
                          rows={3}
                          className="w-full px-3 py-2 border  border-gray-300 rounded-md resize-none"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expected Output
                        </label>
                        <textarea
                          value={testCase.output}
                          onChange={(e) =>
                            handleSampleTestCaseChange(index, 'output', e.target.value)
                          }
                          rows={3}
                          className="w-full px-3 py-2 border resize-none border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Test Cases */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hidden Test Cases
                </label>
                <button
                  type="button"
                  onClick={addHiddenTestCase}
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
                >
                  <Plus size={16} />
                  <span>Add Test Case</span>
                </button>
              </div>
              {errors.hiddenTestCases && (
                <p className="mb-2 text-sm text-red-500">{errors.hiddenTestCases}</p>
              )}

              <div className="space-y-4">
                {hiddenTestCases.map((testCase, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">
                        Hidden Test Case #{index + 1}
                      </h3>
                      {hiddenTestCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHiddenTestCase(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Input
                        </label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) =>
                            handleHiddenTestCaseChange(index, 'input', e.target.value)
                          }
                          rows={3}
                          className="w-full px-3 py-2 border resize-none border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expected Output
                        </label>
                        <textarea
                          value={testCase.output}
                          onChange={(e) =>
                            handleHiddenTestCaseChange(index, 'output', e.target.value)
                          }
                          rows={3}
                          className="w-full px-3 py-2 border resize-none border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/problems')}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
              >
                <Save size={18} />
                <span>Save Problem</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;
