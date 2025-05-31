import React, { useState } from "react";
import Header from "./components/Header";
import logo from "./assets/header_component.png";
import DailyChallenge from "./components/DailyChallenge.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import SpeedChallenge from "./components/SpeedChallenge.jsx";
import Categories from "./components/Categories.jsx";
import Topics from "./components/Topics.jsx";
import ProblemList from "./components/ProblemList.jsx";

const ProblemsetPage = () => {
  // Section 1 Data
  const dailyChallengeData = {
    challengeTitle: "Daily Challenges",
    challengeDescription: "Complete today's coding challenge!",
    buttonText: "Start Challenge"
  };

  const speedChallengeData = {
    title: "Speed Challenges",
    description: "Test your coding speed against these challenges",
    challenges: [
      { name: "Array Rotation", difficulty: "Medium" },
      { name: "String Permutations", difficulty: "Hard" },
      { name: "Binary Search", difficulty: "Easy" }
    ]
  };

  const leaderboardData = {
    title: "Leaderboard",
    entries: [
      { rank: 1, username: "CodeMaster", points: 2500 },
      { rank: 2, username: "Algorithm_Pro", points: 2300 },
      { rank: 3, username: "ByteWizard", points: 2100 }
    ]
  };

  // Section 2 Data
  const [categories] = useState({
    "Difficulty": ["EASY", "MEDIUM", "MEDIUM_HARD", "HARD", "VERY_HARD"]
  });

  const [topics] = useState([
    { 
      name: "Algorithms", 
      subtopics: [
        "Dynamic Programming", 
        "Divide and Conquer", 
        "Decrease and Conquer"
      ] 
    },
    { 
      name: "Data Structures", 
      subtopics: [
        "Arrays", 
        "Linked Lists", 
        "Trees", 
        "Graphs"
      ] 
    },
    { name: "System Design" },
    { name: "Database" },
    { name: "Frontend" }
  ]);

  const allProblems = [
    { code: "WAPEN", name: "Time Penalty", submissions: 69441, difficulty: "MEDIUM", contestCode: "START173", tags: ["Algorithms", "Dynamic Programming"] },
    { code: "MTHSEQ", name: "Math Sequences", submissions: 52830, difficulty: "EASY", contestCode: "START150", tags: ["Combinatorics", "Mathematics"] },
    { code: "BINTRK", name: "Binary Track", submissions: 18433, difficulty: "HARD", contestCode: "START145", tags: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"] },
    { code: "GRCOST", name: "Greedy Cost", submissions: 67825, difficulty: "MEDIUM_HARD", contestCode: "START160", tags: ["Sorting", "Amortized analysis", "Implementation", "Greedy algorithms", "Dynamic programming"] },
    { code: "CNSTRM", name: "Construct Room", submissions: 30852, difficulty: "VERY_HARD", contestCode: "START190", tags: ["Dynamic programming", "Mathematics", "Constructive algorithms"] },
    { code: "DIVDNC", name: "Divide and Count", submissions: 41258, difficulty: "MEDIUM", contestCode: "START132", tags: ["Dynamic programming", "Combinatorics", "Mathematics"] },
    { code: "PNTCHK", name: "Point Checker", submissions: 15792, difficulty: "EASY", contestCode: "START175", tags: ["Combinatorics", "Mathematics"] },
    { code: "DSHARE", name: "Data Share", submissions: 26701, difficulty: "HARD", contestCode: "START142", tags: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"] },
    { code: "SRTGME", name: "Sorting Game", submissions: 92145, difficulty: "MEDIUM", contestCode: "START188", tags: ["Sorting", "Amortized analysis", "Implementation", "Greedy algorithms", "Dynamic programming"] },
    { code: "CNTNUM", name: "Count Numbers", submissions: 83452, difficulty: "MEDIUM_HARD", contestCode: "START155", tags: ["Dynamic programming", "Combinatorics", "Mathematics"] },
    { code: "EQSUM", name: "Equal Sums", submissions: 44723, difficulty: "VERY_HARD", contestCode: "START177", tags: ["Dynamic programming", "Mathematics", "Constructive algorithms"] },
    { code: "GRDSTP", name: "Greedy Steps", submissions: 55194, difficulty: "HARD", contestCode: "START148", tags: ["Sorting", "Amortized analysis", "Implementation", "Greedy algorithms", "Dynamic programming"] },
    { code: "BINSPL", name: "Binary Split", submissions: 23354, difficulty: "MEDIUM", contestCode: "START139", tags: ["Dynamic programming", "Mathematics", "Constructive algorithms"] },
    { code: "MATHRD", name: "Math Road", submissions: 32841, difficulty: "EASY", contestCode: "START146", tags: ["Combinatorics", "Mathematics"] },
    { code: "TRNSUM", name: "Transform Sum", submissions: 75984, difficulty: "MEDIUM_HARD", contestCode: "START159", tags: ["Dynamic programming", "Combinatorics", "Mathematics"] },
    { code: "BSTRIK", name: "Binary Strike", submissions: 29987, difficulty: "VERY_HARD", contestCode: "START182", tags: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"] },
    { code: "DPCNTR", name: "DP Counter", submissions: 50462, difficulty: "HARD", contestCode: "START153", tags: ["Dynamic programming", "Mathematics", "Constructive algorithms"] },
    { code: "PRIMES", name: "Prime Sequence", submissions: 61184, difficulty: "EASY", contestCode: "START170", tags: ["Combinatorics", "Mathematics"] },
    { code: "DVIDND", name: "Divide and Defeat", submissions: 43563, difficulty: "MEDIUM", contestCode: "START166", tags: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"] },
    { code: "GRDYMN", name: "Greedy Min", submissions: 29815, difficulty: "MEDIUM_HARD", contestCode: "START163", tags: ["Sorting", "Amortized analysis", "Implementation", "Greedy algorithms", "Dynamic programming"] },
    { code: "SUMBND", name: "Sum Boundaries", submissions: 26484, difficulty: "VERY_HARD", contestCode: "START194", tags: ["Dynamic programming", "Mathematics", "Constructive algorithms"] },
    { code: "CNTPRX", name: "Count Proximity", submissions: 83419, difficulty: "EASY", contestCode: "START131", tags: ["Combinatorics", "Mathematics"] },
    { code: "TREECH", name: "Tree Chains", submissions: 50971, difficulty: "HARD", contestCode: "START149", tags: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"] },
    { code: "SMRTDP", name: "Smart DP", submissions: 34892, difficulty: "MEDIUM", contestCode: "START169", tags: ["Dynamic programming", "Combinatorics", "Mathematics"] },
    { code: "GTHLST", name: "Gather List", submissions: 25381, difficulty: "MEDIUM_HARD", contestCode: "START164", tags: ["Sorting", "Amortized analysis", "Implementation", "Greedy algorithms", "Dynamic programming"] },
    { code: "MATGRP", name: "Math Grouping", submissions: 88204, difficulty: "VERY_HARD", contestCode: "START191", tags: ["Dynamic programming", "Mathematics", "Constructive algorithms"] },
    { code: "SEGMNT", name: "Segment Puzzle", submissions: 19563, difficulty: "EASY", contestCode: "START130", tags: ["Combinatorics", "Mathematics"] },
    { code: "BINMAP", name: "Binary Map", submissions: 61391, difficulty: "HARD", contestCode: "START152", tags: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"] },
    { code: "FASTDP", name: "Fast DP", submissions: 72293, difficulty: "MEDIUM", contestCode: "START162", tags: ["Dynamic programming", "Combinatorics", "Mathematics"] },
    { code: "IMPGRD", name: "Implement Greedy", submissions: 48256, difficulty: "MEDIUM_HARD", contestCode: "START157", tags: ["Sorting", "Amortized analysis", "Implementation", "Greedy algorithms", "Dynamic programming"] },
    {code: "GRPHCN", name: "Graph Construction", submissions: 28745, difficulty: "HARD", contestCode: "START175", tags: ["Graph theory", "Breadth-first search", "Adjacency lists", "Connected components"]},
    {code: "STRMCH", name: "String Matching", submissions: 51234, difficulty: "MEDIUM", contestCode: "START178", tags: ["String algorithms", "Knuth-Morris-Pratt", "Rabin-Karp", "Pattern matching"]},
    { code: "WAPEN", name: "Time Penalty", submissions: 69441, difficulty: "MEDIUM", contestCode: "START173", tags: ["Algorithms", "Dynamic Programming"] },
    { code: "MTHSEQ", name: "Math Sequences", submissions: 52830, difficulty: "EASY", contestCode: "START150", tags: ["Combinatorics", "Mathematics"] },
    { code: "BINTRK", name: "Binary Track", submissions: 18433, difficulty: "HARD", contestCode: "START145", tags: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"] },
    { code: "PRIMES", name: "Prime Identification", submissions: 24000, difficulty: "EASY", contestCode: "START151", tags: ["Number Theory", "Mathematics"] },
    { code: "SUBSET", name: "Subset Sum", submissions: 32000, difficulty: "MEDIUM", contestCode: "START152", tags: ["Dynamic Programming", "Combinatorics"] },
    { code: "HIKING", name: "Hiking Trails", submissions: 15000, difficulty: "HARD", contestCode: "START153", tags: ["Graphs", "Pathfinding"] },
    { code: "FIBON", name: "Fibonacci Series", submissions: 27000, difficulty: "EASY", contestCode: "START154", tags: ["Recursion", "Dynamic Programming"] },
    { code: "TSP", name: "Traveling Salesman Problem", submissions: 18000, difficulty: "HARD", contestCode: "START155", tags: ["Graphs", "Optimization"] },
    { code: "COUNT", name: "Count Unique Paths", submissions: 22000, difficulty: "MEDIUM", contestCode: "START156", tags: ["Dynamic Programming", "Combinatorics"] },
    { code: "SPLIT", name: "Split Array", submissions: 19000, difficulty: "MEDIUM", contestCode: "START157", tags: ["Arrays", "Greedy"] },
    { code: "CIRCULAR", name: "Circular Queue", submissions: 13000, difficulty: "MEDIUM", contestCode: "START158", tags: ["Data Structures", "Queue"] },
    { code: "LCA", name: "Lowest Common Ancestor", submissions: 11000, difficulty: "HARD", contestCode: "START159", tags: ["Trees", "Graph Theory"] },
    { code: "MATCH", name: "Pattern Matching", submissions: 14000, difficulty: "MEDIUM", contestCode: "START160", tags: ["String Algorithms", "Searching"] },
    { code: "ELEVATOR", name: "Elevator Simulation", submissions: 9000, difficulty: "EASY", contestCode: "START161", tags: ["Simulation", "Data Structures"] },
    { code: "KMP", name: "KMP Algorithm", submissions: 16000, difficulty: "HARD", contestCode: "START162", tags: ["String Algorithms", "Searching"] },
    { code: "GRID", name: "Grid Traversal", submissions: 17000, difficulty: "MEDIUM", contestCode: "START163", tags: ["Dynamic Programming", "Grid"] },
    { code: "RANDOM", name: "Randomized Algorithms", submissions: 8000, difficulty: "HARD", contestCode: "START164", tags: ["Algorithms", "Probability"] },
    { code: "HASH", name: "Hashing Techniques", submissions: 8500, difficulty: "MEDIUM", contestCode: "START165", tags: ["Data Structures", "Hashing"] },
    { code: "BACKTRACK", name: "Backtracking Problems", submissions: 7000, difficulty: "HARD", contestCode: "START166", tags: ["Backtracking", "Combinatorics"] },
    { code: "DPGRID", name: "Dynamic Programming on Grid", submissions: 9500, difficulty: "MEDIUM", contestCode: "START167", tags: ["Dynamic Programming", "Grid"] },
    { code: "CONSTRUCT", name: "Constructive Algorithms", submissions: 7600, difficulty: "MEDIUM", contestCode: "START168", tags: ["Constructive", "Algorithms"] }
];


  // ========================================================
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 20;
  const [filteredProblems, setFilteredProblems] = useState(allProblems);

  // Calculate pagination data
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  // Filter handlers

  // Difficulty filter handler
  const handleCategorySelect = (category, difficulty) => {
    const filtered = allProblems.filter(problem => 
      problem.difficulty === difficulty
    );
    setFilteredProblems(filtered);
    setCurrentPage(1);
  };

  // Topics filer handler
  const handleTopicSelect = (topic, subtopic = null) => {
    const filtered = allProblems.filter(problem => 
      problem.tags.includes(topic) || 
      (subtopic && problem.tags.includes(subtopic))
    );
    setFilteredProblems(filtered);
    setCurrentPage(1);
  };

  // ==========================

  // Extract all unique tags from problems
  const allTags = [...new Set(
    allProblems.flatMap(problem => 
      Array.isArray(problem.tags) ? problem.tags : JSON.parse(problem.tags || '[]')
    )
  )];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header logo={logo} />

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Section 1: Challenge Cards */}  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg shadow h-full">
            <DailyChallenge {...dailyChallengeData} />
          </div>
          <div className="bg-white p-5 rounded-lg shadow h-full">
            <SpeedChallenge {...speedChallengeData} />
          </div>
          <div className="bg-white p-5 rounded-lg shadow h-full">
            <Leaderboard {...leaderboardData} />
          </div>
        </div>

        {/* Section 2: Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            
            <Categories 
              categories={categories} 
              onCategorySelect={handleCategorySelect} 
            />

            <Topics 
              topics={allTags} 
              onTopicSelect={(tag) => {
                const filtered = allProblems.filter(problem => {
                  const problemTags = Array.isArray(problem.tags) ? problem.tags : JSON.parse(problem.tags || '[]');
                  return problemTags.includes(tag);
                });
                setFilteredProblems(filtered);
              }}
            />

          </div>

          {/* Right Content */}
          <div className="w-full md:w-3/4">
            <ProblemList 
              problems={currentProblems} 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsetPage;