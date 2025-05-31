import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import OutputSection from './OutputSection';
import InputSection from './InputSection';
import { runCode } from '../utils/codeExecution';
import { Check, Play, Info, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';


const OnlineCompiler = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [languageId, setLanguageId] = useState(63); // Default to C++
  const [languageLabel, setLanguageLabel] = useState('C++');
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'

  const handleLanguageChange = (id, label) => {
    setLanguageId(id);
    setLanguageLabel(label);
  };

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setStatus('running');
      setOutput('Running code...');

      const result = await runCode(code, input, languageId);

      setOutput(result);
      setStatus(result.includes('Error') ? 'error' : 'success');
    } catch (error) {
     
      setStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const renderStatusIcon = () => {
    switch (status) {
      case 'running':
        return <RefreshCw className="animate-spin h-4 w-4" />;
      case 'success':
        return <Check className="h-4 w-4" />;
      case 'error':
        return <Info className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const NocodeNoServer = () => {
  toast.error("Please enter some code before running.",{className:"font-bold"});
};

  const handleRunClick = () => {
  if (!code.trim()) {
    NocodeNoServer(); 
    return;
  }
  handleRunCode(); 
};

  return (
    <>
        <div className="border-2 border-border_Col bg-dark-bg-secondary3 rounded-[8px] shadow-xl overflow-hidden transition-all">
      <div className="border-b  border-border_Col p-4 flex flex-wrap items-center gap-4">
        <LanguageSelector 
          selectedLanguageId={languageId} 
          onLanguageChange={handleLanguageChange} 
        />

        <div className="ml-auto ">
          <button
            onClick={handleRunClick}
            disabled={isRunning }
            className={`
                flex items-center gap-2  focus:outline-none focus:ring-0 px-4 py-2 rounded-[6px] font-medium transition-all
              ${isRunning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 
                status === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
                status === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' :
                `bg-emerald-500 text-white  focus:outline-none focus:ring-0 ${code.trim()=="" ?NocodeNoServer:""}`}
            `}
          >
            {code.trim()=="" ? NocodeNoServer:""}
            {renderStatusIcon()}
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
        <div className="lg:col-span-3 ">
          <CodeEditor 
            code={code} 
            setCode={setCode} 
            language={languageLabel.toLowerCase()} 
          />
        </div>

        <div className="lg:col-span-2 flex flex-col">
          <InputSection input={input} setInput={setInput} />
          <OutputSection output={output} status={status} />
        </div>
      </div>
    </div>
     
    </>
  );
};

export default OnlineCompiler;
