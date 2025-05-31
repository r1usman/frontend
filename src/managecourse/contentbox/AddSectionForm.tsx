import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddSectionFormProps {
  onAddSection: (title: string, details: string) => boolean;
}

const AddSectionForm: React.FC<AddSectionFormProps> = ({ onAddSection }) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionDetails, setNewSectionDetails] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = onAddSection(newSectionTitle, newSectionDetails);
    
    if (success) {
      setNewSectionTitle("");
      setNewSectionDetails("");
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 ease-in-out ${
      isFocused ? 'ring-2 ring-blue-200' : ''
    }`}>
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
          <Plus size={18} />
        </div>
        Create New Section
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="newSectionTitle"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Section Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="newSectionTitle"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="e.g., Introduction to Advanced Topics"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="newSectionDetails"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Section Details (Optional)
          </label>
          <input
            type="text"
            id="newSectionDetails"
            value={newSectionDetails}
            onChange={(e) => setNewSectionDetails(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="e.g., 10 lectures • 2hr 30min"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          Add Section
        </button>
      </form>
    </div>
  );
};

export default AddSectionForm;