import React, { useState } from 'react';
import { Play, Save } from 'lucide-react';

const CodeEditor = ({
  initialCode = '',
  language,
  onSave,
  onRun,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);

  const handleSave = () => {
    onSave(code);
  };

  const handleRun = () => {
    if (onRun) onRun(code);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'python':
        return 'Python';
      case 'cpp':
        return 'C++';
      case 'java':
        return 'Java';
      case 'javascript':
        return 'JavaScript';
      default:
        return 'Code';
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b">
        <span className="font-medium">{getLanguageLabel()}</span>
        {!readOnly && (
          <div className="flex space-x-2">
            {onRun && (
              <button
                onClick={handleRun}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Play size={16} />
                <span>Run</span>
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm focus:outline-none"
        placeholder="Write your code here..."
        readOnly={readOnly}
      />
    </div>
  );
};

export default CodeEditor;

