// import React, { useState } from 'react';
// import { ArrowLeft, Users, CheckCircle, TrendingUp } from 'lucide-react';

// const SmartProblemGenerator = () => {
//   const [activeView, setActiveView] = useState('original'); // 'original' or 'ai'

//   const problemData = {
//     title: "problem_2",
//     difficulty: "VERY HARD",
//     topics: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"],
//     stats: {
//       accepted: 0,
//       submissions: 0,
//       acceptanceRate: "0%"
//     },
//     description: `Zookeeper is buying a carton of fruit to feed his pet wabbit. The fruits are a sequence of apples and oranges, which is represented by a binary string S₁S₂...Sₙ of length n. 1 represents an apple and 0 represents an orange.

// Since wabbit is allergic to eating oranges, Zookeeper would like to find the longest contiguous sequence of apples. Let f(l,r) be the longest contiguous sequence of apples in the substring Sₗsₗ₊₁...sᵣ.

// Help Zookeeper find Σᵢ₌₁ⁿ Σⱼ₌ᵢⁿ f(l,r), or the sum of f across all substrings.`,
//     examples: [
//       { input: "4\n0110", output: "12" },
//       { input: "7\n1101001", output: "30" },
//       { input: "12\n011100011100", output: "156" }
//     ],
//     constraints: [
//       "The first line contains a single integer n (1 ≤ n ≤ 5 × 10⁵).",
//       "The next line contains a binary string s of length n (s ∈ {0,1})"
//     ],
//     note: "In the first test, there are ten substrings. The lengths of the longest contiguous sequence of ones in each of these ten substrings are 0,1,2,2,1,2,2,1,1,0 respectively. Hence, the answer is 0+1+2+2+1+2+2+1+1+0 = 12."
//   };

//   const aiVersion = {
//     description: `You are given a binary string s consisting only of 0s and 1s, where each 1 represents an apple and each 0 represents an orange.

// The Zookeeper wants to feed apples to his wabbit, who is allergic to oranges. For every possible substring of s, the Zookeeper wants to determine the length of the longest sequence of consecutive apples (1s) within that substring.

// Your task is to compute the total sum of the longest contiguous sequences of apples across all possible substrings of s.`,
//     inputFormat: [
//       "• The first line contains a single integer n (1 ≤ n ≤ 5 × 10⁵), the length of the string.",
//       "• The second line contains a binary string s of length n, where each character is either '0' or '1'."
//     ],
//     outputFormat: "Output a single integer representing the sum of the longest contiguous sequence of apples (1s) for all substrings of s.",
//     examples: [
//       { input: "4\n0110", output: "12" },
//       { input: "7\n1101001", output: "30" }
//     ]
//   };

//   return (
//     // <div className="min-h-screen bg-dark-bg-secondary2">
//     <div className="min-h-screen bg-blue-100">
//       {/* Header */}
//       <div className="bg-dark-bg-secondary1 border-b border-border_Col px-6 py-4">
//         <div className="flex items-center gap-4">
//           <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
//             <ArrowLeft className="h-5 w-5" />
//             <span className="text-sm">Back to Dashboard</span>
//           </button>
//           <h1 className="text-xl font-semibold text-white">Smart Problem Generator</h1>
//         </div>
//       </div>

//       <div className="flex">
//         {/* Left Panel - Original Problem */}
//         <div className="w-1/2 p-6">
//           <div className="bg-dark-bg-secondary3 rounded-lg border border-border_Col">
//             {/* Problem Header */}
//             <div className="p-6 border-b border-border_Col">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-white">{problemData.title}</h2>
//                 <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded border border-red-500/30">
//                   {problemData.difficulty}
//                 </span>
//               </div>

