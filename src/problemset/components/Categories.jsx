import React from "react";

const Categories = ({ categories, onCategorySelect }) => {
  // Map difficulty values to display names
  const difficultyDisplayNames = {
    "EASY": "Easy",
    "MEDIUM": "Medium",
    "MEDIUM_HARD": "Medium Hard",
    "HARD": "Hard",
    "VERY_HARD": "Very Hard"
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Problem Difficulty</h2>
      
      {Object.entries(categories).map(([category, difficulties]) => (
        <div key={category} className="mb-4">
          <ul className="space-y-2">
            {difficulties.map((difficulty) => (
              <li 
                key={difficulty}
                className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer p-2 hover:bg-gray-50 rounded"
                onClick={() => onCategorySelect(category, difficulty)}
              >
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  difficulty === 'EASY' ? 'bg-green-500' :
                  difficulty === 'MEDIUM' ? 'bg-yellow-500' :
                  difficulty === 'MEDIUM_HARD' ? 'bg-orange-500' :
                  difficulty === 'HARD' ? 'bg-red-500' :
                  'bg-purple-500'
                }`}></span>
                {difficultyDisplayNames[difficulty] || difficulty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Categories;