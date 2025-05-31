import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TestCaseDisplay = ({ testCases, title }) => {
  const [expandedTestCase, setExpandedTestCase] = useState(null);

  const toggleTestCase = (id) => {
    setExpandedTestCase(expandedTestCase === id ? null : id);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {testCases.map((testCase) => (
          <div key={testCase.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
              onClick={() => toggleTestCase(testCase.id)}
            >
              <span className="font-medium">Test Case #{testCase.id}</span>
              {expandedTestCase === testCase.id ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
            {expandedTestCase === testCase.id && (
              <div className="p-3 border-t border-gray-200">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Input:</h4>
                  <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                    {testCase.input}
                  </pre>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Expected Output:</h4>
                  <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                    {testCase.output}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseDisplay;