//               {/* Topics */}
//               <div className="mb-4">
//                 <span className="text-sm font-medium text-gray-400 mb-2 block">Topics:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {problemData.topics.map((topic, index) => (
//                     <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
//                       {topic}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="flex items-center gap-8">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 text-green-500" />
//                   <span className="text-xs text-gray-400">Accepted</span>
//                   <span className="text-lg font-semibold text-green-500">{problemData.stats.accepted}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="h-4 w-4 text-blue-500" />
//                   <span className="text-xs text-gray-400">Submissions</span>
//                   <span className="text-lg font-semibold text-blue-500">{problemData.stats.submissions}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <TrendingUp className="h-4 w-4 text-purple-500" />
//                   <span className="text-xs text-gray-400">Acceptance Rate</span>
//                   <span className="text-lg font-semibold text-purple-500">{problemData.stats.acceptanceRate}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Problem Content */}
//             <div className="p-6">
//               {/* Description */}
//               <div className="mb-6">
//                 <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
//                   {problemData.description}
//                 </p>
//               </div>

//               {/* Examples */}
//               <div className="mb-6">
//                 <h3 className="text-white font-semibold mb-4">Examples:</h3>
                
//                 {/* Example 1 */}
//                 <div className="mb-4">
//                   <h4 className="text-white font-medium mb-2">Example 1:</h4>
//                   <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
//                     <div className="mb-2">
//                       <span className="text-blue-400 text-sm font-medium">Input:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[0].input}</pre>
//                     </div>
//                     <div>
//                       <span className="text-green-400 text-sm font-medium">Output:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[0].output}</pre>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Example 2 */}
//                 <div className="mb-4">
//                   <h4 className="text-white font-medium mb-2">Example 2:</h4>
//                   <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
//                     <div className="mb-2">
//                       <span className="text-blue-400 text-sm font-medium">Input:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[1].input}</pre>
//                     </div>
//                     <div>
//                       <span className="text-green-400 text-sm font-medium">Output:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[1].output}</pre>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Example 3 */}
//                 <div className="mb-4">
//                   <h4 className="text-white font-medium mb-2">Example 3:</h4>
//                   <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
//                     <div className="mb-2">
//                       <span className="text-blue-400 text-sm font-medium">Input:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[2].input}</pre>
//                     </div>
//                     <div>
//                       <span className="text-green-400 text-sm font-medium">Output:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{problemData.examples[2].output}</pre>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Constraints */}
//               <div className="mb-6">
//                 <h3 className="text-white font-semibold mb-3">Constraints:</h3>
//                 <div className="text-gray-300 text-sm space-y-1">
//                   {problemData.constraints.map((constraint, index) => (
//                     <p key={index}>{constraint}</p>
//                   ))}
//                 </div>
//               </div>

//               {/* Note */}
//               <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
//                 <h4 className="text-green-400 font-semibold mb-2">Note:</h4>
//                 <p className="text-green-300 text-sm">{problemData.note}</p>
//               </div>
//             </div>

//             {/* Solve Button */}
//             <div className="p-6 border-t border-border_Col">
//               <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
//                 Solve Question
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - AI Generated Version */}
//         <div className="w-1/2 p-6">
//           <div className="bg-dark-bg-secondary3 rounded-lg border border-border_Col">
//             {/* AI Header */}
//             <div className="p-6 border-b border-border_Col">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
//                   📘 AI Generated Version
//                 </div>
//               </div>
//             </div>

//             {/* AI Content */}
//             <div className="p-6">
//               {/* Description */}
//               <div className="mb-6">
//                 <p className="text-gray-300 leading-relaxed text-sm">
//                   {aiVersion.description}
//                 </p>
//               </div>

//               {/* Input Format */}
//               <div className="mb-6">
//                 <div className="bg-blue-500/10 border border-blue-500/30 rounded-t p-3">
//                   <h3 className="text-blue-400 font-semibold">Input Format:</h3>
//                 </div>
//                 <div className="bg-blue-500/5 border border-blue-500/30 border-t-0 rounded-b p-4">
//                   <div className="text-gray-300 text-sm space-y-1">
//                     {aiVersion.inputFormat.map((format, index) => (
//                       <p key={index}>{format}</p>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Output Format */}
//               <div className="mb-6">
//                 <div className="bg-green-500/10 border border-green-500/30 rounded-t p-3">
//                   <h3 className="text-green-400 font-semibold">Output Format:</h3>
//                 </div>
//                 <div className="bg-green-500/5 border border-green-500/30 border-t-0 rounded-b p-4">
//                   <p className="text-gray-300 text-sm">{aiVersion.outputFormat}</p>
//                 </div>
//               </div>

