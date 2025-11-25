import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
         
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-gray-500">{role} • {course}</p>
        </div>
      </div>
        </div>
  );
};

export const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  const fetchMentors = async () => {
    try {
      const res = await axios.get('http://localhost:3000/courses');
      if (res.data) {
        const mapped = res.data.map(course => ({
          name: course.instructor,
          avatar: course.image,
          role: 'Instructor',
          course: course.title
        }));
        setMentors(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div className="px-4 py-3 rounded-lg shadow-sm shadow-purple-300  bg-white shadow-sm min-h-72">
      <h2 className="text-lg font-medium mb-4">Your Mentors</h2>
      
      {mentors.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No mentors available</p>
      ) : (
        <div className="space-y-2 divide-y divide-gray-100">
          {mentors.map((mentor, idx) => (
            <Mentor
              key={idx}
              name={mentor.name}
              avatar={mentor.avatar}
              role={mentor.role}
              online={mentor.online}
              course={mentor.course}
            />
          ))}
        </div>
      )}
    </div>
  );
};
