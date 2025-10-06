// import React from 'react';
// import rawdata from './data.json';
// import { useParams } from 'react-router';
// import CodeEditor from './codeEditor/CodeEditor';


// const fetchProblem = async () => {
//   try {
//     setLoading(true);
//     setError(null);
    
//     console.log('Fetching problem with ID:', id); // Debug log
//     console.log('Full URL:', `http://localhost:3000/api/problems/${id}`); // Debug log
    
//     const data = await problemsApi.getProblemById(id);
//     console.log('Received data:', data); // Debug log
    
//     setProblem(data);
//     setLoading(false);
//   } catch (err) {
//     console.error('Full error:', err); // Debug log
//     setError(err.message);
//     setLoading(false);
//   }
// };

// const ProblemPage = () => {
//   const { id } = useParams(); 
//   const problem = rawdata[id];

//   fetchProblem

//   if (!problem) {
//     return <div className="p-4">Problem not found.</div>;
//   }

//   const { question, difficulty, url, tags, solutions } = problem;

//   return (
//     <>
//       <div className="">

//          <h1 className="text-2xl font-bold">Problem #{parseInt(id) + 1} — {difficulty}</h1>
//          <div>
//           <strong>Tags:</strong> {tags}
//         </div>
//         <div>
//           <strong>Problem Link:</strong> <a href={url} className="text-blue-600 underline" target="_blank" rel="noreferrer">{url}</a>
//         </div>

//         <div className="mt-4">
//           <h2 className="text-xl font-semibold">Description</h2>
//           <p>{question.Description}</p>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold">Input</h2>
//           <pre>{question.Input}</pre>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold">Output</h2>
//           <pre>{question.Output}</pre>
//         </div>

//         {question.Examples?.length > 0 && (
//           <div>
//             <h2 className="text-xl font-semibold">Example</h2>
//             {question.Examples.map((ex, i) => (
//               <div key={i} className="p-2 bg-gray-100 rounded mb-2">
//                 <div><strong>Input:</strong> {ex.input}</div>
//                 <div><strong>Output:</strong> {ex.output}</div>
//               </div>
//             ))}
//           </div>
//         )}

//         {solutions?.length > 0 && (
//           <div>
//             <h2 className="text-xl font-semibold">Solutions</h2>
//             {solutions.map((s, i) => (
//               <div key={i} className="p-3 border rounded mt-2">
//                 <div><strong>Language:</strong> {s.language}</div>
//                 <pre className="bg-gray-200 p-2 rounded mt-1">{s.code}</pre>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="lower">
//         <div className="w-1/2">
//           <CodeEditor testcases={question.Examples}/>
//         </div>
//         <div className="right">

//         </div>
//       </div>
      
//     </>
//   )
// }

// export default ProblemPage

// ============================================================

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeEditor from './codeEditor/CodeEditor';
import { problemsApi } from '../services/api';

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching problem with ID:', id);
      console.log('Full URL:', `http://localhost:3000/api/problems/${id}`);
      
      const data = await problemsApi.getProblemById(id);
      console.log('Received data:', data);
      
      setProblem(data);
      setLoading(false);
    } catch (err) {
      console.error('Full error:', err);
      setError(err.message);
      setLoading(false);
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
        {/* Back Navigation */}
        <Link to="/problemset" className="inline-flex items-center text-[#5737F6] hover:text-[#9612FA] mb-6 font-medium transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Problems
        </Link>

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
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {problem.source}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-50 text-[#5737F6] rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {problem.url && (
                <a 
                  href={problem.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#5737F6] hover:text-[#9612FA] text-sm font-medium transition-colors"
                >
                  View Original Problem
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
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

            {/* Solutions Card */}
            {problem.solutions?.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Solutions</h2>
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