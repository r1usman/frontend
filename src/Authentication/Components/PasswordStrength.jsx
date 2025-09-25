import { Bell, Eye, EyeOff, Lightbulb } from 'lucide-react'
import React, { useState } from 'react'

const PasswordStrength = ({password , placeholder, setpassword , ToggleHide ,hide ,setPassStatus}) => {

    const [Message, setMessage] = useState("")
    const [Progress, setProgress] = useState("")
    const [hiddenMsg, sethiddenMsg] = useState(false)


    const handleChanges = (e) => {
    const pass = e.target.value;
    setpassword(pass);

    // const stats = {
    //   length: pass.length >= 8,
    //   hasUpperCase: /[A-Z]/.test(pass),
    //   hasLowerCase: /[a-z]/.test(pass),
    //   hasDigit: /[0-9]/.test(pass),
    //   hasSpecialChar: /[^A-Za-z0-9]/.test(pass),
    // };

    // const score = Object.values(stats).filter((item)=>item).length;
    // console.log(score);
    

    // let strength = score === 5 ? "strong" : score >= 3 ? "Medium" : "weak";
    // setMessage(strength);
    // setProgress(`${(score / 5) * 100}%`);
    // setPassStatus(strength);

    // console.log(stats);
  };

  const getActiveColor = () => {
    if (Message === "strong") return "#3fbb60"; // Green
    if (Message === "Medium") return "#fe804d"; // Orange
    return "#ff0000"; // Red
  };

  const HandleMessage=()=>{
    sethiddenMsg(true)
    
  }
  const HandleMessageLeave=()=>{
    sethiddenMsg(false)
    
  }
  return (
     <div className='w-full space-y-2  min-h-[104px]' >
        <div className='relative flex items-center justify-between'>
            <label className='font-semibold' >Password</label>
            <span><Lightbulb className='hover:text-purple-800 ' onMouseEnter={HandleMessage} onMouseLeave={HandleMessageLeave}/></span>
            {
                hiddenMsg && (
                    <p className="absolute right-0 -top-32 px-3 py-2 bg-white text-black p-2 rounded shadow-md w-max">
                      <strong>Password must include:</strong>
                      <ul className="list-disc list-inside text-sm mt-1">
                        <li>At least 8 characters</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one digit</li>
                      </ul>
                    </p>

                )
            }
        </div>
        <div className='relative w-full  flex items-center'>
            <div className='relative w-full  flex items-center'>
                <input
                className='w-full p-2 pr-10 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200  rounded-[4px] placeholder:text-slate-700'
                type={hide ? 'password' : 'text'}
                value={password}
                placeholder={placeholder}
                onChange={handleChanges}
                />
                <div
                    className="absolute -bottom-0.5 left-0 h-1 transition-all duration-300 rounded-b"
                    style={{
                    width: Progress,
                    backgroundColor: getActiveColor(),
                    }}
                ></div>
            </div>
            <button onClick={ToggleHide} className='absolute text-text_primary right-2 top-1/2 -translate-y-1/2'>
            {hide ? <EyeOff className='text-Pro5-primary' /> : <Eye className='text-Pro5-primary' />}
            </button>
        </div>
        {Message && <p className="text-sm font-medium">Your Password is  <span style={{ color: getActiveColor() }}>{Message}</span></p>}

    </div>
  )
}

export default PasswordStrength