import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseHeader from "../edit-course/CourseHeader";
import CourseForm from "../edit-course/CourseForm";
import CoursePreview from "../edit-course/CoursePreview";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  price: string;
  thumbnail: string;
  requirements: string[];
  outcomes: string[];
  isPublished: boolean;
}
// Mock data for demonstration
const mockCourseData: Record<string, Course> = {
  "1": {
    id: "1",
    title: "Introduction to React",
    subtitle: "Learn the fundamentals of React development",
    description:
      "This comprehensive course teaches you everything you need to know about React, from the basics to advanced concepts. You'll learn about components, state, props, hooks, context, and much more. By the end of this course, you'll be able to build complex React applications from scratch.",
    category: "development",
    level: "beginner",
    price: "49.99",
    thumbnail:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Node.js installed on your computer",
      "A code editor (VS Code recommended)",
    ],
    outcomes: [
      "Build complete applications with React",
      "Understand React component architecture",
      "Manage state effectively in React applications",
      "Use React Hooks for state and side effects",
    ],
    isPublished: false,
  },
};

const EditCoursePage: React.FC = () => {
  const courseId = "1"; // In a real app, this would come from useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setTimeout(() => {
      if (courseId && mockCourseData[courseId]) {
        setCourse(mockCourseData[courseId]);
      }
      setLoading(false);
    }, 500); // Simulate network delay
  }, [courseId]);

  const handleSaveDraft = (updatedCourse: Course) => {
    setCourse({ ...updatedCourse, isPublished: false });
    // In a real app, this would send data to a backend
    console.log("Course saved as draft:", updatedCourse);

    // Show success message
    alert("Course saved as draft!");
  };

  const handlePublish = (updatedCourse: Course) => {
    setCourse({ ...updatedCourse, isPublished: true });
    // In a real app, this would send data to a backend
    console.log("Course published:", updatedCourse);

    // Show success message and redirect
    alert("Course published successfully!");
    navigate("/");
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8">
          <h2 className="text-2xl font-medium text-gray-700">
            Course not found
          </h2>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => navigate("/")}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showPreview ? (
        <CoursePreview course={course} onClose={togglePreview} />
      ) : (
        <>
          <div className=" mx-auto  py-8">
            <CourseForm course={course} setCourse={setCourse} />
          </div>
          <CourseHeader
            title={course.title}
            course={course}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
            onPreview={togglePreview}
          />
        </>
      )}
    </div>
  );
};

export default EditCoursePage;
