import React from "react";
import { Course } from "../../../../edit course/src/types/course";
import CourseBasicInfo from "./CourseBasicInfo";
import CourseRequirements from "./CourseRequirements";
import CourseOutcomes from "./CourseOutcomes";

interface CourseFormProps {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, setCourse }) => {
  const updateCourse = (updates: Partial<Course>) => {
    setCourse((currentCourse) => {
      if (!currentCourse) return null;
      return { ...currentCourse, ...updates };
    });
  };

  return (
    <div className="space-y-8">
      <CourseBasicInfo course={course} updateCourse={updateCourse} />

      <CourseRequirements
        requirements={course.requirements}
        updateRequirements={(requirements) => updateCourse({ requirements })}
      />

      <CourseOutcomes
        outcomes={course.outcomes}
        updateOutcomes={(outcomes) => updateCourse({ outcomes })}
      />
    </div>
  );
};

export default CourseForm;
