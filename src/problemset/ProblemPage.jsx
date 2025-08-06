import React from 'react';
import rawdata from './data.json';
import { useParams } from 'react-router';
import CodeEditor from './codeEditor/CodeEditor';


const ProblemPage = () => {
  const { id } = useParams(); 
  const problem = rawdata[id];

  if (!problem) {
    return <div className="p-4">Problem not found.</div>;
  }

  const { question, difficulty, url, tags, solutions } = problem;

  return (
    <>
      <div className="">

         <h1 className="text-2xl font-bold">Problem #{parseInt(id) + 1} — {difficulty}</h1>
         <div>
          <strong>Tags:</strong> {tags}
        </div>
        <div>
          <strong>Problem Link:</strong> <a href={url} className="text-blue-600 underline" target="_blank" rel="noreferrer">{url}</a>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p>{question.Description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Input</h2>
          <pre>{question.Input}</pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Output</h2>
          <pre>{question.Output}</pre>
        </div>

        {question.Examples?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Example</h2>
            {question.Examples.map((ex, i) => (
              <div key={i} className="p-2 bg-gray-100 rounded mb-2">
                <div><strong>Input:</strong> {ex.input}</div>
                <div><strong>Output:</strong> {ex.output}</div>
              </div>
            ))}
          </div>
        )}

        {solutions?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Solutions</h2>
            {solutions.map((s, i) => (
              <div key={i} className="p-3 border rounded mt-2">
                <div><strong>Language:</strong> {s.language}</div>
                <pre className="bg-gray-200 p-2 rounded mt-1">{s.code}</pre>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lower">
        <div className="w-1/2">
          <CodeEditor testcases={question.Examples}/>
        </div>
        <div className="right">

        </div>
      </div>
      
    </>
  )
}

export default ProblemPage