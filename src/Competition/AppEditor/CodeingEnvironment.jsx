import React, { useState } from 'react'
import OnlineCompiler from './Components/OnlineCompiler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CodeingEnvironment = () => {
  const [problem, setproblem] = useState(null)
 return (
    <>
        <div className="min-h-screen bg-dark-bg-secondary4 rounded-[6px]  text-gray-300 px-6">
        <main className="max-w-6xl mx-auto">
          <OnlineCompiler />
        </main>
        
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className={"mt-20 mr-7 "}
      />

    </>
  );
  
}

export default CodeingEnvironment