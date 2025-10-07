import React from 'react'
import moment from 'moment'

const Table = ({ tableData }) => {
    console.log(tableData);
    
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return "bg-green-100 text-green-600 border border-green-200";
      case 'Medium':
        return "bg-orange-100 text-orange-600 border border-orange-200";
      case 'Hard':
        return "bg-red-100 text-red-600 border border-red-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const getVisibilityColor = (visibility) => {
    switch (visibility) {
      case true:
        return "bg-blue-100 text-blue-600 border border-blue-200";
      case 'false':
        return "bg-gray-100 text-gray-600 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
};

return (
    <div className='overflow-x-auto rounded-lg mt-3 font-urbanist border  border-gray-200 -translate-y-3 '>
    <table className='min-w-full'>
        <thead>
        <tr className='text-left'>
            <th className='py-3 px-4 text-gray-800 font-medium text-[13px]'>Title</th>
            <th className='py-3 px-4 text-gray-800 font-medium text-[13px]'>Difficulty</th>
            <th className='py-3 px-4 text-gray-800 font-medium text-[13px]'>Due Date</th>
            
            <th className='py-3 px-4 text-gray-800 font-medium text-[13px]'>Total Submission</th>
            <th className='py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell'>Visibility</th>
        </tr>
        </thead>
        <tbody>
        {tableData.map((item) => (
            <tr key={item._id} className='border-t border-gray-200'>
            
            <td className='py-3 px-4 text-gray-700 text-[13px] line-clamp-1'>{item.Question}</td>

            
            <td className='p-4'>
                <span className={`px-2 py-1 text-xs rounded  ${getDifficultyColor(item.difficulty)}`}>
                {item.difficulty || "N/A"}
                </span>
            </td>

            
            <td className='p-4 text-gray-700 text-[13px]'>
                {item.endTime ? moment(item.endTime).format("Do MMM YYYY") : "N/A"}
            </td>

            

            <td className='p-4 text-gray-700 text-[13px] flex items-center justify-center'>
              {Array.isArray(item.SubmittedBy) ? item.SubmittedBy.length-1 : "Not Set"}
            </td>

            
    

            
            <td className='p-4'>
              <span className={`capitalize tracking-wide px-2 py-1 text-xs rounded ${getVisibilityColor(item.isPublic)}`}>
                {item.isPublic ? "Public" : "Private"}
              </span>
            </td>

            
            {/* <td className='p-4 text-gray-700 text-[13px] text-nowrap hidden md:table-cell'>
                {item.updatedAt ? moment(item.updatedAt).format("Do MMM YYYY") : "N/A"}
            </td> */}
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    )
}

export default Table
