import AssignmentList from "../components/Assignments/AssignmentList";
import CourseContinue from "../components/Courses/CourseContinue";
import CourseList from "../components/Courses/CourseList";
import { MentorList } from "../components/MentorStatus/MentorList";
import PracticeProblemProfileLeft from "../components/PracticeProblemProfile/PracticeProblemProfileLeft";
import PracticeProblemProfileRight from "../components/PracticeProblemProfile/PracticeProblemProfileRight";

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-6">
        <CourseContinue />
        <CourseList />

        <PracticeProblemProfileLeft />
      </div>

      <div className="space-y-6">
      
        <AssignmentList />
        <MentorList />
        <PracticeProblemProfileRight />
      </div>
    </div>
  );
};
