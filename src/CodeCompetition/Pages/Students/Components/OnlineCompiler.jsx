import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import OutputSection from './OutputSection';
import InputSection from './InputSection';
import { runCode } from '../utils/codeExecution';
import { Check, Play, Info, RefreshCw, LogOut, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import RenderFrom from '../../Instructor/RenderForm/RenderFrom';
import AxiosInstance from "../../../../Utility/AxiosInstances"
import { API_PATH} from '../../../../Utility/ApiPath';
import {useNavigate} from 'react-router-dom'
import { boilerplates } from '../../../../Utility/BoilerPlate';
import Modal from '../../../Layouts/Modal';



const OnlineCompiler = ({CompetitonDetail , ActualSubmissionData}) => { 
  const navigator = useNavigate();
  const [code, setCode] = 
    useState(`
      #include <iostream>
        using namespace std;

        int main() {
            
            return 0;
        }`);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [languageId, setLanguageId] = useState(63);
  const [languageLabel, setLanguageLabel] = useState("C++");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle'); 
  const [timeLeft, setTimeLeft] = useState(null);
  const [cheatCount, setCheatCount] = useState(0);
  const [isSubmitting, setisSubmitting] = useState(false)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const [SubmissionForm, setSubmissionForm] = useState({})
  
  
  const [ConfirmSubmission, setConfirmSubmission] = useState(false)

  console.log("CompetitonDetail",CompetitonDetail);


  useEffect(()=>{
    if(ActualSubmissionData)
      setSubmissionForm(ActualSubmissionData)
  },[CompetitonDetail])
  
  useEffect(() => {
  if (CompetitonDetail.testCases) {
    setSubmissionForm(prev => ({
      ...prev,
      language : CompetitonDetail.defaultBoilercode.language ,
      defaultBoilercode : {
        language : CompetitonDetail.defaultBoilercode.language,
        inputType :  CompetitonDetail.defaultBoilercode.inputType,
        outputType :  CompetitonDetail.defaultBoilercode.outputType

      },
      testCases: [...CompetitonDetail?.testCases] || prev?.testCases
    }));
    setLanguageLabel(CompetitonDetail.defaultBoilercode.language)
  }
}, [CompetitonDetail]);

console.log("SubmissionForm",SubmissionForm);


  const updateSection = (key , value)=>{
    setSubmissionForm((prev)=>({
      ...prev,
      [key]: value
    }))
  }


const handleSubmit = async()=>{
  try {
    setisSubmitting(true)
    setConfirmSubmission(false)
    const response = await AxiosInstance.put(API_PATH.CODE.UPDATE(SubmissionForm?._id) , SubmissionForm);
    if(response)
    {
      navigator("/Student/Competition/Dashboard")
      toast.success("Submission Successfully");
    }

  } catch (error) {
    setisSubmitting(false)
    toast.error("Issue")
    console.log(error); 
  }
  finally{
    setisSubmitting(false)
  }
}







  const setBoilerCode = () => {
  if (!CompetitonDetail) return;

  const lang = CompetitonDetail.defaultBoilercode.language;
  const template = boilerplates[lang];

  if (typeof template === 'function') {
    setCode(template(CompetitonDetail));
  } else {
    setCode(template);
  }
};


  const handleLanguageChange = (id, label) => {
    
    setLanguageId(id);
    setLanguageLabel(label);
    setBoilerCode(label);
  };  

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setStatus('running');
      setOutput('Running code...');

      const result = await runCode(code, input, languageId);

      setOutput(result);
      setStatus(result.includes('Error') ? 'error' : 'success');
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

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

const handleCheating = () => {
    setCheatCount((prev) => {
      const newcount = (prev + 1);
      if (newcount === 2) {

        setSubmissionForm((prev)=>(
          {
            ...prev,
            result : "Eliminated"
          }
        ))
        
      } else {
        alert(`Warning ${newcount}/2: Leaving the competition screen is not allowed. One more violation will result in disqualification.`);
      }

      return newcount;
    });
  };


useEffect(() => {
  if (SubmissionForm.result === "Eliminated") {
    handleSubmit();
  }
}, [SubmissionForm]);


const handleConfirmation = ()=>{
  setConfirmSubmission(true)
}



// useEffect(() => {
//   const handleVisibilityChange = () => {
//     if (document.visibilityState === "hidden") {
//       handleCheating();
//     }
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);
  

//   return () => {
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
    
//   };
// }, []);


// useEffect(() => {
//   const handleBeforeUnload = (event) => {
//     event.preventDefault();
//     alert("Are you sure you want to leave? Your progress will be lost.")

//   };

//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, []);

// useEffect(() => {
//   const handleBackButton = (event) => {
//     event.preventDefault();
//     window.history.pushState(null, '', window.location.href);
//     alert(" You cannot go back during the contest.");
//     handleCheating();
//   };

//   window.history.pushState(null, '', window.location.href);
//   window.addEventListener('popstate', handleBackButton);

//   return () => {
//     window.removeEventListener('popstate', handleBackButton);
//   };
// }, []);




useEffect(() => {
  if (CompetitonDetail?.duration) {
    setTimeLeft(CompetitonDetail.duration *60); 
  }
}, [CompetitonDetail]);

useEffect(() => {
  if (timeLeft === null) return; 

  if (timeLeft <= 0) {
      setSubmissionForm((prev)=>(
            {
              ...prev,
              result : "Eliminated"
            }
          ))
      
  }

  const timer = setInterval(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);
  return (
    <>
      <div className="font-urbanist grid grid-cols-1 md:grid-cols-2 gap-2 px-3">
        
        <div className="col-span-1">
          <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4 mt-4">
            <LanguageSelector 
            selectedLanguageId={languageId} 
            onLanguageChange={handleLanguageChange}
            updateSection= {updateSection}
            
            
            />
            <h2 className="text-lg  font-semibold text-gray-900">Code Ascends Compiler</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRunClick}
                disabled={isRunning }
                className={`
                    btn-small-light
                  ${isRunning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 
                    status === 'success' ? 'bg-green-600 ' :
                    status === 'error' ? 'bg-red-600' :
                    `focus:outline-none focus:ring-0 ${code.trim()=="" ?NocodeNoServer:""}`}
                `}
              >
                {code.trim()=="" ? NocodeNoServer:""}
                {renderStatusIcon()}
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <CodeEditor 
              code={code} 
              setCode={(Value)=>{
                setCode(Value),
                setSubmissionForm((prev)=>({
                  ...prev,
                  code : Value
                }))
              }} 
              language={languageLabel.toLowerCase()} 
            />
          </div>
        </div>
         <div className="col-span-1 bg-white ">
              
              {/* Header */}
              <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4 mt-4">
                <h1 className='className="text-lg  font-semibold text-gray-900"'>
                  {CompetitonDetail.Question}
                </h1>
                <div className='flex gap-4'>
                  <button className="btn-small-light  ">
                    <span className=' min-w-10'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span> Remaining 
                  </button>
                  <button className='btn-small' onClick={handleConfirmation} >
                    {isSubmitting ? "Submitting...": "Submit"}
                  </button>
                </div>
              </div>
              {/* ProblemSummary */}
              <div className='bg-white rounded-lg border border-purple-100  overflow-y-scroll overflow-x-hidden'>
                  <div className='h-[90vh]'>
                    <RenderFrom data={CompetitonDetail} containerWidth={600} status={"Student"}/>
                  </div>
              </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-3 mt-3 mb-2">
          <div className='col-span-1'><InputSection input={input} setInput={setInput} /></div>
          <div className='col-span-1'><OutputSection output={output} status={status} /></div>
        </div>
      <Modal
  onClose={() => setConfirmSubmission((prev) => !prev)}
  isOpen={ConfirmSubmission}
  type={"small"}
  title={"Submit Solution"}
>
  <div>
    <div className="font-urbanist text-black px-6 space-y-5">
      <div className="space-y-3">
        <div className="flex items-center gap-3 mt-2">
     
          <Upload className="size-6 text-yellow-500" /> 
          <h3 className="text-lg font-semibold text-black">
            Confirm Submission
          </h3>
        </div>
        <p className="text-md text-center">
          Are you sure you want to{" "}
          <span className="font-semibold text-yellow-600">submit</span> your
          solution?
        </p>
        <p className="text-xs text-slate-700 mt-[5px]">
          Once submitted, you may not be able to edit or resubmit before the
          competition ends.
        </p>
      </div>

      <div className="flex w-full items-center justify-center gap-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
        >
          Yes, Submit
        </button>
      </div>
    </div>
  </div>
</Modal>

    </>
  );
};

export default OnlineCompiler;
