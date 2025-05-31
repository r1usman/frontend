import React, { useState } from "react";

const Topics = ({ topics, onTopicSelect }) => {
  const [visibleCount, setVisibleCount] = useState(20); // Initial number of tags to show
  const loadMoreCount = 20; // Number of additional tags to load

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + loadMoreCount);
  };

  const visibleTopics = topics.slice(0, visibleCount);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Topics</h2>
      <div className="flex flex-wrap gap-2">
        {visibleTopics.map((tag, index) => (
          <span
            key={index}
            onClick={() => onTopicSelect(tag)}
            className="px-3 py-1 text-sm font-medium bg-[#14BF96] bg-opacity-20 text-white rounded-full cursor-pointer hover:bg-opacity-30 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {visibleCount < topics.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 w-full py-2 px-4 border border-[#14BF96] text-[#14BF96] rounded-full hover:bg-[#14BF96] hover:text-white hover:bg-opacity-10 transition-colors flex items-center justify-center"
        >
          <span>Load More</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Topics;