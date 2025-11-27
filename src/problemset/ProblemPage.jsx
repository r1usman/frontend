import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import CodeEditor from "./codeEditor/CodeEditor";
import { problemsApi, aiProblemsApi } from "../services/api";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      setError(null);

      const aiFromState = location.state && location.state.aiProblem;
      if (aiFromState) {
        console.log(
          "Using accepted AI problem passed via location.state",
          aiFromState
        );
        setProblem(aiFromState);
        setLoading(false);
        return;
      }

      console.log("Fetching problem with ID (API):", id);
      const data = await problemsApi.getProblemById(id);
      console.log("Received data:", data);
      setProblem(data);
      setLoading(false);
    } catch (err) {
      console.error("Full error:", err);
      setError(err.message || "Failed to load problem");
      setLoading(false);
    }
  };

  const handleGenerateAIProblem = async () => {
    try {
      setGeneratingAI(true);
      console.log("🚀 Generating AI problem for ID:", id);

      const response = await aiProblemsApi.generateAiProblem(id);
      console.log("✅ AI Problem generated response:", response);

      if (response.problem && response.problem._id) {
        console.log("🆕 AI Problem ID:", response.problem._id);
        navigate(`/ai-problem-compare/${id}/${response.problem._id}`);
      } else {
        console.error("❌ Invalid response structure:", response);
        throw new Error("Invalid response from server - missing problem data");
      }
    } catch (err) {
      console.error("❌ Error generating AI problem:", err);

      if (err.message === "AUTHENTICATION_REQUIRED") {
        alert("Please login to generate AI problems");
        navigate("/login");
      } else {
        alert("Failed to generate AI problem: " + err.message);
      }
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleCopySolution = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl shadow-purple-200/50 p-12 border border-gray-100">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-100 border-t-purple-600 mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">
            Loading problem...
          </p>
          <p className="text-gray-500 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl shadow-red-200/50 border border-red-100 p-8 max-w-md w-full text-center">
          <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Problem
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/problemset"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Problem Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The problem you're looking for doesn't exist.
          </p>
          <Link
            to="/problemset"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "EASY":
        return "from-green-100 to-emerald-100 text-green-700 border-green-200";
      case "MEDIUM":
        return "from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200";
      case "MEDIUM_HARD":
        return "from-orange-100 to-orange-200 text-orange-700 border-orange-200";
      case "HARD":
        return "from-red-100 to-red-200 text-red-700 border-red-200";
      default:
        return "from-purple-100 to-purple-200 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Fixed Top Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/problemset"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Problems
            </Link>

            <button
              onClick={handleGenerateAIProblem}
              disabled={generatingAI}
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingAI ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate AI Problem
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Problem Details */}
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-4">
                {problem.name}
              </h1>

              <div className="flex flex-wrap gap-3 mb-4">
                <span
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border bg-gradient-to-r ${getDifficultyColor(
                    problem.difficulty
                  )} shadow-sm`}
                >
                  {problem.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {problem.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-lg text-xs font-semibold border border-purple-200 hover:shadow-md transition-shadow"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Constraints Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Constraints
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/*
                  <div className="bg-gradient-to-br from-purple-50 to-sky-50 p-4 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    <p className="text-xs font-semibold text-gray-600">{item.label}</p>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">{item.value}</p>
                </div>
                */}
                {/*
                  { label: 'Time Limit', value: problem.time_limit, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Memory Limit', value: problem.memory_limit, icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
                  { label: 'Time Complexity', value: problem.expected_time_complexity, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                  { label: 'Space Complexity', value: problem.expected_auxiliary_space, icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' }
                */}
                {[
                  "Time Limit",
                  "Memory Limit",
                  "Time Complexity",
                  "Space Complexity",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-purple-50 to-sky-50 p-4 rounded-xl border border-purple-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-5 h-5 text-purple-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4"
                        />
                      </svg>
                      <p className="text-xs font-semibold text-gray-600">
                        {label}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">
                      {
                        problem[
                          `expected_${label.toLowerCase().replace(" ", "_")}`
                        ]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {problem.description}
              </div>
            </div>

            {/* Input/Output Format */}
            {["Input Format", "Output Format"].map((title, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  {title}
                </h2>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl font-mono text-sm text-gray-800 whitespace-pre-wrap border border-gray-200">
                  {idx === 0 ? problem.input : problem.output}
                </div>
              </div>
            ))}

            {/* Examples Card */}
            {problem.examples?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Examples
                </h2>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200"
                    >
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded-lg text-sm mr-2 font-bold">
                          {index + 1}
                        </span>
                        Example {index + 1}
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                              />
                            </svg>
                            Input:
                          </p>
                          <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-x-auto border border-gray-700 shadow-inner">
                            {example.input}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                            Output:
                          </p>
                          <pre className="bg-gray-900 text-blue-400 p-3 rounded-lg text-sm overflow-x-auto border border-gray-700 shadow-inner">
                            {example.output}
                          </pre>
                        </div>
                        {example.explanation && (
                          <div>
                            <p className="text-sm font-semibold text-gray-600 mb-2">
                              Explanation:
                            </p>
                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                              {example.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note Card */}
            {problem.note && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-600 rounded-xl p-6 shadow-lg shadow-purple-100/50">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Important Note
                </h2>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {problem.note}
                </p>
              </div>
            )}

            {/* Solutions Card */}
            {problem.solutions?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setShowSolutions(!showSolutions)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    Solutions ({problem.solutions.length})
                  </h2>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        showSolutions
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {showSolutions ? "Hide" : "Show"}
                    </span>
                    <svg
                      className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                        showSolutions ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {showSolutions && (
                  <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                    {problem.solutions.map((solution, index) => (
                      <div key={index} className="mt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 flex items-center">
                            <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1 rounded-lg text-sm mr-2">
                              {index + 1}
                            </span>
                            Solution {index + 1}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-lg text-xs font-bold border border-green-200">
                              {solution.language}
                            </span>
                            <button
                              onClick={() =>
                                handleCopySolution(solution.code, index)
                              }
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
                              title="Copy code"
                            >
                              {copiedIndex === index ? (
                                <svg
                                  className="w-5 h-5 text-green-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5 text-gray-600 group-hover:text-purple-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              )}
                              {copiedIndex === index && (
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                  Copied!
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm border border-gray-700 shadow-inner">
                          <code>{solution.code}</code>
                        </pre>
                        {solution.explanation && (
                          <p className="mt-3 text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                            <strong className="text-gray-900">
                              Explanation:
                            </strong>{" "}
                            {solution.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Code Editor */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Code Editor
              </h2>
              <CodeEditor
                testcases={problem.examples || []}
                problemId={problem._id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
