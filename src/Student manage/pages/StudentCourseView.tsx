import React, { useState } from "react";
import AssignmentResults from "../components/AssignmentResults";
import CourseHeader from "../components/CourseHeader";
import CourseHero from "../components/CourseHero";
import CourseNav from "../components/CourseNav";
import PerformanceStats from "../components/PerformanceStats";
import StudentCourseContent from "../components/StudentCourseContent";
import TestResults from "../components/TestResults";

// Mock data for the course
const courseData = {
  title: "Advanced Web Development with React",
  instructor: "Dr. Sarah Johnson",
  duration: "12 weeks",
  progress: 68,
  imageUrl:
    "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  category: "Development",
  averageScore: 85,
  completedAssignments: 8,
  timeSpent: "45h 22m",
  tests: [
    {
      id: 1,
      title: "Midterm Exam",
      date: "Oct 15, 2023",
      score: 42,
      maxScore: 50,
    },
    {
      id: 2,
      title: "React Hooks Quiz",
      date: "Sep 28, 2023",
      score: 18,
      maxScore: 20,
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      date: "Sep 10, 2023",
      score: 15,
      maxScore: 25,
    },
  ],
  assignments: [
    {
      id: 1,
      title: "React Portfolio Project",
      dueDate: "Nov 20, 2023",
      submittedDate: "Nov 18, 2023",
      status: "completed",
      grade: 92,
    },
    {
      id: 2,
      title: "State Management Exercise",
      dueDate: "Oct 25, 2023",
      submittedDate: "Oct 26, 2023",
      status: "late",
      grade: 85,
    },
    {
      id: 3,
      title: "API Integration Assignment",
      dueDate: "Oct 10, 2023",
      submittedDate: "Oct 8, 2023",
      status: "completed",
      grade: 88,
    },
    {
      id: 4,
      title: "Final Project Proposal",
      dueDate: "Nov 30, 2023",
      submittedDate: null,
      status: "pending",
      grade: null,
    },
  ],
  grades: [
    { name: "Assignments", value: 88 },
    { name: "Quizzes", value: 92 },
    { name: "Midterm", value: 84 },
    { name: "Participation", value: 78 },
    { name: "Projects", value: 90 },
  ],
};

const StudentCourseView: React.FC = () => {
  const [activeSection, setActiveSection] = useState("content");

  // Placeholder for existing course content

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className=" mx-auto px-8 py-8">
        <CourseHeader
          title={courseData.title}
          instructor={courseData.instructor}
          duration={courseData.duration}
          progress={courseData.progress}
        />

        <CourseHero
          imageUrl={courseData.imageUrl}
          category={courseData.category}
        />

        <PerformanceStats
          averageScore={courseData.averageScore}
          completedAssignments={courseData.completedAssignments}
          timeSpent={courseData.timeSpent}
        />

        <CourseNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {activeSection === "content" && <StudentCourseContent />}

        {activeSection === "tests" && <TestResults tests={courseData.tests} />}

        {activeSection === "assignments" && (
          <AssignmentResults assignments={courseData.assignments} />
        )}
      </div>
    </div>
  );
};

export default StudentCourseView;
