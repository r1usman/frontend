import React from 'react';

const Mentor = ({ name, avatar, role, online, course }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200" 
          />
          <div 
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${online ? 'bg-green-500' : 'bg-gray-300'}`}
          ></div>
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-gray-500">{role} • {course}</p>
        </div>
      </div>
      
      <button className="text-xs text-blue-500 hover:text-blue-700 transition-colors">Message</button>
    </div>
  );
};

export const MentorList = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-medium mb-4">Your Mentors</h2>
      
      <div className="space-y-2 divide-y divide-gray-100">
        <Mentor 
          name="Max Williams" 
          avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
          role="Instructor" 
          online={true}
          course="UX Design"
        />
        <Mentor 
          name="David Warner" 
          avatar="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
          role="Mentor" 
          online={true}
          course="UI Components"
        />
        <Mentor 
          name="Whitney Rhode" 
          avatar="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
          role="Instructor" 
          online={false}
          course="Illustrations"
        />
        <Mentor 
          name="Lisa Williams" 
          avatar="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
          role="Mentor" 
          online={false}
          course="Mobile Design"
        />
      </div>
    </div>
  );
};
