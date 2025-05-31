import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const SubmissionResults = ({ results, score, executionTime }) => {
  const passedCount = results.filter((result) => result.passed).length;
  const totalCount = results.length;

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Submission Results</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="font-medium">Score:</span>{' '}
            <span className={score >= 70 ? 'text-green-600' : 'text-red-600'}>
              {score}%
            </span>
          </div>
          {executionTime !== undefined && (
            <div className="text-sm">
              <span className="font-medium">Time:</span> {executionTime}ms
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              score >= 70 ? 'bg-green-600' : 'bg-red-600'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {passedCount} of {totalCount} test cases passed
        </div>
      </div>

      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={result.testCaseId}
            className={`p-3 rounded-lg flex items-start ${
              result.passed ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="mr-3 mt-0.5">
              {result.passed ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <XCircle size={18} className="text-red-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">Test Case #{index + 1}</span>
                {result.executionTime !== undefined && (
                  <span className="text-sm text-gray-600">
                    {result.executionTime}ms
                  </span>
                )}
              </div>
              {!result.passed && result.error && (
                <div className="mt-1">
                  <pre className="text-sm bg-red-100 p-2 rounded whitespace-pre-wrap text-red-800">
                    {result.error}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionResults;
