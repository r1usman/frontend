import { LucideCirclePlus } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../../Utility/ApiPath";
import AxiosInstance from "../../Utility/AxiosInstances";

import Modal from "../../Collaboration/Layouts/Modal";
import AssinmentCard from "./Components/CourseCard";
import CourseCardComponent from "./Components/CourseCardComponent";
import CreateDefaultCourses from "./Components/CreateCourses";

const Courses = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [previewCourse, setpreviewCourse] = useState(false);
  const [selectCourse, setselectCourse] = useState({});

  const [allCourses, setallCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log("selectCourse", selectCourse);

  const FetchCourses = async () => {
    try {
      const result = await AxiosInstance.get(
        "http://localhost:3000/courses/instructor"
      );
      console.log(result.data);
      setallCourses(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allCourses);

  useEffect(() => {
    FetchCourses();
  }, []);

  return (
    <div className="relative">
      <div className="h-[110vh] font-urbanist grid grid-cols-1 md:grid-cols-3 md:gap-3 pt-1 pb-6 px-4 md:px-0 min-h-screen ">
        {/* <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center border-2 border-dashed border-sky-500 rounded-md cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-sky-200/60 rounded-full">
            <LucideCirclePlus className="text-xl text-sky-500" />
          </div>
          <h3 className="font-medium text-gray-800">Add New Course</h3>
        </div> */}

        {allCourses?.map((challenge) => (
          <AssinmentCard
            at={"Admin"}
            tag={"Edit"}
            data={challenge}
            key={challenge?._id}
            imgurl={challenge?.image || null}
            title={challenge?.title || "Untitled Resume"}
            lastUpdated={
              challenge?.updatedAt
                ? moment(challenge.updatedAt).format("Do MMM YYYY")
                : "Unknown"
            }
            onselect={(selected) => {
              setselectCourse(selected);
              setpreviewCourse(true);
            }}
          />
        ))}
      </div>

      <Modal
        isOpen={openCreateModal}
        title={"Add Assingment"}
        onClose={() => setOpenCreateModal(false)}
        type="Banner"
      >
        <CreateDefaultCourses
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
        />
      </Modal>

      <Modal
        isOpen={previewCourse}
        title={selectCourse?.title}
        onClose={() => setpreviewCourse(false)}
        type="Print"
      >
        <CourseCardComponent
          FetchCourses={FetchCourses}
          data={selectCourse}
          previewCourse={previewCourse}
          setpreviewCourse={setpreviewCourse}
        />
      </Modal>
    </div>
  );
};

export default Courses;
