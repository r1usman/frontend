// import React from "react";

// const DailyChallenge = ({ challengeTitle, challengeDescription, buttonText }) => {
//   return (
//     <a href="#" className="h-full flex flex-col border border-gray-200 p-4 rounded-lg hover:shadow-md transition duration-200 group">
//       <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#5737F6]">{challengeTitle}</h2>
//       <p className="text-sm text-gray-600 mb-4 flex-grow">{challengeDescription}</p>
//       <span className="mt-auto bg-gradient-to-r from-[#5737F6] to-[#9612FA] hover:from-[#461fd6] hover:to-[#7e0ad4] text-white text-sm font-medium py-2 px-4 rounded transition duration-200 text-center w-full block">
//         {buttonText}
//       </span>
//     </a>
//   );
// };

// export default DailyChallenge;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const DailyChallenge = ({ challengeTitle, challengeDescription, buttonText }) => {
//   const [date, setDate] = useState(new Date());
//   const navigate = useNavigate();

//   const handleDateClick = (selectedDate) => {
//     const formattedDate = selectedDate.toISOString().split('T')[0];
//     navigate(`/challenges/${formattedDate}`);
//   };

//   return (
//     <div className="h-full flex flex-col border border-gray-200 p-4 rounded-lg hover:shadow-md transition duration-200 group">
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex-1">
//           <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#5737F6]">
//             {challengeTitle}
//           </h2>
//           <p className="text-sm text-gray-600 mb-4">{challengeDescription}</p>
//         </div>
//         <div className="ml-4">
//           <Calendar
//             onChange={(selectedDate) => {
//               setDate(selectedDate);
//               handleDateClick(selectedDate);
//             }}
//             value={date}
//             next2Label={null}
//             prev2Label={null}
//             minDate={new Date(2025, 0)}
//             maxDate={new Date()}
//             className="border-none rounded-lg shadow-sm"
//             tileClassName="hover:bg-[#5737F6] hover:bg-opacity-10 rounded-full"
//             tileDisabled={({ date }) => date > new Date()}
//             navigationLabel={({ date }) => (
//               <span className="text-[#5737F6] font-medium">
//                 {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
//               </span>
//             )}
//             formatShortWeekday={(_, date) => 
//               ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
//             }
//           />
//         </div>
//       </div>
//       <button className="mt-auto bg-gradient-to-r from-[#5737F6] to-[#9612FA] hover:from-[#461fd6] hover:to-[#7e0ad4] text-white text-sm font-medium py-2 px-4 rounded transition duration-200 w-full">
//         {buttonText}
//       </button>
//     </div>
//   );
// };

// export default DailyChallenge;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DailyChallenge = ({ challengeTitle, challengeDescription }) => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateClick = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    navigate(`/challenges/${formattedDate}`);
  };

  return (
    <div className="h-full flex flex-col rounded-lg hover:shadow-md transition duration-200 group bg-white">
      <div className="flex-1 flex justify-center">
        <div className="calendar-container">
          <Calendar
            onChange={(selectedDate) => {
              setDate(selectedDate);
              handleDateClick(selectedDate);
            }}
            value={date}
            next2Label={null}
            prev2Label={null}
            minDate={new Date(2025, 0, 1)}
            maxDate={new Date()}
            className="border-none rounded-lg shadow-sm bg-white"
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const isDisabled = date > new Date();
                return `
                  hover:bg-[#5737F6] hover:bg-opacity-10 rounded-md cursor-pointer
                  transition-all duration-200 border border-transparent
                  hover:border-[#5737F6] hover:border-opacity-20
                  ${isDisabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent hover:border-transparent' : ''}
                `;
              }
              return '';
            }}
            tileDisabled={({ date }) => date > new Date()}
            navigationLabel={({ date }) => (
              <span className="text-[#5737F6] font-semibold text-lg">
                {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
            )}
            formatShortWeekday={(_, date) => 
              ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]
            }
          />
        </div>
      </div>
      
      <style jsx>{`
        .calendar-container .react-calendar {
          width: 100%;
          max-width: 300px;
          font-family: inherit;
          line-height: 0.5rem;
        }
        
        .calendar-container .react-calendar__navigation {
          display: flex;
          height: 44px;
          margin-bottom: 1em;
        }
        
        .calendar-container .react-calendar__navigation button {
          min-width: 44px;
          background: none;
          border: none;
          color: #5737F6;
          font-size: 16px;
          font-weight: 600;
        }
        
        .calendar-container .react-calendar__navigation button:hover {
          background-color: #5737F6;
          background-opacity: 0.1;
          color: #461fd6;
        }
        
        .calendar-container .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75em;
          color: #6b7280;
          margin-bottom: 0.5em;
        }
        
        .calendar-container .react-calendar__month-view__weekdays__weekday {
          padding: 0.5em;
        }
        
        .calendar-container .react-calendar__tile {
          max-width: 100%;
          padding: 10px 6px;
          background: none;
          text-align: center;
          line-height: 16px;
          font-size: 0.875em;
          border: none;
          position: relative;
        }
        
        .calendar-container .react-calendar__tile:enabled:hover {
          background-color: rgba(87, 55, 246, 0.1);
          color: #5737F6;
          border-radius: 6px;
        }
        
        .calendar-container .react-calendar__tile--now {
          background: #5737F6;
          color: white;
          border-radius: 16px;
          font-weight: 600;
        }
        
        .calendar-container .react-calendar__tile--now:hover {
          background: #461fd6;
        }
        
        .calendar-container .react-calendar__tile--active {
          background: #9612FA;
          color: white;
          border-radius: 6px;
          font-weight: 600;
        }
        
        .calendar-container .react-calendar__tile--active:hover {
          background: #7e0ad4;
        }
      `}</style>
    </div>
  );
};

export default DailyChallenge;