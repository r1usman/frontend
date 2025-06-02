import React from "react";

const Leaderboard = ({ title, entries }) => {
  return (
    <div className="h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
            <div className="flex items-center">
              <span className="font-bold text-gray-700 mr-2">#{entry.rank}</span>
              <span className="font-medium truncate">{entry.username}</span>
            </div>
            <span className="text-[#5737F6] font-medium">{entry.points}pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;