//               {/* Examples */}
//               <div className="mb-6">
//                 <h3 className="text-white font-semibold mb-4">Examples:</h3>
                
//                 {/* Example 1 */}
//                 <div className="mb-4">
//                   <h4 className="text-white font-medium mb-2">Example 1:</h4>
//                   <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
//                     <div className="mb-2">
//                       <span className="text-blue-400 text-sm font-medium">Input:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[0].input}</pre>
//                     </div>
//                     <div>
//                       <span className="text-green-400 text-sm font-medium">Output:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[0].output}</pre>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Example 2 */}
//                 <div className="mb-4">
//                   <h4 className="text-white font-medium mb-2">Example 2:</h4>
//                   <div className="bg-dark-bg-secondary1 rounded p-3 border border-border_Col">
//                     <div className="mb-2">
//                       <span className="text-blue-400 text-sm font-medium">Input:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[1].input}</pre>
//                     </div>
//                     <div>
//                       <span className="text-green-400 text-sm font-medium">Output:</span>
//                       <pre className="text-gray-300 text-sm mt-1 font-mono">{aiVersion.examples[1].output}</pre>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Solve Button */}
//                 <div className="p-6 border-t border-border_Col">
//                 <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
//                     Solve Question
//                 </button>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmartProblemGenerator;


// =========================================================
// ===============================  This is actual with dummy data  ======================================
// =========================================================

// import React, { useState } from 'react';
// import { ArrowLeft, Users, CheckCircle, TrendingUp } from 'lucide-react';

// const SmartProblemGenerator = () => {
//   const [activeView, setActiveView] = useState('original');

//   const problemData = {
//     title: "problem_2",
//     difficulty: "VERY HARD",
//     topics: ["Sorting", "Amortized analysis", "Dynamic programming", "Divide and conquer", "Data structures"],
//     stats: {
//       accepted: 0,
//       submissions: 0,
//       acceptanceRate: "0%"
//     },
//     description: `Zookeeper is buying a carton of fruit to feed his pet wabbit. The fruits are a sequence of apples and oranges, which is represented by a binary string S₁S₂...Sₙ of length n. 1 represents an apple and 0 represents an orange.

// Since wabbit is allergic to eating oranges, Zookeeper would like to find the longest contiguous sequence of apples. Let f(l,r) be the longest contiguous sequence of apples in the substring Sₗsₗ₊₁...sᵣ.

// Help Zookeeper find Σᵢ₌₁ⁿ Σⱼ₌ᵢⁿ f(l,r), or the sum of f across all substrings.`,
//     examples: [
//       { input: "4\n0110", output: "12" },
//       { input: "7\n1101001", output: "30" },
//       { input: "12\n011100011100", output: "156" }
//     ],
//     constraints: [
//       "The first line contains a single integer n (1 ≤ n ≤ 5 × 10⁵).",
//       "The next line contains a binary string s of length n (s ∈ {0,1})"
//     ],
//     note: "In the first test, there are ten substrings. The lengths of the longest contiguous sequence of ones in each of these ten substrings are 0,1,2,2,1,2,2,1,1,0 respectively. Hence, the answer is 0+1+2+2+1+2+2+1+1+0 = 12."
//   };

//   const aiVersion = {
//     description: `You are given a binary string s consisting only of 0s and 1s, where each 1 represents an apple and each 0 represents an orange.

// The Zookeeper wants to feed apples to his wabbit, who is allergic to oranges. For every possible substring of s, the Zookeeper wants to determine the length of the longest sequence of consecutive apples (1s) within that substring.

