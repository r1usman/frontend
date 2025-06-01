import React from "react";
import CourseContent from "../contentbox/InstructorCourseContent";

function ContentBox() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-4">
      <div className="max-w-5xl mx-auto h-[calc(100vh-6rem)]">
        <CourseContent />
      </div>
    </div>
  );
}

export default ContentBox;
