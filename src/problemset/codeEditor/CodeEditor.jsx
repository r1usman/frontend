import React, { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { LANGUAGE_VERSION, LANGUAGE_BOILERPLATE } from './languages';
import axios from 'axios';

const CodeEditor = ({ testcases }) => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(LANGUAGE_BOILERPLATE['javascript']);
  const [output, setOutput] = useState('');

  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null); // 'Accepted' | 'Failed'
  const [submittedAt, setSubmittedAt] = useState(null);
  const [runtime, setRuntime] = useState({ cpu: 0, wall: 0 });
  const [failingTestcase, setFailingTestcase] = useState(null);


  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setCode(LANGUAGE_BOILERPLATE[lang]);
    setOutput('');
  };

  const langs = Object.entries(LANGUAGE_VERSION);

  const sendCodeToPiston = async () => {
    setStatus(null);
    setResults([]);
    setFailingTestcase(null);

    const allResults = [];

    for (let i = 0; i < testcases.length; i++) {
      const tc = testcases[i];
      try {
        //const res = await axios.post('http://localhost:2000/api/v2/execute', {
        const res = await axios.post('http://localhost:5000/run-code', {
          language,
          version: LANGUAGE_VERSION[language],
          files: [
            {
              name:
                language === "java"
                  ? "Main.java"
                  : language === "python"
                    ? "main.py"
                    : "main.js",
              content: code,
            },
          ],
          stdin: tc.input,
          // run_timeout: 5,
          // run_memory_limit: 512000,
        });

        const run = res.data.run;
        const output = (run.stdout || "").trim();
        const expected = tc.output.trim();

        if (output === expected) {
          allResults.push({ index: i, passed: true });
        } else {
          allResults.push({ index: i, passed: false });
          setFailingTestcase({
            input: tc.input,
            expected: expected,
            output: output || run.stderr || "No output",
          });
          setStatus("Failed");
          break;
        }

        // accumulate total times
        setRuntime(prev => ({
          cpu: prev.cpu + (run.cpu_time || 0),
          wall: prev.wall + (run.wall_time || 0),
        }));

      } catch (err) {
        console.error("Error:", err);
        setStatus("Failed");
        setFailingTestcase({
          input: tc.input,
          expected: tc.output,
          output: "Execution failed",
        });
        break;
      }
    }

    setResults(allResults);
    if (allResults.length === testcases.length && allResults.every(r => r.passed)) {
      setStatus("Accepted");
      setSubmittedAt(new Date().toLocaleString());
    }
  };



  return (
    <>
      {/* Language Selector Dropdown */}
      <Menu>
        <MenuButton className="px-4 py-2 bg-gray-700 text-white rounded">
          Select Language
        </MenuButton>
        <MenuItems anchor="bottom" className="z-10 bg-white shadow-lg rounded p-2">
          {langs.map(([lang, version]) => (
            <MenuItem key={lang}>
              <button
                onClick={() => changeLanguage(lang)}
                className="w-full text-left px-2 py-1 hover:bg-gray-100"
              >
                {lang} &nbsp; {version}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      {/* Monaco Editor */}
      <Editor
        height="50vh"
        theme="vs-dark"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        onMount={onMount}
      />

      {/* Run Button */}
      <button
        onClick={sendCodeToPiston}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        RUN
      </button>

      {/* Output Area */}
      {status === "Accepted" && (
        <div className="mt-4 p-4 bg-green-100 text-green-900 rounded">
          <h2 className="text-xl font-bold">✅ Accepted</h2>
          <p>Submitted at: {submittedAt}</p>

          <div className="mt-2">
            {results.map((r, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span>Testcase {r.index + 1}</span>
                <span className="text-green-700">✔️ Passed</span>
              </div>
            ))}
          </div>

          <div className="mt-2">
            <h4 className="font-semibold">Runtime Info</h4>
            <p>CPU Time: {runtime.cpu.toFixed(2)}s</p>
            <p>Wall Time: {runtime.wall.toFixed(2)}s</p>
          </div>
        </div>
      )}

      {status === "Failed" && failingTestcase && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          <h2 className="text-xl font-bold">❌ Wrong Answer</h2>

          <div className="mt-2">
            <p><strong>Input:</strong></p>
            <pre>{failingTestcase.input}</pre>

            <p><strong>Expected:</strong></p>
            <pre>{failingTestcase.expected}</pre>

            <p><strong>Output:</strong></p>
            <pre>{failingTestcase.output}</pre>
          </div>
        </div>
      )}

    </>
  );
};

export default CodeEditor;

// /*
// Type of problems:

// (1) Assume :
// "run_timeout": 5,
// "run_memory_limit": 512000

// (2) 
// 3 or more then 3 testcase
// */

// (3)
// Error on putting one language code to other seleted language (selected: python, code: js)

/*
=> Solution with no external library allowed

*/


// ===================================================
// ===================================================
// ========================================= Problem 1
// ===================================================
// ===================================================

/*
// ==================== Curl python

curl -X POST http://localhost:2000/api/v2/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "python",
    "version": "3.12.0",
    "files": [{ "name": "main.py", "content": "import math\nn = int(input())\nprint(math.perm(n, 5))" }],
    "stdin": "5" 
  }'                  

  {"run":
  { 
    "signal":null,
    "stdout":"120\n",
    "stderr":"",
    "code":0,
    "output":"120\n",
    "memory":null,
    "message":null,
    "status":null,
    "cpu_time":55,
    "wall_time":147
  },
  "language":"python",
  "version":"3.12.0"
}
*/

/*
// ==================== Curl javascript (Issue with external library)

curl -X POST http://localhost:2000/api/v2/execute \
  -H "Content-Type: application/json" \
  -d '{
    "language": "javascript",
    "version": "20.11.1",
    "files": [
      { "name": "main.js", 
      "content": "const prompt = require('prompt-sync')();\nlet n = parseInt(prompt());\nlet res = 1;\nfor (let i = 0; i < 5; i++) {\n    res *= (n - i);\n}\nconsole.log(res);" 
    }],
    "stdin": "5" 
  }'


{"run":
  {
    "signal":null,
    "stdout":"",
    "stderr":"/box/submission/main.js:1\nconst prompt = require(prompt-sync)();\n                       ^\n\nReferenceError: Cannot access 'prompt' before initialization\n    at Object.<anonymous> (/box/submission/main.js:1:24)\n
*/

/*
// ==================== Curl java

curl -X POST http://localhost:2000/api/v2/execute   -H "Content-Type: application/json"   -d '{
    "language": "java",
    "version": "15.0.2",
    "files": [
      {
        "name": "Main.java",
        "content": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int res = 1;\n        for (int i = 0; i < 5; i++) {\n            res *= (n - i);\n        }\n        System.out.println(res);\n    }\n}"
      }
    ],
    "stdin": "5" 
  }'

{"run":
  {
    "signal":null,
    "stdout":"120\n",
    "stderr":"",
    "code":0,
    "output":"120\n",
    "memory":null,
    "message":null,
    "status":null,
    "cpu_time":1012.9999999999999,
    "wall_time":660
  },
    "language":"java",
    "version":"15.0.2"
}       

*/
