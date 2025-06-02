import React from 'react';
import  CourseContinue  from '../components/Courses/CourseContinue';
import  CourseList  from '../components/Courses/CourseList';
import AssignmentList  from '../components/Assignments/AssignmentList';
import { ProgressStats } from '../components/Statistics/ProgressStats';
import { StudyStats } from '../components/Statistics/StudyStats';
import { MentorList } from '../components/MentorStatus/MentorList';
import PracticeProblemProfileLeft from '../components/PracticeProblemProfile/PracticeProblemProfileLeft';
import PracticeProblemProfileRight from '../components/PracticeProblemProfile/PracticeProblemProfileRight';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <CourseContinue />
        <CourseList />
       
        <PracticeProblemProfileLeft/>
      </div>
      
      <div className="space-y-8">
        {/* <StudyStats /> */}
        {/* <ProgressStats /> */}
        <AssignmentList />
         <MentorList />
        <PracticeProblemProfileRight/>
      </div>

    </div>
  );
};