// Your task is to compute the total sum of the longest contiguous sequences of apples across all possible substrings of s.`,
//     inputFormat: [
//       "• The first line contains a single integer n (1 ≤ n ≤ 5 × 10⁵), the length of the string.",
//       "• The second line contains a binary string s of length n, where each character is either '0' or '1'."
//     ],
//     outputFormat: "Output a single integer representing the sum of the longest contiguous sequence of apples (1s) for all substrings of s.",
//     examples: [
//       { input: "4\n0110", output: "12" },
//       { input: "7\n1101001", output: "30" }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
//       {/* Header */}
//       <div className="bg-white border-b border-purple-200 px-6 py-4 shadow-sm">
//         <div className="flex items-center gap-4">
//           <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
//             <ArrowLeft className="h-5 w-5" />
//             <span className="text-sm font-medium">Back to Dashboard</span>
//           </button>
//           <h1 className="text-xl font-bold text-gray-800">Smart Problem Generator</h1>
//         </div>
//       </div>

//       <div className="flex gap-6 p-6">
//         {/* Left Panel - Original Problem */}
//         <div className="w-1/2">
//           <div className="bg-white rounded-xl border border-purple-200 shadow-lg overflow-hidden">
//             {/* Problem Header */}
//             <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">{problemData.title}</h2>
//                 <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-lg border border-red-200">
//                   {problemData.difficulty}
//                 </span>
//               </div>

//               {/* Topics */}
//               <div className="mb-4">
//                 <span className="text-sm font-semibold text-gray-700 mb-2 block">Topics:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {problemData.topics.map((topic, index) => (
//                     <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
//                       {topic}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="flex items-center gap-8">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4 text-green-600" />
//                   <span className="text-xs text-gray-600 font-medium">Accepted</span>
//                   <span className="text-lg font-bold text-green-600">{problemData.stats.accepted}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="h-4 w-4 text-blue-600" />
//                   <span className="text-xs text-gray-600 font-medium">Submissions</span>
//                   <span className="text-lg font-bold text-blue-600">{problemData.stats.submissions}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <TrendingUp className="h-4 w-4" style={{ color: '#9614FA' }} />
//                   <span className="text-xs text-gray-600 font-medium">Rate</span>
//                   <span className="text-lg font-bold" style={{ color: '#9614FA' }}>{problemData.stats.acceptanceRate}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Problem Content */}
//             <div className="p-6">
//               {/* Description */}
//               <div className="mb-6">
//                 <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
//                   {problemData.description}
//                 </p>
//               </div>

//               {/* Examples */}
//               <div className="mb-6">
//                 <h3 className="text-gray-800 font-bold mb-4 text-lg">Examples:</h3>
                
//                 {problemData.examples.map((example, idx) => (
//                   <div key={idx} className="mb-4">
//                     <h4 className="text-gray-800 font-semibold mb-2">Example {idx + 1}:</h4>
//                     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                       <div className="mb-3">
//                         <span className="text-blue-600 text-sm font-semibold">Input:</span>
//                         <pre className="text-gray-700 text-sm mt-1 font-mono">{example.input}</pre>
//                       </div>
//                       <div>
//                         <span className="text-green-600 text-sm font-semibold">Output:</span>
//                         <pre className="text-gray-700 text-sm mt-1 font-mono">{example.output}</pre>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Constraints */}
//               <div className="mb-6">
//                 <h3 className="text-gray-800 font-bold mb-3 text-lg">Constraints:</h3>
//                 <div className="text-gray-700 text-sm space-y-1">
//                   {problemData.constraints.map((constraint, index) => (
//                     <p key={index}>{constraint}</p>
//                   ))}
//                 </div>
//               </div>

//               {/* Note */}
//               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                 <h4 className="text-green-700 font-bold mb-2">Note:</h4>
//                 <p className="text-green-800 text-sm">{problemData.note}</p>
//               </div>
//             </div>

