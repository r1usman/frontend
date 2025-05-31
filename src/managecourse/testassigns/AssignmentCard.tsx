import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Users, Flag, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import RankingModal from "./RankingModal";

// Sample group rankings data
const sampleGroupRankings = [
  { id: "1", name: "Team Alpha", score: 96, rank: 1 },
  { id: "2", name: "Team Beta", score: 94, rank: 2 },
  { id: "3", name: "Team Gamma", score: 91, rank: 3 },
  { id: "4", name: "Team Delta", score: 89, rank: 4 },
  { id: "5", name: "Team Epsilon", score: 87, rank: 5 },
  { id: "6", name: "Team Zeta", score: 85, rank: 6 },
  { id: "7", name: "Team Eta", score: 83, rank: 7 },
  { id: "8", name: "Team Theta", score: 80, rank: 8 },
];

export interface AssignmentData {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  groupSize: number;
  numGroups: number;
  status: "completed" | "in-progress" | "scheduled" | "pending";
}

interface AssignmentCardProps {
  assignment: AssignmentData;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg w-full  shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {assignment.title}
            </h3>
            <StatusBadge status={assignment.status} />
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {assignment.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>Start: {format(assignment.startDate, "MMM d, yyyy")}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Flag className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>Due: {format(assignment.dueDate, "MMM d, yyyy")}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{assignment.numGroups} groups</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{assignment.groupSize} per group</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setIsRankingModalOpen(true)}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Group Rankings
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>

            {assignment.status === "completed" && (
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
        title={`${assignment.title} - Group Rankings`}
        rankings={sampleGroupRankings}
      />
    </>
  );
};

export default AssignmentCard;
