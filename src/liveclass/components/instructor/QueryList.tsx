import React, { useState } from 'react';
import { Clock, MessageSquare, CheckCircle, Filter, Users } from 'lucide-react';

interface Query {
  id: number;
  text: string;
  student: string;
  timestamp: Date;
  answered: boolean;
  clusterId?: number;
}

const QueryList: React.FC = () => {
  const [clusteringEnabled, setClusteringEnabled] = useState(false);
  const [queries, setQueries] = useState<Query[]>([
    { id: 1, text: "Can you explain the concept of state in React?", student: "Alex Johnson", timestamp: new Date(Date.now() - 15 * 60000), answered: false, clusterId: 1 },
    { id: 2, text: "What's the difference between props and state?", student: "Maria Garcia", timestamp: new Date(Date.now() - 12 * 60000), answered: false, clusterId: 1 },
    { id: 3, text: "How do we handle events in React?", student: "John Smith", timestamp: new Date(Date.now() - 10 * 60000), answered: false },
    { id: 4, text: "Could you go over the useState hook again?", student: "Emily Wilson", timestamp: new Date(Date.now() - 8 * 60000), answered: false, clusterId: 1 },
    { id: 5, text: "What's the purpose of useEffect?", student: "David Lee", timestamp: new Date(Date.now() - 5 * 60000), answered: false },
    { id: 6, text: "How do you deploy a React app?", student: "Sarah Miller", timestamp: new Date(Date.now() - 3 * 60000), answered: false },
  ]);

  const handleAnswered = (id: number) => {
    setQueries(
      queries.map(query => 
        query.id === id ? { ...query, answered: true } : query
      )
    );
  };

  const renderQueries = () => {
    if (clusteringEnabled) {
      // Group queries by clusterId
      const clusters: Record<string, Query[]> = {};
      
      queries.forEach(query => {
        const key = query.clusterId ? `cluster-${query.clusterId}` : `single-${query.id}`;
        if (!clusters[key]) {
          clusters[key] = [];
        }
        clusters[key].push(query);
      });

      return Object.entries(clusters).map(([key, clusterQueries]) => {
        if (key.startsWith('cluster-') && clusterQueries.length > 1) {
          return (
            <div key={key} className="border border-indigo-100 bg-indigo-50 rounded-lg p-3 mb-3">
              <div className="flex items-center mb-2">
                <Users className="h-4 w-4 text-indigo-600 mr-1" />
                <span className="text-sm font-medium text-indigo-600">Similar Questions ({clusterQueries.length})</span>
              </div>
              
              {clusterQueries.map(query => (
                <div key={query.id} className="bg-white rounded-md p-3 mb-2 last:mb-0">
                  <QueryItem query={query} onAnswered={handleAnswered} />
                </div>
              ))}
            </div>
          );
        } else {
          return clusterQueries.map(query => (
            <div key={query.id} className="border border-gray-200 rounded-lg p-3 mb-3">
              <QueryItem query={query} onAnswered={handleAnswered} />
            </div>
          ));
        }
      });
    } else {
      return queries.map(query => (
        <div key={query.id} className="border border-gray-200 rounded-lg p-3 mb-3">
          <QueryItem query={query} onAnswered={handleAnswered} />
        </div>
      ));
    }
  };

  return (
    <div className="h-[calc(100vh-250px)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Student Queries</h3>
        <button 
          onClick={() => setClusteringEnabled(!clusteringEnabled)}
          className={`flex items-center text-xs px-2 py-1 rounded ${
            clusteringEnabled 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Filter className="h-3 w-3 mr-1" />
          {clusteringEnabled ? 'Clustering On' : 'Enable Clustering'}
        </button>
      </div>
      <div className="space-y-2">
        {renderQueries()}
      </div>
    </div>
  );
};

interface QueryItemProps {
  query: Query;
  onAnswered: (id: number) => void;
}

const QueryItem: React.FC<QueryItemProps> = ({ query, onAnswered }) => {
  const timeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} mins ago`;
  };

  return (
    <div className={query.answered ? 'opacity-70' : ''}>
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-sm">{query.student}</span>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {timeAgo(query.timestamp)}
        </div>
      </div>
      <p className="text-sm text-gray-800 mb-2">{query.text}</p>
      <div className="flex justify-between items-center">
        {query.answered ? (
          <span className="text-xs flex items-center text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Answered
          </span>
        ) : (
          <button 
            onClick={() => onAnswered(query.id)}
            className="text-xs flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Answer Now
          </button>
        )}
      </div>
    </div>
  );
};

export default QueryList;