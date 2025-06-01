import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { validateEmail } from './AuthAssest/valideEmail';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BoxAnimation from '../assests/Animation/BoxAnimation';
import CustomDiv from './Components/RightBar.jsx/CustomDiv';
import OAuth from './OAuth';
import { UserContext } from '../GlobalContextApi/User';
import OtpVerification from './Components/OtpVerification';
import { set } from 'date-fns';
const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setform] = useState(null)
  const [ServerOtp, setServerOtp] = useState(null)
  const [otp, setOtp] = useState('');
  const [error, seterror] = useState('');
  console.log("form" , form);
  

  console.log("User Typing OTP",otp);
  
  

  

   useEffect(() => {

    if(!location.state)
    {
      navigate("/Signup")
    }
    setform(location.state)

    const GetOTP = async()=>{
      try {
        const email = location.state.email;
        const response = await axios.post("http://localhost:3000/api/Auth/OtpGenerator" ,{email})
        console.log(response.data.OTP);
        setServerOtp(response.data.OTP)
      
      } catch (error) {
        console.log(error);
        
      }
    }
    GetOTP()

    


  }, [location]);
  const sendData = async()=>{
    try {
      const name = form.name
      const email = form.email
      const password = form.password
      const profileImageUrl = form.profileImageUrl
       const response = await axios.post("http://localhost:3000/api/Auth/register",{
          name,
          email,
          password,
          profileImageUrl,
        })
        console.log(response);
        
        console.log(response.data.Message);
        const User = response.data.User
        console.log(User);
        if(User)
        {
          navigate("/dashboard")
        }
      
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

  const CheckOtpTOSumbit = ()=>{
    console.log("hello");
    console.log(ServerOtp);
    
    if(otp!=ServerOtp)
    {
      seterror("Invalid Otp")
      return
    }
    sendData()
    
  }
//   const handelRequest = async () => {
//   e.preventDefault();

//   console.log("Here1");

//   if (otp.length !== 4) {
//     seterror("OTP must be 4 digits");
//     return;
//   }


//   if (otp !== ServerOtp) {
//     seterror("Invalid OTP");
//     return;
//   }

  
//   seterror('');

  
//   sendData();
// };


  useEffect(() => {
    setTimeout(() => {
      seterror('');
    }, 5000);
  }, [error]);

  return (
    <>
      <div className="relative flex h-screen flex-row overflow-hidden bg-dark-bg-secondary2 font-poppins text-white">
        <div className="relative flex h-screen w-[60%] flex-col  overflow-hidden py-10 pl-16">
          <div className="absolute inset-0 z-0 ">
            <BoxAnimation />
          </div>

          <h1 className="text-2xl font-semibold">Code Ascend</h1>
          <div className="relative z-20 flex h-full flex-col  justify-center">
            <div className="flex flex-col gap-5">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Verify Your Identity</h1>
                <p className="text-xs font-semibold">
                  Enter the 4-digit OTP sent to your email to complete the signup
                </p>
              </div>
              
              <OtpVerification otp={otp}  setOtp={setOtp}  CheckOtpTOSumbit={CheckOtpTOSumbit}/>
              <p className='text-xs text-red-600 px-5  '>{error}</p>
            </div>
          </div>
        </div>

        <div className="relative flex h-[120vh] w-[40%] -translate-y-10 translate-x-10 rotate-12 items-center justify-center overflow-hidden bg-[#E54E02]">
          <CustomDiv />
        </div>
        <div className="absolute -top-96 right-32 z-30 size-96 -translate-y-16 -rotate-12 scale-150 rounded-3xl bg-dark-bg-secondary1"></div>
        <div className="absolute -bottom-96 right-32 z-30 size-96 -translate-x-48 translate-y-8 -rotate-12 scale-150 rounded-3xl bg-dark-bg-secondary1"></div>
      </div>
    </>
  );
};

export default OTP;
