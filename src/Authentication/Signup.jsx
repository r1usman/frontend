import React, {  useEffect, useState } from 'react';
import { Eye, EyeOff, LogIn, Upload } from 'lucide-react';
import { validateEmail } from './AuthAssest/valideEmail';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import PhotoSelector from './Components/PhotoSelector';
import CustomDiv from './Components/RightBar.jsx/CustomDiv';
import PasswordStrength from './Components/PasswordStrength';
import UploadImage from './Components/UploadImage';
import { isExists, set } from 'date-fns';

const SignUp = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('')
  const [PassStatus, setPassStatus] = useState('')
  const [ConfirmPass, setConfirmPass] = useState('')
  const [role, setrole] = useState("")
  console.log("role",role);
  
 

  const [error, seterror] = useState('');
  const [hide, sethide] = useState(true); 
  const [ProfilePic, setProfilePic] = useState("")
  
  
  const navigate = useNavigate();

    const sendData = async()=>{
      console.log("here");
      
      try {
        const uploadImage = await UploadImage(ProfilePic);
      
      
        const profileImageUrl = uploadImage.Image || "";

        // console.log("image", profileImageUrl);

        const response = await axios.post("http://localhost:3000/api/Auth/VerifyEmail",{  email })
        console.log("email ",response.data.isExist);

        if(response.data.isExist == false)
        {
            navigate("/otp", {
              state: {
                name,
                email,
                password,
                profileImageUrl,
                role
              }
          });
        }
        
        

      //

        //
      } catch (error) {
        console.log("Error",error);
        console.log(error.response.data.Message);
        seterror(error.response.data.Message)
        
        
      }
      
      
      
      
    }

  const handelRequest = async (e) => {
    e.preventDefault();

    if(ConfirmPass !== password)
    {
      seterror("Password didnt match !")
      return 
    }

    if(!name)
    {
      seterror("Please Enter Your Name")
      return;
    }
    if(name.length >=50)
    {
      seterror("Name cannot be longer than 50 characters.")
      return;
    }

    if(!email)
      {
        seterror("Please Enter the email")
        return;
      }

    if(!validateEmail(email) )
    {
      seterror("Please Enter valid email")
      return;
    }
    if(!password)
      {
        seterror("Please Enter the Password")
        return;
      }
     if(PassStatus !=='strong')
      {
        seterror("Strong Password is Required")
        return;
      }
      if(!ProfilePic)
      {
        seterror("Image is Not Selected")
        return;

      }
      if(!role)
      {
        seterror("Select the role")
        return;

      }
     
      
    
    seterror("")
    sendData()

  };
  useEffect(()=>{
    setTimeout(() => {
        seterror("")
    }, 5000);
  },[error])

  const ToggleHide = (e) => {
    e.preventDefault(); 
    sethide((prev) => !prev);
  };

  // console.log(ProfilePic , "ProfilePic");
  

  return (
    <>
      <div className='relative h-screen overflow-hidden flex flex-row font-poppins bg-[#FAFAFA] text-black'>
        <div className='w-[60%] flex flex-col space-y-3   h-screen py-5 px-16'>
          <h1 className='font-semibold text-2xl '>Code Ascend</h1>
          <div className='flex flex-col justify-center  h-full'>
            <div className='flex flex-col  py-2 gap-3'>
              <div className='space-y-1'>
                <h1 className='font-semibold text-2xl'>Create an Account</h1>
                <p className='text-xs font-semibold '>Join us today by entering your details below.</p>
              </div>
              <form className='flex flex-col gap-3'>
                <PhotoSelector image= {ProfilePic} setimage= {setProfilePic } />
                <div className='space-y-4'>
                  <div className='flex gap-5 w-full  px-5'>
                    <div className='flex flex-col space-y-2 w-full'>
                      <label htmlFor='' className='font-semibold'>
                        Full Name
                      </label>
                      <input
                        className=' p-2 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-[4px] placeholder:text-slate-700'
                        type='text'
                        value={name}
                        placeholder='John'
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col w-full space-y-2'>
                      <label htmlFor='' className='font-semibold'>
                        Email
                      </label>
                      <input
                        className='w-full p-2 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-[4px] placeholder:text-slate-700'
                        type='text'
                        value={email}
                        placeholder='john@gmail.com'
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>

                  </div>
                  <div className='flex gap-5 items-center w-full  px-5 '>
                    
                     <PasswordStrength  password={password} placeholder={"Password"} setpassword={setpassword} hide={hide} ToggleHide={ToggleHide} setPassStatus={setPassStatus}/>
                    <div className='flex flex-col w-full space-y-2   min-h-[104px]'>
                        <label htmlFor='' className='font-semibold'>
                          Confirm Password
                        </label>
                        <input
                          className='w-full p-2 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-[4px] placeholder:text-slate-700'
                          type='text'
                          value={ConfirmPass}
                          placeholder='Confirm Password'
                          onChange={(e)=>setConfirmPass(e.target.value)}
                        />
                      </div>

                  </div>
                  <div className='flex items-center gap-5 w-full  px-5 ' >
                    <div className='flex flex-col space-y-2    w-1/2'>
                        <label htmlFor='' className='font-semibold'>
                          Select Role
                        </label>
                        <select
                          onChange={(e) => setrole(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-md outline-none focus:ring-0 transition duration-150 ease-in-out"
                          name="role"
                          id="role"
                        >
                          <option value="student" className="bg-slate-100 text-slate-700">
                            Student
                          </option>
                          <option value="instructor" className="bg-slate-100 text-slate-700">
                            Instructor
                          </option>
                        </select>

                        
                      </div>
                      <button className='w-1/2 translate-y-4 focus:outline-none ring-0 hover:bg-text_primary hover:opacity-75  transition-all ease-in duration-150 bg-[linear-gradient(90deg,_#5D3EFF,_#C936EF)] py-2  text-white uppercase tracking-wider rounded-[4px] font-semibold text-sm' onClick={handelRequest}>Sign UP</button>

                  </div>
                  
                </div>
               
              </form>
              <p className='text-xs text-red-600 px-5  '>{error}</p>

              <p className='text-xs px-5'>
                Alreday have an account? <span className='underline text-task_primary cursor-pointer' onClick={()=>navigate("/Login")}>Login</span>
              </p>
            </div>
          </div>
        </div>

        <div className='w-[40%] relative rotate-12 overflow-hidden translate-x-10 -translate-y-10 bg-[#822cce] h-[120vh] flex items-center justify-center'>
         <CustomDiv/>
         </div>
        <div className='absolute size-96 scale-150 rounded-3xl bg-purple-800 right-32 -top-96 -translate-y-16 -rotate-12 z-30'></div>
        <div className='absolute size-96 scale-150 rounded-3xl -translate-x-48 bg-purple-800 right-32 -bottom-96 translate-y-8 -rotate-12 z-30'></div>

      </div>
    </>
  );
};

export default SignUp;
