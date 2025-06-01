import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface QueryHistoryProps {
  queries: Array<{
    id: number;
    text: string;
    timestamp: Date;
    answered: boolean;
  }>;
}

const QueryHistory: React.FC<QueryHistoryProps> = ({ queries }) => {
  const timeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} mins ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-800 mb-3">Your Questions</h3>
      
      {queries.length === 0 ? (
        <div className="text-center py-6 text-gray-500 text-sm">
          You haven't asked any questions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {queries.map((query) => (
            <div key={query.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center">
                  {query.answered ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400 mr-1.5" />
                  )}
                  <span className="text-xs font-medium text-gray-600">
                    {query.answered ? 'Answered' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeAgo(query.timestamp)}
                </div>
              </div>
              <p className="text-sm text-gray-800">{query.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryHistory;