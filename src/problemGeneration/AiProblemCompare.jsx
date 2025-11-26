// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Users, CheckCircle, TrendingUp, Loader2 } from 'lucide-react';
// import { problemsApi, aiProblemsApi } from '../services/api';

// const AiProblemCompare = () => {
//   const { originalId, generatedId } = useParams();
//   const navigate = useNavigate();

//   const [originalProblem, setOriginalProblem] = useState(null);
//   const [aiProblem, setAiProblem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProblems();
//   }, [originalId, generatedId]);

//   // AiProblemCompare.jsx - Update fetchProblems function
// const fetchProblems = async () => {
//   try {
//     setLoading(true);
//     setError(null);

//     console.log('🔄 Fetching problems:', { originalId, generatedId });

//     const [originalRes, aiRes] = await Promise.all([
//       problemsApi.getProblemById(originalId),
//       aiProblemsApi.getAiProblemById(generatedId)
//     ]);

//     console.log('📥 Original response:', originalRes);
//     console.log('📥 AI response:', aiRes);

//     // Handle different response structures - FIX HERE
//     const originalProblemData = originalRes.data || originalRes;
//     const aiProblemData = aiRes.data || aiRes.problem || aiRes; // Added aiRes.problem

//     if (!originalProblemData) throw new Error("Failed to load original problem");
//     if (!aiProblemData) throw new Error("Failed to load AI problem");

//     setOriginalProblem(originalProblemData);
//     setAiProblem(aiProblemData);
//     setLoading(false);

//   } catch (err) {
//     console.error('❌ Error fetching problems:', err);
//     setError(err.message);
//     setLoading(false);
//   }
// };

//   const handleSolveOriginal = () => navigate(`/problemset/${originalId}`);
//   const handleSolveAI = () => navigate(`/ai-problems/solve/${generatedId}`);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-purple-50">
//         <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-purple-50">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={() => navigate('/problemset')}
//             className="px-6 py-2 bg-purple-600 text-white rounded-lg"
//           >
//             Back to Problems
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(`/problemset/${originalId}`)}
//         className="flex items-center gap-2 text-gray-700 hover:text-purple-600 mb-6"
//       >
//         <ArrowLeft className="h-5 w-5" />
//         Back
//       </button>

//       {/* Layout */}
//       <div className="flex gap-6">
//         <div className="w-1/2">
//           <ProblemPanel
//             title="Original Problem"
//             problem={originalProblem}
//             onSolve={handleSolveOriginal}
//           />
//         </div>

//         <div className="w-1/2">
//           <ProblemPanel
//             title="AI Generated Variant"
//             isAI={true}
//             problem={aiProblem}
//             onSolve={handleSolveAI}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProblemPanel = ({ title, problem, isAI, onSolve }) => {
//   if (!problem) return null;

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden">
//       <div className="p-5 border-b bg-purple-50">
//         <h2 className="text-lg font-bold text-gray-800">{title}</h2>
//         <span className="px-3 py-1 mt-2 inline-block bg-purple-100 text-purple-700 text-xs font-bold rounded">
//           {problem.difficulty}
//         </span>
//       </div>

//       <div className="p-6 max-h-[70vh] overflow-y-auto">
//         <p className="text-gray-700 whitespace-pre-line">{problem.description}</p>

//         {problem.input && (
//           <div className="mt-4 bg-blue-50 p-3 rounded border">
//             <h3 className="font-bold text-blue-700">Input:</h3>
//             <pre className="text-gray-700 whitespace-pre-line">{problem.input}</pre>
//           </div>
//         )}

//         {problem.output && (
//           <div className="mt-4 bg-green-50 p-3 rounded border">
//             <h3 className="font-bold text-green-700">Output:</h3>
//             <pre className="text-gray-700 whitespace-pre-line">{problem.output}</pre>
//           </div>
//         )}

//         {problem.examples && (
//           <div className="mt-6">
//             <h3 className="font-bold text-gray-800">Examples</h3>
//             {problem.examples.map((ex, idx) => (
//               <div key={idx} className="mt-2 bg-gray-50 p-3 border rounded">
//                 <p><strong>Input:</strong> {ex.input}</p>
//                 <p><strong>Output:</strong> {ex.output}</p>
//                 {ex.explanation && (
//                   <p><strong>Explanation:</strong> {ex.explanation}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t">
//         <button
//           onClick={onSolve}
//           className="w-full py-2 bg-purple-600 text-white rounded-lg"
//         >
//           Solve
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AiProblemCompare;

// ======================================================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { problemsApi, aiProblemsApi } from '../services/api';

const MAX_REGENERATIONS = 3;

const AiProblemCompare = () => {
  const { originalId, generatedId } = useParams();
  const navigate = useNavigate();

  const [originalProblem, setOriginalProblem] = useState(null);
  const [aiProblem, setAiProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regenerationCount, setRegenerationCount] = useState(0);

  useEffect(() => {
    fetchProblems();
  }, [originalId, generatedId]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError(null);

      const [originalRes, aiRes] = await Promise.all([
        problemsApi.getProblemById(originalId),
        aiProblemsApi.getAiProblemById(generatedId)
      ]);

      setOriginalProblem(originalRes.data || originalRes);
      setAiProblem(aiRes.data || aiRes.problem || aiRes);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSolveOriginal = () => navigate(`/problemset/${originalId}`);

  // const handleRegenerate = async () => {
  //   if (regenerationCount >= MAX_REGENERATIONS) {
  //     alert("Your generation limit is full");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     // Delete previous AI problem
  //     await aiProblemsApi.deleteAiProblem(aiProblem._id);
  //     // Generate new AI problem
  //     const newProblem = await aiProblemsApi.generateAiProblem(originalId);
  //     setAiProblem(newProblem);
  //     setRegenerationCount(regenerationCount + 1);
  //     navigate(`/ai-problems/compare/${originalId}/${newProblem._id}`);
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegenerate = async () => {
    if (regenerationCount >= MAX_REGENERATIONS) {
      alert("Your generation limit is full");
      return;
    }

    try {
      setLoading(true);

      // Delete previous AI problem
      await aiProblemsApi.deleteAiProblem(aiProblem._id);

      // Generate NEW ONE
      const res = await aiProblemsApi.generateAiProblem(originalId);

      const generated = res.problem;   // 👈 FIX #1
      if (!generated || !generated._id) {
        throw new Error("Invalid AI generation response: Missing problem._id");
      }

      setAiProblem(generated);
      setRegenerationCount(regenerationCount + 1);

      // 👈 FIX #2
      // navigate(`/ai-problems/compare/${originalId}/${generated._id}`);
      navigate(`/ai-problems/compare/${originalId}/${data.problem._id}`);


    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };


  // inside AiProblemCompare component (replace current handleAccept)
  const handleAccept = async () => {
    try {
      // call backend to mark accepted
      await aiProblemsApi.acceptAiProblem(aiProblem._id);

      // Navigate to the original problem page, but pass the accepted AI problem in location.state
      // originalId is the route param (the original problem's id)
      navigate(`/problemset/${originalId}`, { state: { aiProblem } });
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to accept AI problem');
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/problemset')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(`/problemset/${originalId}`)}
        className="flex items-center gap-2 text-gray-700 hover:text-purple-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="flex gap-6">
        <div className="w-1/2">
          <ProblemPanel
            title="Original Problem"
            problem={originalProblem}
            onSolve={handleSolveOriginal}
            canSolve={true}
          />
        </div>

        <div className="w-1/2">
          <ProblemPanel
            title="AI Generated Variant"
            isAI={true}
            problem={aiProblem}
            onRegenerate={handleRegenerate}
            onAccept={handleAccept}
          />
        </div>
      </div>
    </div>
  );
};

const ProblemPanel = ({ title, problem, isAI, onSolve, onRegenerate, onAccept, canSolve }) => {
  if (!problem) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden">
      <div className="p-5 border-b bg-purple-50">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <span className="px-3 py-1 mt-2 inline-block bg-purple-100 text-purple-700 text-xs font-bold rounded">
          {problem.difficulty}
        </span>
      </div>

      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <p className="text-gray-700 whitespace-pre-line">{problem.description}</p>

        {problem.input && (
          <div className="mt-4 bg-blue-50 p-3 rounded border">
            <h3 className="font-bold text-blue-700">Input:</h3>
            <pre className="text-gray-700 whitespace-pre-line">{problem.input}</pre>
          </div>
        )}

        {problem.output && (
          <div className="mt-4 bg-green-50 p-3 rounded border">
            <h3 className="font-bold text-green-700">Output:</h3>
            <pre className="text-gray-700 whitespace-pre-line">{problem.output}</pre>
          </div>
        )}

        {problem.examples && (
          <div className="mt-6">
            <h3 className="font-bold text-gray-800">Examples</h3>
            {problem.examples.map((ex, idx) => (
              <div key={idx} className="mt-2 bg-gray-50 p-3 border rounded">
                <p><strong>Input:</strong> {ex.input}</p>
                <p><strong>Output:</strong> {ex.output}</p>
                {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t flex flex-col gap-2">
        {isAI && (
          <>
            <button
              onClick={onRegenerate}
              className="w-full py-2 bg-yellow-500 text-white rounded-lg"
            >
              Regenerate
            </button>
            <button
              onClick={onAccept}
              className="w-full py-2 bg-green-600 text-white rounded-lg"
            >
              Accept & Solve
            </button>
          </>
        )}
        {canSolve && (
          <button
            onClick={onSolve}
            className="w-full py-2 bg-purple-600 text-white rounded-lg"
          >
            Solve
          </button>
        )}
      </div>
    </div>
  );
};

export default AiProblemCompare;
