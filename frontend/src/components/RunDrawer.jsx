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
    <div className="max-w-md mx-auto flex flex-col h-full ">
      <h1 className="text-2xl mb-2">Run Code</h1> 

      <h3 className="text-lg font-semibold text-white mt-9  mb-2">Select Language</h3>
      <div className="mb-5 relative">
        <select
          className="w-full p-3 pr-10 rounded-xl border border-gray-800 bg-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500  text-sm text-stone-50"
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

      <h3 className="text-lg font-semibold text-white mb-2">Input</h3>
      <textarea
        className="w-full p-3 rounded-xl border border-gray-800 bg-slate-600 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 mb-4"
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input for the code..."
      />

      <button
        onClick={runCode}
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
      >Run Code
      </button>





      <div className="mt-6">
  <h3 className="text-lg font-semibold text-white mb-2">Output</h3>
  <textarea
    className="w-full p-3 rounded-xl border border-gray-800 bg-slate-600 text-sm text-white shadow-sm focus:outline-none cursor-default"
    rows="4"
    value={output || 'No output yet...'}
    readOnly
  />
</div>


 

    </div>
  );
};

export default RunDrawer;
