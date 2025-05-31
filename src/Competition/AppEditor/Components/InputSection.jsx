import React from 'react';
import { Terminal } from 'lucide-react';

const   InputSection = ({ input, setInput }) => {
  return (
    <div className="border-l border-b  border-border_Col h-1/2">
      <div className="bg-[#101828] px-4 py-2 flex items-center ">
        <Terminal className="h-4 w-4 text-slate-400 mr-2" />
        <span className="text-sm font-medium text-white">Input</span>
      </div>
      
      <textarea
        placeholder="Enter program input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-[calc(100%-36px)] placeholder:text-black text-black p-4 resize-none  outline-none font-mono text-sm"
      />
    </div>
  );
};

export default InputSection;
