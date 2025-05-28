import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface CourseOutcomesProps {
  outcomes: string[];
  updateOutcomes: (outcomes: string[]) => void;
}

const CourseOutcomes: React.FC<CourseOutcomesProps> = ({
  outcomes,
  updateOutcomes,
}) => {
  const [newOutcome, setNewOutcome] = useState("");

  const handleAddOutcome = () => {
    if (newOutcome.trim() === "") return;
    updateOutcomes([...outcomes, newOutcome.trim()]);
    setNewOutcome("");
  };

  const handleRemoveOutcome = (index: number) => {
    const updatedOutcomes = [...outcomes];
    updatedOutcomes.splice(index, 1);
    updateOutcomes(updatedOutcomes);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOutcome();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-medium text-gray-800">Learning Outcomes</h2>
        <p className="text-sm text-gray-500">What students will learn from this course</p>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex">
            <input
              type="text"
              value={newOutcome}
              onChange={(e) => setNewOutcome(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., Build complete applications with React"
            />
            <button
              type="button"
              onClick={handleAddOutcome}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="ml-1">Add</span>
            </button>
          </div>
        </div>
        
        <div>
          {outcomes.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No learning outcomes added yet</p>
          ) : (
            <ul className="space-y-2">
              {outcomes.map((outcome, index) => (
                <li 
                  key={index} 
                  className="flex items-center bg-gray-50 px-3 py-2 rounded-md group"
                >
                  <span className="flex-1 text-gray-800">{outcome}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOutcome(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOutcomes;