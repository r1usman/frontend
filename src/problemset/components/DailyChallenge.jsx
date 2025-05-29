import React from "react";

const DailyChallenge = ({ challengeTitle, challengeDescription, buttonText }) => {
  return (
    <a href="#" className="h-full flex flex-col border border-gray-200 p-4 rounded-lg hover:shadow-md transition duration-200 group">
      <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#14BF96]">{challengeTitle}</h2>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{challengeDescription}</p>
      <span className="mt-auto bg-[#14BF96] hover:bg-[#129f7f] text-white text-sm font-medium py-2 px-4 rounded transition duration-200 text-center w-full block">
        {buttonText}
      </span>
    </a>
  );
};

export default DailyChallenge;
