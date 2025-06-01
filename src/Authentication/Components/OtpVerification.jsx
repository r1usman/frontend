import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

const OtpVerification = ({otp , setOtp ,handelRequest, CheckOtpTOSumbit}) => {
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Here");
    CheckOtpTOSumbit()
    handelRequest()
  };
  const handleChange = (value) => {
  const filtered = value.replace(/\D/g, '');
  setOtp(filtered);
};


  return (
    <div className="max-w-md mx-auto text-center bg-white text-black px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 4-digit verification code that was sent to your Email.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6 text-black">
          <OtpInput
  value={otp}
  onChange={handleChange}
  numInputs={4}
  isInputNum
  shouldAutoFocus
  renderInput={(props) => (
  <input
    {...props}
    style={{
      width: '3rem',
      height: '3rem',
      margin: '0 0.5rem',
      fontSize: '2rem',
      borderRadius: 4,
      border: '1px solid lightgray',
      textAlign: 'center',      
      padding: 0,                
      display: 'flex',           
      alignItems: 'center',      
      justifyContent: 'center',
      boxSizing: 'border-box',  
      outline: 'none',           
      textDecorationColor:"black"
    }}
    onKeyDown={(e) => {
      if (
        e.key === 'Backspace' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Tab'
      ) {
        return;
      }
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    }}
  />
)}

/>

        </div>

        <div className="max-w-[260px] mx-auto">
          <button
            type="submit"
            disabled={otp.length !== 4}
            className={`w-full inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow transition-colors duration-150 ${
              otp.length === 4 ? 'bg-text_primary hover:bg-text_primary focus:ring focus:ring-text_primary' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Verify Account
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default OtpVerification;
