import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RunDrawer = ({ codeRef }) => {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://emkc.org/api/v2/piston/runtimes');
        setLanguages(response.data);
        if (response.data.length > 0) {
          setLanguage(response.data[0].language);
        }
      } catch (error) {
        console.error('Failed to fetch runtimes:', error);
      }
    };

    fetchLanguages();
  }, []);

  const runCode = async () => {
    try {
      const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
        language: language,
        version: '*',
        files: [
          {
            content: codeRef.current
          }
        ],
        stdin: input
      });

      setOutput(response.data.run.output);
    } catch (error) {
      console.error('Execution Error:', error);
      setOutput('Error executing code.');
    }
  };

  return (
<div className="max-w-md flex flex-col h-full px-4 sm:px-0 overflow-y-auto">
  {/* Run Code + Language */}
  <div className="flex flex-row justify-between items-center sm:flex-col sm:items-start sm:gap-5">
    <h1 className="text-2xl sm:text-2xl sm:mb-2">Run Code</h1>
    <div className="w-1/2 sm:w-full min-w-[140px]">
      <select
        className="w-full sm:mt-4 sm:mb-6 p-2 sm:p-3 pr-6 rounded-lg border border-gray-800 bg-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm text-stone-50"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.language + lang.version} value={lang.language}>
            {lang.language} ({lang.version})
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Input + Output */}
  <div className="flex flex-row gap-3 mt-4 sm:flex-col sm:gap-5">
    <div className="w-1/2 sm:w-full min-w-[140px]">
      <h3 className="text-sm font-semibold text-white mb-1 sm:text-lg sm:mb-2">Input</h3>
      <textarea
        className="w-full h-20 p-2 sm:p-3 rounded-xl border border-gray-800 bg-slate-600 text-xs sm:text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input..."
      />
    </div>

    <div className="w-1/2 sm:w-full min-w-[140px]">
      <h3 className="text-sm font-semibold text-white mb-1 sm:text-lg sm:mb-2">Output</h3>
      <textarea
        className="w-full h-20 p-2 sm:p-3 rounded-xl border border-gray-800 bg-slate-600 text-xs sm:text-sm text-white shadow-sm focus:outline-none cursor-default resize-none"
        value={output || 'No output yet...'}
        readOnly
      />
    </div>
  </div>

  {/* Run Button - always visible */}
<div className="sticky bottom-0 bg-gray-900 pt-2 mt-4 sm:static sm:bg-transparent sm:pt-0 sm:mt-28 outline-none ring-0 shadow-none border-none z-40">
    <button
      onClick={runCode}
      className="w-full bg-indigo-600 text-white font-semibold py-2 sm:py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
    >
      Run Code
    </button>
  </div>
</div>


  );
};

export default RunDrawer;
