import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import CodeEditor from './codeEditor/CodeEditor';
import { problemsApi, aiProblemsApi } from '../services/api';

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      setError(null);

      // If we were navigated here with an accepted AI problem in location.state, use that
      const aiFromState = location.state && location.state.aiProblem;
      if (aiFromState) {
        console.log('Using accepted AI problem passed via location.state', aiFromState);
        // Use the AI problem object directly
        setProblem(aiFromState);
        setLoading(false);
        return;
      }

      // Otherwise, fetch the original problem from the API
      console.log('Fetching problem with ID (API):', id);
      const data = await problemsApi.getProblemById(id);
      console.log('Received data:', data);
      setProblem(data);
      setLoading(false);
    } catch (err) {
      console.error('Full error:', err);
      setError(err.message || 'Failed to load problem');
      setLoading(false);
    }
  };
  
  // ProblemPage.jsx - Update the handleGenerateAIProblem function
const handleGenerateAIProblem = async () => {
  try {
    setGeneratingAI(true);
    console.log('🚀 Generating AI problem for ID:', id);
    
    const response = await aiProblemsApi.generateAiProblem(id);
    console.log('✅ AI Problem generated response:', response);
    
    // Fix: Use response.problem instead of response.data
    if (response.problem && response.problem._id) {
      console.log('🆕 AI Problem ID:', response.problem._id);
      // Navigate to the comparison page with both original and AI problem
      navigate(`/ai-problem-compare/${id}/${response.problem._id}`);
    } else {
      console.error('❌ Invalid response structure:', response);
      throw new Error('Invalid response from server - missing problem data');
    }
  } catch (err) {
    console.error('❌ Error generating AI problem:', err);
    
    if (err.message === 'AUTHENTICATION_REQUIRED') {
      alert('Please login to generate AI problems');
      navigate('/login');
    } else {
      alert('Failed to generate AI problem: ' + err.message);
    }
  } finally {
    setGeneratingAI(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-purple-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Problem</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/problemset" className="inline-block bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Problem Not Found</h2>
          <p className="text-gray-600 mb-6">The problem you're looking for doesn't exist.</p>
          <Link to="/problemset" className="inline-block bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation and AI Button */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/problemset" className="inline-flex items-center text-[#5737F6] hover:text-[#9612FA] font-medium transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Problems
          </Link>

          {/* AI Generate Button */}
          <button
            onClick={handleGenerateAIProblem}
            disabled={generatingAI}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingAI ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI Problem...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Similar AI Problem
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side - Problem Details */}
          <div className="space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{problem.name}</h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  problem.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                  problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                  problem.difficulty === 'MEDIUM_HARD' ? 'bg-orange-100 text-orange-800' :
                  problem.difficulty === 'HARD' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {problem.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-50 text-[#5737F6] rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              
            </div>

            {/* Constraints Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Constraints</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-600 mb-1">Time Limit</p>
                  <p className="font-semibold text-gray-900">{problem.time_limit}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-600 mb-1">Memory Limit</p>
                  <p className="font-semibold text-gray-900">{problem.memory_limit}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-600 mb-1">Time Complexity</p>
                  <p className="font-semibold text-gray-900">{problem.expected_time_complexity}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-600 mb-1">Space Complexity</p>
                  <p className="font-semibold text-gray-900">{problem.expected_auxiliary_space}</p>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {problem.description}
              </div>
            </div>

            {/* Input Format Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Input Format</h2>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
                {problem.input}
              </div>
            </div>

            {/* Output Format Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Output Format</h2>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
                {problem.output}
              </div>
            </div>

            {/* Examples Card */}
            {problem.examples?.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Examples</h2>
                {problem.examples.map((example, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-2 py-1 rounded text-sm mr-2">
                        {index + 1}
                      </span>
                      Example {index + 1}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-x-auto border border-gray-700">{example.input}</pre>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Output:</p>
                        <pre className="bg-gray-900 text-blue-400 p-3 rounded-lg text-sm overflow-x-auto border border-gray-700">{example.output}</pre>
                      </div>
                      {example.explanation && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Explanation:</p>
                          <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Note Card */}
            {problem.note && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-[#5737F6] rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#5737F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Note
                </h2>
                <p className="text-gray-800 whitespace-pre-wrap">{problem.note}</p>
              </div>
            )}

            {/* Solutions Card - Collapsible */}
            {problem.solutions?.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <button
                  onClick={() => setShowSolutions(!showSolutions)}
                  className="w-full flex items-center justify-between text-left hover:bg-gray-50 -m-6 p-6 rounded-lg transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900">
                    Solutions ({problem.solutions.length})
                  </h2>
                  <svg
                    className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                      showSolutions ? 'rotate-180' : ''
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
                </button>
                
                {showSolutions && (
                  <div className="mt-4 space-y-4">
                    {problem.solutions.map((solution, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">Solution {index + 1}</h3>
                          <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-xs font-medium">
                            {solution.language}
                          </span>
                        </div>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                          <code>{solution.code}</code>
                        </pre>
                        {solution.explanation && (
                          <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
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
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Code Editor</h2>
              <CodeEditor testcases={problem.examples || []} problemId={problem._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;


  // const fetchProblem = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
      
  //     console.log('Fetching problem with ID:', id);
  //     console.log('Full URL:', `http://localhost:3000/api/problems/${id}`);
      
  //     const data = await problemsApi.getProblemById(id);
  //     console.log('Received data:', data);
      
  //     setProblem(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error('Full error:', err);
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import CodeEditor from './codeEditor/CodeEditor';
// import { problemsApi } from '../services/api';

// const ProblemPage = () => {
//   const { id } = useParams();
//   const [problem, setProblem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('description');
//   const [activeBottomTab, setActiveBottomTab] = useState('output');

//   useEffect(() => {
//     fetchProblem();
//   }, [id]);

//   const fetchProblem = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('Fetching problem with ID:', id);
//       console.log('Full URL:', `http://localhost:3000/api/problems/${id}`);
      
//       const data = await problemsApi.getProblemById(id);
//       console.log('Received data:', data);
      
//       setProblem(data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Full error:', err);
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-purple-600 mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading problem...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
//           <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Problem</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Link to="/problemset" className="inline-block bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
//             Back to Problems
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!problem) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
//           <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Problem Not Found</h2>
//           <p className="text-gray-600 mb-6">The problem you're looking for doesn't exist.</p>
//           <Link to="/problemset" className="inline-block bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
//             Back to Problems
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
//       {/* Left Panel - Problem Details */}
//       <div className="w-full lg:w-1/2 border-r border-gray-300 overflow-y-auto">
//         {/* Back Navigation */}
//         <div className="p-4 sm:p-6 border-b border-gray-300">
//           <Link to="/problemset" className="inline-flex items-center text-[#5737F6] hover:text-[#9612FA] font-medium transition-colors">
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Problems
//           </Link>
//         </div>

//         {/* Tabs */}
//         <div className="border-b border-gray-300">
//           <nav className="flex space-x-4 px-4 sm:px-6 text-sm font-medium text-gray-600">
//             <button
//               onClick={() => setActiveTab('description')}
//               className={`py-3 px-4 ${activeTab === 'description' ? 'border-b-2 border-[#5737F6] text-[#5737F6]' : 'hover:text-[#5737F6]'}`}
//             >
//               Problem Description
//             </button>
//             <button
//               onClick={() => setActiveTab('solutions')}
//               className={`py-3 px-4 ${activeTab === 'solutions' ? 'border-b-2 border-[#5737F6] text-[#5737F6]' : 'hover:text-[#5737F6]'}`}
//             >
//               Solutions
//             </button>
//           </nav>
//         </div>

//         {/* Content */}
//         <div className="p-4 sm:p-6">
//           {activeTab === 'description' && (
//             <div className="space-y-6">
//               {/* Header */}
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">{problem.name}</h1>
                
//                 <div className="flex flex-wrap gap-3 mb-4">
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     problem.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
//                     problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
//                     problem.difficulty === 'MEDIUM_HARD' ? 'bg-orange-100 text-orange-800' :
//                     problem.difficulty === 'HARD' ? 'bg-red-100 text-red-800' :
//                     'bg-purple-100 text-purple-800'
//                   }`}>
//                     {problem.difficulty}
//                   </span>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {problem.tags?.map((tag, index) => (
//                     <span key={index} className="px-2 py-1 bg-purple-50 text-[#5737F6] rounded-full text-xs font-medium">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Constraints */}
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Constraints</h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
//                     <p className="text-xs text-gray-600 mb-1">Time Limit</p>
//                     <p className="font-semibold text-gray-900">{problem.time_limit}</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
//                     <p className="text-xs text-gray-600 mb-1">Memory Limit</p>
//                     <p className="font-semibold text-gray-900">{problem.memory_limit}</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
//                     <p className="text-xs text-gray-600 mb-1">Time Complexity</p>
//                     <p className="font-semibold text-gray-900">{problem.expected_time_complexity}</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100">
//                     <p className="text-xs text-gray-600 mb-1">Space Complexity</p>
//                     <p className="font-semibold text-gray-900">{problem.expected_auxiliary_space}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
//                 <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
//                   {problem.description}
//                 </div>
//               </div>

//               {/* Input Format */}
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Input Format</h2>
//                 <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
//                   {problem.input}
//                 </div>
//               </div>

//               {/* Output Format */}
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Output Format</h2>
//                 <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
//                   {problem.output}
//                 </div>
//               </div>

//               {/* Note */}
//               {problem.note && (
//                 <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-[#5737F6] rounded-lg p-6">
//                   <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
//                     <svg className="w-5 h-5 mr-2 text-[#5737F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Note
//                   </h2>
//                   <p className="text-gray-800 whitespace-pre-wrap">{problem.note}</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === 'solutions' && (
//             <div className="space-y-4">
//               {problem.solutions?.length > 0 ? (
//                 problem.solutions.map((solution, index) => (
//                   <div key={index} className="bg-white rounded-lg shadow-md p-6">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="font-semibold text-gray-900">Solution {index + 1}</h3>
//                       <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-xs font-medium">
//                         {solution.language}
//                       </span>
//                     </div>
//                     <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
//                       <code>{solution.code}</code>
//                     </pre>
//                     {solution.explanation && (
//                       <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                         {solution.explanation}
//                       </p>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-600 text-center py-8">No solutions available yet.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Panel - Code Editor */}
//       <div className="w-full lg:w-1/2 bg-white flex flex-col h-screen">
//         {/* Top Section (60%) - Code Editor */}
//         <div className="flex flex-col p-4 lg:p-6" style={{ height: '60%' }}>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Code Editor</h2>
//           <div className="flex-grow overflow-hidden">
//             <CodeEditor testcases={problem.examples || []} problemId={problem._id} />
//           </div>
//         </div>

//         {/* Bottom Section (40%) - Output/Examples */}
//         <div className="flex flex-col p-4 lg:p-6 border-t border-gray-300" style={{ height: '40%' }}>
//           {/* Bottom Tabs */}
//           <nav className="flex space-x-4 text-sm font-medium text-gray-600 mb-2">
//             <button
//               onClick={() => setActiveBottomTab('output')}
//               className={`py-2 px-4 ${activeBottomTab === 'output' ? 'border-b-2 border-[#5737F6] text-[#5737F6]' : 'hover:text-[#5737F6]'}`}
//             >
//               Output
//             </button>
//             <button
//               onClick={() => setActiveBottomTab('examples')}
//               className={`py-2 px-4 ${activeBottomTab === 'examples' ? 'border-b-2 border-[#5737F6] text-[#5737F6]' : 'hover:text-[#5737F6]'}`}
//             >
//               Examples
//             </button>
//           </nav>

//           {/* Bottom Tab Content */}
//           <div className="bg-white rounded-lg overflow-hidden flex-grow border border-gray-200">
//             {activeBottomTab === 'output' && (
//               <div className="p-4 h-full overflow-y-auto">
//                 <p className="text-gray-600 text-sm">Output will appear here after running your code.</p>
//               </div>
//             )}

//             {activeBottomTab === 'examples' && problem.examples?.length > 0 && (
//               <div className="p-3 space-y-3 h-full overflow-y-auto">
//                 {problem.examples.map((example, index) => (
//                   <div key={index} className="mb-4 last:mb-0">
//                     <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
//                       <span className="bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white px-2 py-1 rounded text-sm mr-2">
//                         {index + 1}
//                       </span>
//                       Example {index + 1}
//                     </h3>
//                     <div className="space-y-3">
//                       <div>
//                         <p className="text-sm font-medium text-gray-600 mb-1">Input:</p>
//                         <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-x-auto border border-gray-700">{example.input}</pre>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-600 mb-1">Output:</p>
//                         <pre className="bg-gray-900 text-blue-400 p-3 rounded-lg text-sm overflow-x-auto border border-gray-700">{example.output}</pre>
//                       </div>
//                       {example.explanation && (
//                         <div>
//                           <p className="text-sm font-medium text-gray-600 mb-1">Explanation:</p>
//                           <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">{example.explanation}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;