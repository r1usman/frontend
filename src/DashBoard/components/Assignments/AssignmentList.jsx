import React, { useEffect, useState } from 'react';
import { ChevronRight, FileText } from 'lucide-react';
import AxiosInstance from '../../../Utility/AxiosInstances';
import { API_PATH } from '../../../Utility/ApiPath';
import { useNavigate } from 'react-router-dom';

const AssignmentItem = ({ title, dueIn, handleNavigation }) => {
  return (
    <div
      onClick={handleNavigation}
      className="flex items-center py-2 px-3 cursor-pointer group border-b border-gray-200"
    >
      <div className="text-blue-500 mr-3 border p-2 rounded-full  border-purple-500">
        <FileText size={20} className="text-[#6c63ff]" />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-gray-500">Due in {dueIn}</p>
      </div>

      <ChevronRight
        size={16}
        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

const AssignmentList = () => {
  const [Data, setData] = useState([]);
  const navigator = useNavigate();

  const fetchAssignments = async () => {
    try {
      const result = await AxiosInstance.get(API_PATH.ASSIGN.STUDENTASSINGMENTS);
      if (result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleNavigation = () => {
    navigator('/Student/Assingment/Dashboard');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm min-h-72 px-4 py-3 rounded-lg shadow-sm shadow-purple-300  bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Assignment</h2>
        <button
          onClick={handleNavigation}
          className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
        >
          See all
        </button>
      </div>

      {Data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No assignments available</p>
        </div>
      ) : (
        <div className="space-y-1 divide-y divide-gray-100">
          {Data.map((item) => {
            const dueDate = new Date(item.dueDate);
            const today = new Date();
            const diffTime = dueDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return (
              <AssignmentItem
                key={item._id}
                title={item.title}
                dueIn={`${diffDays} days`}
                handleNavigation={handleNavigation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;
