import React, { useState } from 'react';
import { Send, Lightbulb } from 'lucide-react';

interface QueryFormProps {
  onSubmitQuery: (text: string) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmitQuery }) => {
  const [queryText, setQueryText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    "Could you explain the concept again?",
    "What's the difference between X and Y?",
    "Can you provide a real-world example?",
    "How does this relate to what we learned before?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryText.trim()) {
      onSubmitQuery(queryText);
      setQueryText('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQueryText(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-800 mb-3">Ask a Question</h3>
      
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Type your question here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none transition"
          rows={3}
        />
        
        {showSuggestions && !queryText && (
          <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
            <div className="flex items-center text-xs text-gray-600 mb-2">
              <Lightbulb className="h-3 w-3 mr-1 text-yellow-500" />
              Question suggestions:
            </div>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left text-xs p-1.5 hover:bg-indigo-50 rounded transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={!queryText.trim()}
            className={`px-4 py-2 rounded-md flex items-center text-sm font-medium ${
              queryText.trim() 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4 mr-1" />
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryForm;