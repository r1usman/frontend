import React, { useContext, useEffect, useState } from 'react';

import { validateEmail } from './AuthAssest/valideEmail';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BoxAnimation from '../assests/Animation/BoxAnimation';
import CustomDiv from './Components/RightBar.jsx/CustomDiv';

// import { UserContext } from '../GlobalContextApi/User';

const ForgetPassword = () => {
  const [email, setemail] = useState('');
  const [error, seterror] = useState('');
  const [User, setUser] = useState(null)

  const navigate = useNavigate();

  const sendData = async()=>{
    try {

      const result = await axios.post(
        "http://localhost:3000/api/Auth/ForgetPassword",
        { email },
        { withCredentials: true }
    );
      console.log("result", result.data);
      seterror(result.data.message)
      setUser(result.data.user)

    } catch (error) {
      if (error.response) {
          console.log("Error Status:", error.response.status); 
          console.log("Error Data:", error.response.data);     

    
          seterror(error.response.data.message || "Unauthorized Access");
      } else if (error.request) {
          console.log("No response received:", error.request);
          seterror("Server is not responding.");
      } else {
          console.log("Request error:", error.message);
          seterror("An unexpected error occurred.");
      }
  }

  }

  const handelRequest = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      seterror('Please Enter valid email');
      return;
    }
    
    seterror('');
    
    
  };

  useEffect(() => {
    if(User)
    {
        setTimeout(() => {
        seterror('');
      }, 10000);
    }
    setTimeout(() => {
      seterror('');
    }, 5000);
    
  }, [error]);

 


  return (
    <>
      <div className="relative flex h-screen flex-row overflow-hidden bg-[#FAFAFA] font-poppins text-black">
        <div className="relative flex h-screen w-[60%] flex-col  overflow-hidden py-10 pl-16">
          <div className="absolute inset-0 z-0 ">
            <BoxAnimation />
          </div>

         
          <div className="relative z-20 flex h-full flex-col  justify-center">
             <h1 className="text-2xl font-semibold mb-10">Code Ascend</h1>
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Forgot Your Password?</h1>
                <p className="text-xs font-semibold">
                  Please enter your email address below to receive a password reset link.
                </p>
              </div>
              <form  className="flex flex-col gap-2">
                <div className="flex flex-col space-y-2 ">
                  <label htmlFor="" className="font-semibold">
                    Email
                  </label>
                  <input
                    className="w-[60%]  rounded-[4px] border border-slate-200 bg-slate-100 p-2 text-slate-700 placeholder:text-slate-700 focus:outline-none"
                    type="text"
                    value={email}
                    placeholder="john@gmail.com"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
               
               
                <button
                  className="w-[60%] rounded-[4px] bg-[linear-gradient(90deg,_#5D3EFF,_#C936EF)] py-2 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-150 ease-in hover:bg-text_primary hover:opacity-70"
                  onClick={handelRequest}
                >
                  Send Email
                </button>
              </form>
              <p className={`text-xs ${User ?"text-green-500":"text-red-600"}`}>{error}</p>
            
                <p className="text-xs">
                
                <span
                  className="text-task_primary cursor-pointer underline"
                  onClick={() => navigate('/Login')}
                >
                  Back to Login 
                </span>
              </p>

            </div>
          </div>
        </div>
         <div className="relative flex h-[120vh] w-[40%] -translate-y-10 translate-x-10 rotate-12 items-center justify-center overflow-hidden bg-[#822cce]">
          <CustomDiv />
        </div>
        <div className="absolute -top-96 right-32 z-30 size-96 -translate-y-16 -rotate-12 scale-150 rounded-3xl bg-purple-800"></div>
        <div className="absolute -bottom-96 right-32 z-30 size-96 -translate-x-48 translate-y-8 -rotate-12 scale-150 rounded-3xl bg-purple-800"></div>
      

        </div>
    </>
  );
};

export default ForgetPassword;
