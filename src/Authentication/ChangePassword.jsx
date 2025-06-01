import React, {  useEffect, useState } from 'react';
import { Eye, EyeOff, LogIn, Upload } from 'lucide-react';
import axios from 'axios';
import {useNavigate ,useLocation} from "react-router-dom"

import CustomDiv from './Components/RightBar.jsx/CustomDiv';
import PasswordStrength from './Components/PasswordStrength';


const ChangePassword = () => {

const [password, setpassword] = useState('');
const [PassStatus, setPassStatus] = useState('')
const [ConfirmPass, setConfirmPass] = useState('')
const [User, setUser] = useState(null)





const [error, seterror] = useState('');
const [hide, sethide] = useState(true); 


const location = useLocation();
const navigate = useNavigate();

const queryParams = new URLSearchParams(location.search);
const token = queryParams.get('token');
console.log(token);



useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
    }
    

  }, [token, navigate]);

useEffect(()=>{
    if(token)
    {
        console.log("Work");
        
        const getUserDetail = async()=>{
        const result = await axios.post("http://localhost:3000/api/Auth/TokenExtract" , {token})
        console.log(result.data);
        setUser(result.data.user)
        
        }   
        getUserDetail()
    }
    
},[])



const sendData = async()=>{
    try {
        const email = User.email
        const response = await axios.post("http://localhost:3000/api/Auth/ChangePassword",{

          email,
          password,
    
        })
        console.log(response);
        
        console.log(response.data.message);
        if(response.data.redirect)
        {
            navigate("/")
        }

    } 
    catch (error) {
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




return (
<>
    <div className='relative h-screen overflow-hidden flex flex-row font-poppins bg-dark-bg-secondary2 text-white'>
    <div className='w-[60%] flex flex-col space-y-3   h-screen py-5 px-16'>
        
        <div className='flex flex-col justify-center  h-full'>
        <h1 className='font-semibold text-2xl mb-10
        '>Code Ascend</h1>
        <div className='flex flex-col  py-2 gap-3'>
            <div className='space-y-2'>
            <h1 className='font-semibold text-2xl'>Change Your Password</h1>
            <p className='text-xs font-semibold '>Secure your account by updating your password below.</p>
            </div>
            <form className='flex flex-col gap-3 '>
            <div className='space-y-6 '>
                
                <div className='flex gap-5 items-center w-full  px-4 mt-5 '>
                
                    <PasswordStrength  password={password} placeholder={"New Password"} setpassword={setpassword} hide={hide} ToggleHide={ToggleHide} setPassStatus={setPassStatus}/>
                <div className='flex flex-col w-full space-y-2   min-h-[104px]'>
                    <label htmlFor='' className='font-semibold'>
                        Confirm Password
                    </label>
                    <input
                        className='w-full p-2 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-[4px] placeholder:text-slate-700'
                        type='text'
                        value={ConfirmPass}
                        placeholder='Confirm New Password'
                        onChange={(e)=>setConfirmPass(e.target.value)}
                    />
                    </div>

                </div>
            </div>
            
            <button className='focus:outline-none ring-0 hover:bg-text_primary hover:opacity-75  transition-all ease-in duration-150 bg-text_primary py-2 mx-4 text-white uppercase tracking-wider rounded-[4px] font-semibold text-sm' onClick={handelRequest}>CHANGE PASSWORD</button>
            </form>
            <p className='text-xs text-red-600 px-5  '>{error}</p>

            <p className='text-xs px-5'>
            Alreday have an account? <span className='underline text-task_primary cursor-pointer' onClick={()=>navigate("/")}>Login</span>
            </p>
        </div>
        </div>
    </div>

    <div className='w-[40%] relative rotate-12 overflow-hidden translate-x-10 -translate-y-10 bg-[#E54E02] h-[120vh] flex items-center justify-center'>
        <CustomDiv/>
        </div>
    <div className='absolute size-96 scale-150 rounded-3xl bg-dark-bg-secondary1 right-32 -top-96 -translate-y-16 -rotate-12 z-30'></div>
    <div className='absolute size-96 scale-150 rounded-3xl -translate-x-48 bg-dark-bg-secondary1 right-32 -bottom-96 translate-y-8 -rotate-12 z-30'></div>

    </div>
</>
);
};

export default ChangePassword ;