//             {/* Solve Button */}
//             <div className="p-6 border-t border-purple-100">
//               <button 
//                 className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
//                 style={{ background: 'linear-gradient(135deg, #9614FA 0%, #614CF7 100%)' }}
//               >
//                 Solve Question
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - AI Generated Version */}
//         <div className="w-1/2">
//           <div className="bg-white rounded-xl border border-purple-200 shadow-lg overflow-hidden">
//             {/* AI Header */}
//             <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md" style={{ background: 'linear-gradient(135deg, #9614FA 0%, #614CF7 100%)' }}>
//                   📘 AI Generated Version
//                 </div>
//               </div>
//             </div>

//             {/* AI Content */}
//             <div className="p-6">
//               {/* Description */}
//               <div className="mb-6">
//                 <p className="text-gray-700 leading-relaxed text-sm">
//                   {aiVersion.description}
//                 </p>
//               </div>

//               {/* Input Format */}
//               <div className="mb-6">
//                 <div className="bg-blue-50 border border-blue-200 rounded-t-lg p-3">
//                   <h3 className="text-blue-700 font-bold">Input Format:</h3>
//                 </div>
//                 <div className="bg-blue-50 border border-blue-200 border-t-0 rounded-b-lg p-4">
//                   <div className="text-gray-700 text-sm space-y-1">
//                     {aiVersion.inputFormat.map((format, index) => (
//                       <p key={index}>{format}</p>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Output Format */}
//               <div className="mb-6">
//                 <div className="bg-green-50 border border-green-200 rounded-t-lg p-3">
//                   <h3 className="text-green-700 font-bold">Output Format:</h3>
//                 </div>
//                 <div className="bg-green-50 border border-green-200 border-t-0 rounded-b-lg p-4">
//                   <p className="text-gray-700 text-sm">{aiVersion.outputFormat}</p>
//                 </div>
//               </div>

//               {/* Examples */}
//               <div className="mb-6">
//                 <h3 className="text-gray-800 font-bold mb-4 text-lg">Examples:</h3>
                
//                 {aiVersion.examples.map((example, idx) => (
//                   <div key={idx} className="mb-4">
//                     <h4 className="text-gray-800 font-semibold mb-2">Example {idx + 1}:</h4>
//                     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                       <div className="mb-3">
//                         <span className="text-blue-600 text-sm font-semibold">Input:</span>
//                         <pre className="text-gray-700 text-sm mt-1 font-mono">{example.input}</pre>
//                       </div>
//                       <div>
//                         <span className="text-green-600 text-sm font-semibold">Output:</span>
//                         <pre className="text-gray-700 text-sm mt-1 font-mono">{example.output}</pre>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Solve Button */}
//             <div className="p-6 border-t border-purple-100">
//               <button 
//                 className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
//                 style={{ background: 'linear-gradient(135deg, #9614FA 0%, #614CF7 100%)' }}
//               >
//                 Solve Question
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmartProblemGenerator;

// ===================================

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle, TrendingUp, Loader2 } from 'lucide-react';
import { problemsApi } from '../services/api';

const SmartProblemGenerator = () => {
  const { originalId, aiId } = useParams();
  const navigate = useNavigate();
  
  const [originalProblem, setOriginalProblem] = useState(null);
  const [aiProblem, setAiProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, [originalId, aiId]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both problems
      const [original, ai] = await Promise.all([
        problemsApi.getProblemById(originalId),
        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000/api'}/ai-problems/${aiId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => res.json())
      ]);

      setOriginalProblem(original);
      setAiProblem(ai.data || ai);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching problems:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSolveOriginal = () => {
    navigate(`/problem/${originalId}`);
  };

  const handleSolveAI = () => {
    navigate(`/ai-problem/${aiId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/problemset')}
            className="px-6 py-2 bg-gradient-to-r from-[#5737F6] to-[#9612FA] text-white rounded-lg"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-purple-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/problem/${originalId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Problem</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Smart Problem Generator</h1>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Left Panel - Original Problem */}
        <div className="w-1/2">
          <ProblemPanel 
            problem={originalProblem}
            title="Original Problem"
            isAI={false}
            onSolve={handleSolveOriginal}
          />
        </div>

        {/* Right Panel - AI Generated Version */}
        <div className="w-1/2">
          <ProblemPanel 
            problem={aiProblem}
            title="AI Generated Version"
            isAI={true}
            onSolve={handleSolveAI}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Problem Panel Component
const ProblemPanel = ({ problem, title, isAI, onSolve }) => {
  if (!problem) return null;

  return (
    <div className="bg-white rounded-xl border border-purple-200 shadow-lg overflow-hidden">
      {/* Problem Header */}
      <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
        {isAI && (
          <div className="mb-3">
            <div className="inline-block px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md" style={{ background: 'linear-gradient(135deg, #9614FA 0%, #614CF7 100%)' }}>
              📘 {title}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{problem.name}</h2>
          <span className={`px-3 py-1 text-sm font-semibold rounded-lg border ${
            problem.difficulty === 'EASY' ? 'bg-green-100 text-green-600 border-green-200' :
            problem.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-600 border-yellow-200' :
            problem.difficulty === 'MEDIUM_HARD' ? 'bg-orange-100 text-orange-600 border-orange-200' :
            problem.difficulty === 'HARD' ? 'bg-red-100 text-red-600 border-red-200' :
            'bg-purple-100 text-purple-600 border-purple-200'
          }`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Topics */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-700 mb-2 block">Topics:</span>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats - Only show for original problems */}
        {!isAI && (
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-600 font-medium">Accepted</span>
              <span className="text-lg font-bold text-green-600">0</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-gray-600 font-medium">Submissions</span>
              <span className="text-lg font-bold text-blue-600">0</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" style={{ color: '#9614FA' }} />
              <span className="text-xs text-gray-600 font-medium">Rate</span>
              <span className="text-lg font-bold" style={{ color: '#9614FA' }}>0%</span>
            </div>
          </div>
        )}
      </div>

      {/* Problem Content */}
      <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
            {problem.description}
          </p>
        </div>

        {/* Input Format */}
        {problem.input && (
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-t-lg p-3">
              <h3 className="text-blue-700 font-bold">Input Format:</h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 border-t-0 rounded-b-lg p-4">
              <p className="text-gray-700 text-sm whitespace-pre-line">{problem.input}</p>
            </div>
          </div>
        )}

        {/* Output Format */}
        {problem.output && (
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-t-lg p-3">
              <h3 className="text-green-700 font-bold">Output Format:</h3>
            </div>
            <div className="bg-green-50 border border-green-200 border-t-0 rounded-b-lg p-4">
              <p className="text-gray-700 text-sm whitespace-pre-line">{problem.output}</p>
            </div>
          </div>
        )}

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-800 font-bold mb-4 text-lg">Examples:</h3>
            
            {problem.examples.map((example, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-gray-800 font-semibold mb-2">Example {idx + 1}:</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="mb-3">
                    <span className="text-blue-600 text-sm font-semibold">Input:</span>
                    <pre className="text-gray-700 text-sm mt-1 font-mono whitespace-pre-wrap">{example.input}</pre>
                  </div>
                  <div className="mb-3">
                    <span className="text-green-600 text-sm font-semibold">Output:</span>
                    <pre className="text-gray-700 text-sm mt-1 font-mono whitespace-pre-wrap">{example.output}</pre>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="text-purple-600 text-sm font-semibold">Explanation:</span>
                      <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{example.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        {problem.note && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-green-700 font-bold mb-2">Note:</h4>
            <p className="text-green-800 text-sm whitespace-pre-line">{problem.note}</p>
          </div>
        )}
      </div>

      {/* Solve Button */}
      <div className="p-6 border-t border-purple-100">
        <button 
          onClick={onSolve}
          className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #9614FA 0%, #614CF7 100%)' }}
        >
          Solve Question
        </button>
      </div>
    </div>
  );
};

export default SmartProblemGenerator;