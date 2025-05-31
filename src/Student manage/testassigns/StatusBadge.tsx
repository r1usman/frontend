import React from 'react';

type StatusType = 'completed' | 'in-progress' | 'scheduled' | 'pending';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const statusClasses = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'scheduled': 'bg-yellow-100 text-yellow-800',
    'pending': 'bg-gray-100 text-gray-800',
  };
  
  const statusLabels = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'scheduled': 'Scheduled',
    'pending': 'Pending',
  };
  
  return (
    <span className={`${baseClasses} ${statusClasses[status]} ${className}`}>
      <span className={`h-1.5 w-1.5 mr-1.5 rounded-full ${status === 'completed' ? 'bg-green-400' : status === 'in-progress' ? 'bg-blue-400' : status === 'scheduled' ? 'bg-yellow-400' : 'bg-gray-400'}`}></span>
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;