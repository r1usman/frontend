// import React, { useState, useContext, useEffect } from "react";
// import Editor from "@monaco-editor/react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../GlobalContext/UserContext";
// import { problemsApi } from "../../services/api";

// const CodeEditor = ({ testcases, problemId }) => {
//   const navigate = useNavigate();
//   const { User } = useContext(UserContext);

//   const [code, setCode] = useState("# Write your code here\n");
//   const [language, setLanguage] = useState("python");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const [startTime, setStartTime] = useState(null);

//   // Language versions mapping
//   const languageVersions = {
//     python: "3.12.0",
//     javascript: "18.15.0",
//     cpp: "10.2.0",
//     java: "15.0.2",
//   };

//   // Start timer function
//   const startTimer = () => {
//     if (timerInterval) return; // Prevent multiple intervals

//     const start = new Date();
//     setStartTime(start);

//     const interval = setInterval(() => {
//       const now = new Date();
//       const diff = now - start;
//       setElapsedTime(diff);
//     }, 1000);

//     setTimerInterval(interval);
//   };

//   // Stop timer function
//   const stopTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval);
//       setTimerInterval(null);
//     }
//   };

//   // Reset timer function
//   const resetTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval);
//       setTimerInterval(null);
//     }
//     setElapsedTime(0);
//     setStartTime(null);
//   };

//   // Cleanup interval on component unmount
//   useEffect(() => {
//     return () => {
//       if (timerInterval) {
//         clearInterval(timerInterval);
//       }
//     };
//   }, [timerInterval]);

//   // Format time as MM:SS
//   const formatTime = (milliseconds) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   const handleSubmit = async () => {
//     if (!User) {
//       const shouldLogin = window.confirm(
//         "You need to login to submit code. Would you like to go to the login page?"
//       );
//       if (shouldLogin) {
//         navigate("/login");
//       }
//       return;
//     }

//     // Stop timer when submitting
//     stopTimer();

//     setLoading(true);
//     setResult(null);

//     const endedAt = new Date();

//     // Prepare submission data according to backend requirements
//     const submissionData = {
//       language: language,
//       version: languageVersions[language],
//       code: code,
//       problemId: problemId,
//       // Include timing data in the format your backend expects
//       elapsedTimeMs: elapsedTime,
//       startedAt: startTime ? startTime.toISOString() : new Date().toISOString(),
//       endedAt: endedAt.toISOString()
//     };

//     console.log("🔹 Sending to backend:", submissionData);
//     console.log("🔹 Problem ID:", problemId);

//     try {
//       const data = await problemsApi.submitCode(submissionData);
//       console.log("✅ Backend returned:", data);
//       setResult(data);
//     } catch (error) {
//       console.error("❌ Error details:", error);

//       if (error.message === "AUTHENTICATION_REQUIRED") {
//         alert("Please login to submit code");
//         navigate("/login");
//       } else {
//         setResult({ error: error.message });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Timer Display with Manual Controls */}
//       <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-white rounded-full p-2">
//               <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-xs text-gray-600 font-medium">Time Elapsed</p>
//               <p className="text-2xl font-bold text-gray-900 font-mono">{formatTime(elapsedTime)}</p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             {!timerInterval ? (
//               <button
//                 onClick={startTimer}
//                 className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
//               >
//                 Start
//               </button>
//             ) : (
//               <button
//                 onClick={stopTimer}
//                 className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
//               >
//                 Stop
//               </button>
//             )}
//             <button
//               onClick={resetTimer}
//               className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Timer Status */}
//         <div className="mt-2 text-xs text-gray-500">
//           {!startTime ? (
//             "Timer not started. Click Start to begin timing your session."
//           ) : timerInterval ? (
//             "Timer running... Click Stop to pause or Reset to restart."
//           ) : (
//             "Timer paused. Click Start to resume or Reset to restart from zero."
//           )}
//         </div>
//       </div>

//       {/* Language Selector */}
//       <div className="flex items-center gap-4">
//         <label className="font-medium text-gray-700">Language:</label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="python">Python</option>
//           <option value="javascript">JavaScript</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>
//       </div>

//       {/* Monaco Editor */}
//       <div className="border border-gray-300 rounded-lg overflow-hidden">
//         <Editor
//           height="400px"
//           language={language}
//           value={code}
//           onChange={(value) => setCode(value || "")}
//           theme="vs-dark"
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//             lineNumbers: "on",
//             scrollBeyondLastLine: false,
//             automaticLayout: true,
//           }}
//         />
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3">
//         {/* <button
//           onClick={handleRun}
//           disabled={loading}
//           className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
//         >
//           {loading ? "Running..." : "Run Code"}
//         </button> */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
//         >
//           {loading ? "Submitting..." : "Submit Solution"}
//         </button>
//       </div>

//       {/* Results Display */}
//       {result && (
//         <div
//           className={`p-4 rounded-lg ${result.error
//               ? "bg-red-50 border border-red-200"
//               : result.run
//                 ? "bg-blue-50 border border-blue-200"
//                 : "bg-green-50 border border-green-200"
//             }`}
//         >
//           <h3 className="font-bold mb-2">
//             {result.error ? "Error" : result.run ? "Run Result" : "Submission Result"}
//           </h3>

//           {/* Run Code Results */}
//           {result.run && !result.error && (
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.code === 0
//                     ? 'bg-blue-100 text-blue-800'
//                     : 'bg-red-100 text-red-800'
//                   }`}>
//                   {result.code === 0 ? 'EXECUTED' : 'RUNTIME ERROR'}
//                 </span>
//                 {result.executionTime !== "N/A" && (
//                   <span className="text-sm text-gray-600">
//                     Execution Time: {result.executionTime}ms
//                   </span>
//                 )}
//               </div>

//               {/* Output */}
//               {result.output && (
//                 <div className="space-y-1">
//                   <p className="font-semibold text-sm">Output:</p>
//                   <pre className="p-3 bg-white rounded border border-blue-200 text-xs overflow-x-auto whitespace-pre-wrap">
//                     {result.output}
//                   </pre>
//                 </div>
//               )}

//               {/* Stderr */}
//               {result.stderr && (
//                 <div className="space-y-1">
//                   <p className="font-semibold text-sm text-red-700">Errors:</p>
//                   <pre className="p-3 bg-red-50 rounded border border-red-200 text-xs overflow-x-auto whitespace-pre-wrap text-red-800">
//                     {result.stderr}
//                   </pre>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Submission Results */}
//           {result.newSubmission && (
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.newSubmission.status === 'accepted'
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-red-100 text-red-800'
//                   }`}>
//                   {result.newSubmission.status.toUpperCase()}
//                 </span>
//                 <span className="text-sm text-gray-600">
//                   Time: {result.newSubmission.elapsedTimeMs ? (result.newSubmission.elapsedTimeMs / 1000).toFixed(2) : '0'}s
//                 </span>
//               </div>

//               {/* Test Cases Results */}
//               {result.newSubmission.results && result.newSubmission.results.length > 0 && (
//                 <div className="space-y-2">
//                   <p className="font-semibold text-sm">Test Cases:</p>
//                   {result.newSubmission.results.map((test, idx) => (
//                     <div key={idx} className={`p-3 rounded border ${test.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
//                       }`}>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="font-medium text-sm">Test {idx + 1}</span>
//                         <span className={`text-xs font-medium ${test.passed ? 'text-green-700' : 'text-red-700'
//                           }`}>
//                           {test.passed ? '✓ PASSED' : '✗ FAILED'}
//                         </span>
//                       </div>
//                       {!test.passed && (
//                         <div className="text-xs space-y-1 mt-2">
//                           <div>
//                             <span className="font-medium">Expected:</span>
//                             <pre className="mt-1 p-2 bg-white rounded">{test.expected}</pre>
//                           </div>
//                           <div>
//                             <span className="font-medium">Got:</span>
//                             <pre className="mt-1 p-2 bg-white rounded">{test.output}</pre>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {result.error && (
//             <pre className="text-sm overflow-x-auto whitespace-pre-wrap mt-2">
//               {result.error}
//             </pre>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CodeEditor;

// ===========================================

