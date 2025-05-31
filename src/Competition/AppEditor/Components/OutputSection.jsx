import React from 'react';
import { Terminal, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const OutputSection = ({ output, status }) => {
  const getStatusIndicator = () => {
    switch (status) {
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Terminal className="h-4 w-4 text-slate-400" />;
    }
  };

  const getHeaderClass = () => {
    switch (status) {
      case 'running':
        return 'bg-slate-900';
      case 'success':
        return 'bg-green-900';
      case 'error':
        return 'bg-red-900';
      default:
        return 'bg-slate-900';
    }
  };

  return (
    <div className="h-1/2 border-l  ">
      <div className={`px-4 py-2 flex items-center border-y ${getHeaderClass()}`}>
        {getStatusIndicator()}
        <span className="text-sm  font-medium  ml-2">Output</span>
      </div>

      <pre className={`
        w-full h-[calc(100%-36px)] p-4 overflow-auto font-mono text-sm whitespace-pre-wrap
        ${status === 'success' ? 'text-green-400' : 
          status === 'error' ? 'text-red-400' : 
          'text-black'}
      `}>
        {output || 'Code output will appear here...'}
      </pre>
    </div>
  );
};

export default OutputSection;
