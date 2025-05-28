import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { Check, Copy } from 'lucide-react';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="rounded-md bg-code-bg overflow-x-auto text-sm my-0">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/50 text-white hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default CodeBlock;
