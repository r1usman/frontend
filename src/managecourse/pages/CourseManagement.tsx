import React from "react";
import { CourseOverview } from "../dashboard/CourseOverview.js";
import { ReviewsSection } from "../dashboard/ReviewsSection.js";

export const CourseManagement: React.FC = () => {
  return (
    <div className="space-y-12">
      <CourseOverview />

      <ReviewsSection />
    </div>
  );
};
