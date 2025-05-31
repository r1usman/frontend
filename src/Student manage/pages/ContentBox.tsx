import React from "react";
import StudentCourseContent from "../contentbox/StudentCourseContent";

function ContentBox() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-4">
      <div className="max-w-5xl mx-auto h-[calc(100vh-6rem)]">
        <StudentCourseContent />
      </div>
    </div>
  );
}

export default ContentBox;
