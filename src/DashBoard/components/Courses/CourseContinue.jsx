import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";

const CourseCard = ({ course, img }) => {
  console.log(img);
  const Navigate = useNavigate();
  const handleNavigate = () => {
    Navigate(`/Student/PlatfromCourse/${course?.title}`, {
      state: { course },
    });
  };

  return (
    <div
      className={` rounded-lg w-75 h-fit flex-shrink-0 transition-transform duration-200 hover:bg-opacity-80 hover:scale-[1.02] overflow-none  hover:shadow-lg cursor-pointer`}
      onClick={handleNavigate}
    >
      <img src={img} alt="" className="rounded-lg" />
    </div>
  );
};

const CourseContinue = () => {
  const navigate = useNavigate();
  const [Courses, setCourses] = useState([]);

  const FetchCourses = async () => {
    try {
      const result = await AxiosInstance.get(
        "http://localhost:3000/courses/joined"
      );
      setCourses(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchCourses();
  }, []);
  const handleCardClick = (courseId) => {
    if (courseId == "python") {
      navigate("/0");
    }
  };
  console.log(Courses);

  return (
    <div className="px-4 py-3 rounded-lg shadow-sm shadow-purple-300  bg-white">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-lg font-medium">Continue Courses</h2>
      </div>

      <div className="flex gap-3 h-[35vh]  overflow-x-auto pt-1 px-2">
        {Courses.map((course) => {
          return <CourseCard img={course.image} course={course} />;
        })}
      </div>
    </div>
  );
};

export default CourseContinue;
