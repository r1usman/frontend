import React from 'react';
import { X } from 'lucide-react';

interface RankingItem {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  rankings: RankingItem[];
}

const RankingModal: React.FC<RankingModalProps> = ({
  isOpen,
  onClose,
  title,
  rankings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {rankings.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-lg border border-gray-100 p-4 hover:border-blue-100 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold mr-4">
                  {item.rank}
                </div>
                <div className="flex-grow">
                  <h4 className="text-gray-900 font-medium">{item.name}</h4>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {item.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingModal;