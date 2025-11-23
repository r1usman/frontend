import React, { useState } from "react";
import {languageConfig} from "../../../Utility/Helper"  

const IntroHeader = ({ language }) => {  
  const [fetchlangauage, setfetchlangauage] = useState(language=="C++" ? "C": language)

  
  const content = languageConfig[fetchlangauage] || languageConfig["default"];

  return (
    <div
      className={`
        relative
        min-w-[280px] sm:min-w-[340px] min-h-[300px]
        rounded-xl overflow-hidden shadow-xl
        bg-sky-600
        text-white
        flex-shrink-0
        p-4
      `}
    >
      <div className="absolute size-96 rounded-full -right-10 top-5 bg-white/30"></div>

      <div className="absolute right-6 top-16 z-0">
        {content.image && <img src={content.image} className="size-64" alt="" />}
      </div>

      <div className="max-w-xl translate-y-10 translate-x-5 relative z-10">
        <h3 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
          {content.title}
        </h3>

        <p className="text-lg md:text-xl mb-2 max-w-3xl">
          {content.description}
        </p>

        <button
          className="
            mt-6 bg-white/20 text-white
            font-medium px-5 py-2 rounded-md
            shadow 
            backdrop-blur-sm
            transition hover:bg-white/30
          "
        >
          {content.button}
        </button>
      </div>
    </div>
  );
};

export default IntroHeader;
