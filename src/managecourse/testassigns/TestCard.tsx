import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Users, Award, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import RankingModal from './RankingModal';

// Sample rankings data
const sampleRankings = [
  { id: '1', name: 'John Smith', score: 98, rank: 1 },
  { id: '2', name: 'Emma Johnson', score: 95, rank: 2 },
  { id: '3', name: 'Michael Brown', score: 92, rank: 3 },
  { id: '4', name: 'Sarah Davis', score: 90, rank: 4 },
  { id: '5', name: 'James Wilson', score: 88, rank: 5 },
  { id: '6', name: 'Emily Taylor', score: 85, rank: 6 },
  { id: '7', name: 'Daniel Anderson', score: 82, rank: 7 },
  { id: '8', name: 'Olivia Martinez', score: 80, rank: 8 },
  { id: '9', name: 'David Thompson', score: 78, rank: 9 },
  { id: '10', name: 'Sophia Garcia', score: 75, rank: 10 },
];

export interface TestData {
  id: string;
  title: string;
  date: Date;
  duration: number;
  numStudents: number;
  status: 'completed' | 'in-progress' | 'scheduled' | 'pending';
  averageScore?: number;
}

interface TestCardProps {
  test: TestData;
}

const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {test.title}
            </h3>
            <StatusBadge status={test.status} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
              {format(test.date, 'MMM d, yyyy')}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
              {test.duration} {test.duration === 1 ? 'hour' : 'hours'}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1.5 text-gray-400" />
              {test.numStudents} {test.numStudents === 1 ? 'student' : 'students'}
            </div>
            
            {test.status === 'completed' && test.averageScore !== undefined && (
              <div className="flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-1.5 text-gray-400" />
                Avg: {test.averageScore}%
              </div>
            )}
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setIsRankingModalOpen(true)}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Rankings
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
            
            {test.status === 'completed' && (
              <a 
                href="#" 
                className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                View details
              </a>
            )}
          </div>
        </div>
      </div>

      <RankingModal
        isOpen={isRankingModalOpen}
        onClose={() => setIsRankingModalOpen(false)}
        title={`${test.title} - Student Rankings`}
        rankings={sampleRankings}
      />
    </>
  );
};

export default TestCard;