import React, { useState, useContext, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../GlobalContext/UserContext";
import { problemsApi } from "../../services/api";

const CodeEditor = ({ testcases, problemId, isAiProblem = false }) => { // Add isAiProblem prop
  const navigate = useNavigate();
  const { User } = useContext(UserContext);

  const [code, setCode] = useState("# Write your code here\n");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // Language versions mapping
  const languageVersions = {
    python: "3.12.0",
    javascript: "18.15.0",
    cpp: "10.2.0",
    java: "15.0.2",
  };

  // Start timer function
  const startTimer = () => {
    if (timerInterval) return; // Prevent multiple intervals

    const start = new Date();
    setStartTime(start);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now - start;
      setElapsedTime(diff);
    }, 1000);

    setTimerInterval(interval);
  };

  // Stop timer function
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  // Reset timer function
  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setElapsedTime(0);
    setStartTime(null);
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Format time as MM:SS
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!User) {
      const shouldLogin = window.confirm(
        "You need to login to submit code. Would you like to go to the login page?"
      );
      if (shouldLogin) {
        navigate("/login");
      }
      return;
    }

    // Stop timer when submitting
    stopTimer();

    setLoading(true);
    setResult(null);

    const endedAt = new Date();

    // Prepare submission data according to backend requirements
    const submissionData = {
      language: language,
      version: languageVersions[language],
      code: code,
      problemId: problemId,
      isAiProblem: isAiProblem, // Add this flag
      // Include timing data in the format your backend expects
      elapsedTimeMs: elapsedTime,
      startedAt: startTime ? startTime.toISOString() : new Date().toISOString(),
      endedAt: endedAt.toISOString()
    };

    console.log("🔹 Sending to backend:", submissionData);
    console.log("🔹 Problem ID:", problemId);
    console.log("🔹 Is AI Problem:", isAiProblem);

    try {
      const data = await problemsApi.submitCode(submissionData);
      console.log("✅ Backend returned:", data);
      setResult(data);
      
      // Show success message for AI problems
      if (isAiProblem && data.newSubmission?.status === 'accepted') {
        alert('🎉 Congratulations! You solved the AI-generated problem!');
      }
    } catch (error) {
      console.error("❌ Error details:", error);

      if (error.message === "AUTHENTICATION_REQUIRED") {
        alert("Please login to submit code");
        navigate("/login");
      } else {
        setResult({ error: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Problem Badge (optional, shows if it's an AI problem) */}
      {isAiProblem && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-semibold text-purple-700">AI Generated Problem</span>
          </div>
          <p className="text-xs text-purple-600 mt-1">
            This problem was generated by AI. Solving it won't affect your stats, but it's great practice!
          </p>
        </div>
      )}

      {/* Timer Display with Manual Controls */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Time Elapsed</p>
              <p className="text-2xl font-bold text-gray-900 font-mono">{formatTime(elapsedTime)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!timerInterval ? (
              <button
                onClick={startTimer}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Start
              </button>
            ) : (
              <button
                onClick={stopTimer}
                className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Stop
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Timer Status */}
        <div className="mt-2 text-xs text-gray-500">
          {!startTime ? (
            "Timer not started. Click Start to begin timing your session."
          ) : timerInterval ? (
            "Timer running... Click Stop to pause or Reset to restart."
          ) : (
            "Timer paused. Click Start to resume or Reset to restart from zero."
          )}
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-700">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* Monaco Editor */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Submitting..." : "Submit Solution"}
        </button>
      </div>

      {/* Results Display */}
      {result && (
        <div
          className={`p-4 rounded-lg ${result.error
              ? "bg-red-50 border border-red-200"
              : result.run
                ? "bg-blue-50 border border-blue-200"
                : "bg-green-50 border border-green-200"
            }`}
        >
          <h3 className="font-bold mb-2">
            {result.error ? "Error" : result.run ? "Run Result" : "Submission Result"}
          </h3>

          {/* Run Code Results */}
          {result.run && !result.error && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.code === 0
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {result.code === 0 ? 'EXECUTED' : 'RUNTIME ERROR'}
                </span>
                {result.executionTime !== "N/A" && (
                  <span className="text-sm text-gray-600">
                    Execution Time: {result.executionTime}ms
                  </span>
                )}
              </div>

              {/* Output */}
              {result.output && (
                <div className="space-y-1">
                  <p className="font-semibold text-sm">Output:</p>
                  <pre className="p-3 bg-white rounded border border-blue-200 text-xs overflow-x-auto whitespace-pre-wrap">
                    {result.output}
                  </pre>
                </div>
              )}

              {/* Stderr */}
              {result.stderr && (
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-red-700">Errors:</p>
                  <pre className="p-3 bg-red-50 rounded border border-red-200 text-xs overflow-x-auto whitespace-pre-wrap text-red-800">
                    {result.stderr}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Submission Results */}
          {result.newSubmission && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.newSubmission.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {result.newSubmission.status.toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">
                  Time: {result.newSubmission.elapsedTimeMs ? (result.newSubmission.elapsedTimeMs / 1000).toFixed(2) : '0'}s
                </span>
                {isAiProblem && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                    AI Problem - Stats Not Updated
                  </span>
                )}
              </div>

              {/* Test Cases Results */}
              {result.newSubmission.results && result.newSubmission.results.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold text-sm">Test Cases:</p>
                  {result.newSubmission.results.map((test, idx) => (
                    <div key={idx} className={`p-3 rounded border ${test.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">Test {idx + 1}</span>
                        <span className={`text-xs font-medium ${test.passed ? 'text-green-700' : 'text-red-700'
                          }`}>
                          {test.passed ? '✓ PASSED' : '✗ FAILED'}
                        </span>
                      </div>
                      {!test.passed && (
                        <div className="text-xs space-y-1 mt-2">
                          <div>
                            <span className="font-medium">Expected:</span>
                            <pre className="mt-1 p-2 bg-white rounded">{test.expected}</pre>
                          </div>
                          <div>
                            <span className="font-medium">Got:</span>
                            <pre className="mt-1 p-2 bg-white rounded">{test.output}</pre>
                          </div>
                          {test.error && (
                            <div>
                              <span className="font-medium text-red-700">Error:</span>
                              <pre className="mt-1 p-2 bg-red-50 rounded text-red-700">{test.error}</pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {result.error && (
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap mt-2">
              {result.error}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;