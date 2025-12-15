import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Global Context
import { UserContext } from "../GlobalContext/UserContext";

// React Components
import Header from "../LandingPage2.0/components/Header.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Categories from "./components/Categories.jsx";
import Topics from "./components/Topics.jsx";
import ProblemList from "./components/ProblemList.jsx";

// API Service
import { problemsApi } from "../services/api";

const Problemset = () => {
  const navigate = useNavigate();
  const { User, loading: userLoading } = useContext(UserContext);

  // Section 1 Data
  const leaderboardData = {
    title: "Leaderboard",
    entries: [
      { rank: 1, username: "CodeMaster", points: 2500 },
      { rank: 2, username: "Algorithm_Pro", points: 2300 },
      { rank: 3, username: "ByteWizard", points: 2100 },
    ],
  };

  // Section 2 Data
  const [categories] = useState({
    Difficulty: ["EASY", "MEDIUM", "MEDIUM_HARD", "HARD", "VERY_HARD"],
  });

  // State for problems and filtering
  const [allProblems, setAllProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiProblems, setAiProblems] = useState([]);

  // New states for personalized
  const [activeTab, setActiveTab] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 20;

  // Calculate pagination data
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  // Fetch problems based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      fetchAllProblems();
    } else {
      fetchPersonalizedProblems();
    }
  }, [activeTab]);

  const fetchAllProblems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await problemsApi.getAllProblems();

      const transformedProblems = data.map((problem) => ({
        code: problem._id,
        name: problem.name,
        submissions: 0,
        difficulty: problem.difficulty,
        contestCode: problem.source || "N/A",
        tags: problem.tags || [],
      }));

      setAllProblems(transformedProblems);
      setFilteredProblems(transformedProblems);

      const uniqueTags = [
        ...new Set(transformedProblems.flatMap((problem) => problem.tags)),
      ];
      setAllTags(uniqueTags);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching problems:", err);
    }
  };

  const fetchPersonalizedProblems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await problemsApi.getPersonalizedProblems();

      const transformedProblems = data.problems.map((problem) => ({
        code: problem._id,
        name: problem.name,
        submissions: 0,
        difficulty: problem.difficulty,
        contestCode: problem.source || "N/A",
        tags: problem.tags || [],
      }));

      setFilteredProblems(transformedProblems);

      const uniqueTags = [
        ...new Set(transformedProblems.flatMap((problem) => problem.tags)),
      ];
      setAllTags(uniqueTags);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching personalized problems:", err);
    }
  };

  // Difficulty filter handler
  const handleCategorySelect = async (category, difficulty) => {
    try {
      setLoading(true);
      setError(null);
      const response = await problemsApi.getByDifficulty(difficulty);

      const transformedProblems = response.problems.map((problem) => ({
        code: problem._id,
        name: problem.name,
        submissions: 0,
        difficulty: problem.difficulty,
        contestCode: problem.source || "N/A",
        tags: problem.tags || [],
      }));

      setFilteredProblems(transformedProblems);
      setCurrentPage(1);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error filtering by difficulty:", err);
    }
  };

  // Topics filter handler
  const handleTopicSelect = async (tag) => {
    try {
      setLoading(true);
      setError(null);
      const response = await problemsApi.getByTags(tag);

      const transformedProblems = response.problems.map((problem) => ({
        code: problem._id,
        name: problem.name,
        submissions: 0,
        difficulty: problem.difficulty,
        contestCode: problem.source || "N/A",
        tags: problem.tags || [],
      }));

      setFilteredProblems(transformedProblems);
      setCurrentPage(1);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error filtering by tag:", err);
    }
  };

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      if (activeTab === "all") {
        setFilteredProblems(allProblems);
      } else {
        fetchPersonalizedProblems();
      }
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await problemsApi.searchProblems(searchQuery);

      const transformedProblems = response.problems.map((problem) => ({
        code: problem._id,
        name: problem.name,
        submissions: 0,
        difficulty: problem.difficulty,
        contestCode: problem.source || "N/A",
        tags: problem.tags || [],
      }));

      setFilteredProblems(transformedProblems);
      setCurrentPage(1);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error searching problems:", err);
    }
  };

  // Reset filters
  const resetFilters = () => {
    if (activeTab === "all") {
      setFilteredProblems(allProblems);
    } else {
      fetchPersonalizedProblems();
    }
    setCurrentPage(1);
    setSearchQuery("");
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    if (tab === "personalized" && !User) {
      alert("Please login to view personalized problems");
      navigate("/login");
      return;
    }
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Tabs Section */}
        <div className="mb-6 bg-white rounded-xl shadow-lg shadow-purple-100/50 border border-gray-100 p-2">
          <nav className="flex space-x-2">
            <button
              onClick={() => handleTabChange("all")}
              className={`flex-1 py-3 px-4 font-semibold text-sm rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              All Problems
            </button>
            <button
              onClick={() => handleTabChange("personalized")}
              className={`flex-1 py-3 px-4 font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "personalized"
                  ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>Personalized For You</span>
              {User && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  AI
                </span>
              )}
              {!User && <span className="text-gray-400">🔒</span>}
            </button>
          </nav>
        </div>

        {/* Top Section: Stats and Search */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6">
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems by name..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50 text-sm"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold text-sm"
              >
                Search
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm border border-gray-200"
              >
                Reset
              </button>
            </form>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Problems */}
            <div className="bg-white rounded-xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    {activeTab === "all" ? "Total Problems" : "Personalized"}
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    {activeTab === "all"
                      ? allProblems.length
                      : filteredProblems.length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-3">
                  <svg
                    className="w-8 h-8 text-purple-600"
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
                </div>
              </div>
            </div>

            {/* Filtered Results */}
            <div className="bg-white rounded-xl shadow-lg shadow-sky-100/50 border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">
                    Filtered Results
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                    {filteredProblems.length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-sky-100 to-cyan-100 rounded-xl p-3">
                  <svg
                    className="w-8 h-8 text-sky-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Leaderboard Card */}
            <div className="bg-white rounded-xl shadow-lg shadow-purple-100/50 border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <Leaderboard {...leaderboardData} />
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-start shadow-lg shadow-red-100/50">
            <svg
              className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-semibold">Error loading problems</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Categories
              categories={categories}
              onCategorySelect={handleCategorySelect}
            />

            <Topics topics={allTags} onTopicSelect={handleTopicSelect} />
          </div>

          {/* Right Content - Problem List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-xl shadow-lg shadow-purple-100/50 border border-gray-100 p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-purple-600 mb-4"></div>
                <p className="text-gray-600 font-semibold">
                  Loading problems...
                </p>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg shadow-purple-100/50 border border-gray-100 p-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                <p className="text-gray-600 font-semibold text-lg mb-2">
                  No problems found
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold text-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <ProblemList
                problems={currentProblems}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problemset;
