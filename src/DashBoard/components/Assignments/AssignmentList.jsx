import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import AxiosInstance from '../../../Utility/AxiosInstances';
import { API_PATH } from '../../../Utility/ApiPath';
import { set } from 'date-fns';
import { useNavigate } from 'react-router';

const AssignmentItem = ({
  title,
  dueIn,
  completed = false,
  variant = 'default'
}) => {
  const statusColors = {
    default: 'bg-blue-50 border-blue-200 text-blue-700',
    inProgress: 'bg-amber-50 border-amber-200 text-amber-700',
    upcoming: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div className="flex items-center py-3 cursor-pointer group">
      <div className={`w-8 h-8 flex-shrink-0 rounded-full ${completed ? 'bg-green-100 border-green-200 text-green-600' : statusColors[variant]} border flex items-center justify-center mr-3`}>
        {completed ? '✓' : variant === 'inProgress' ? '⏳' : '📝'}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-gray-500">Due in {dueIn}</p>
      </div>
      <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const AssignmentList = () => {
  const [Assingments, setAssingments] = useState([]);
  console.log("Assingments",Assingments);
  const navigator = useNavigate();
  // const FetchAssingments = async (pageNum = 1, limit = 9) => {
  //     try {
  //       const result = await AxiosInstance.get( `${API_PATH.ASSIGN.ASSINGMENTS}?page=${pageNum}&limit=${limit}`);
  //       console.log("result", result.data);
  //       setAssingments(result.data)
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //     } 
  //   };
  
  //   useEffect(()=>{
  //     FetchAssingments();
  //   },[])

    const handleNavigation = ()=>{
      navigator("/Student/Assingment/Dashboard")
    }
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Assignment</h2>
        <button onClick={handleNavigation} className="text-sm text-blue-500 hover:text-blue-700 transition-colors">See all</button>
      </div>

      <div className="space-y-1 divide-y divide-gray-100">
        <AssignmentItem
          title="Test (19 exercises)"
          dueIn="2 days"
        />
        <AssignmentItem
          title="Prototyping"
          dueIn="3 days"
          variant="inProgress"
        />
        <AssignmentItem
          title="Course on Illustration"
          dueIn="6 days"
          variant="upcoming"
        />
        <AssignmentItem
          title="Do the research"
          dueIn="8 days"
          variant="upcoming"
        />
        <AssignmentItem
          title="Design system wireframe"
          dueIn="2 days"
          completed={true}
        />
      </div>
    </div>
  );
};

export default AssignmentList;
