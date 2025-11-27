import React, { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CoursePhotoSelector from "./CoursePhotoSelector";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";
import moment from "moment";
import Stats from "../Stats";
import UploadImage from "../Components/UploadCourse";
import PreviewBlogPostSummaryCard from "./PreviewBlogPostSummaryCard";

const CourseCardComponent = ({
  data,
  previewCourse,
  setpreviewCourse,
  FetchCourses,
}) => {
  const navigate = useNavigate();

  // Ensure safe defaults
  const [courseInfo, setcourseInfo] = useState(
    data ?? { _id: "", image: "", description: "" }
  );
  const [Articles, setArticles] = useState([]);
  const [totalviews, settotalviews] = useState("");
  const [totalLikes, settotalLikes] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleCourseInfo = (key, value) => {
    setcourseInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const FetchCourseArticels = async (id) => {
    try {
      const result = await AxiosInstance.get(API_PATH.BLOG.COURSE_BLOGS(id));
      setArticles(result.data.posts);
      settotalviews(result.data.totalViews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const likes = Articles.reduce((sum, post) => {
      return sum + (post.likedBy?.length || 0);
    }, 0);
    settotalLikes(likes);
  }, [Articles]);

  useEffect(() => {
    if (courseInfo?._id) {
      FetchCourseArticels(courseInfo._id);
    }
  }, [courseInfo?._id]);

  const UpdateCourse = async () => {
    try {
      setisLoading(true);

      const current = courseInfo ?? {};
      if (!current?.image) {
        seterror("Please select the cover image");
        setisLoading(false);
        return;
      }
      if (!current?.description?.trim()) {
        seterror("Description is required");
        setisLoading(false);
        return;
      }

      // Upload only if image is a File/Blob; keep as-is if it's already a URL/string
      let CourseImage = typeof current.image === "string" ? current.image : "";
      if (current.image && typeof current.image !== "string") {
        const uploadImage = await UploadImage(current.image, current._id);
        CourseImage = uploadImage?.image || "";
      }

      const result = await AxiosInstance.put(
        API_PATH.PLATFORM_COURSES.UPDATE(current?._id),
        { ...current, image: CourseImage }
      );

      if (result) {
        FetchCourses();
        setpreviewCourse(!previewCourse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  // Keep local state in sync if parent updates `data`
  useEffect(() => {
    if (data) setcourseInfo((prev) => ({ ...prev, ...data }));
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      seterror("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex h-48 border m-1 border-slate-100 rounded-md">
        <div className="w-2/3 border border-dotted border-sky-500 m-1.5">
          <CoursePhotoSelector
            image={courseInfo.image}
            setimage={(imageurl) => handleCourseInfo("image", imageurl)}
          />
        </div>

        <div className="w-1/3 m-1.5 flex items-center justify-center">
          <Stats
            totalLikes={totalLikes}
            totalviews={totalviews}
            numberofblogs={Articles.length}
          />
        </div>
      </div>

      <div className="col-span-2 mt-3 h-full px-3 py-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="" className="font-medium">
            Description
          </label>
          <p className="text-red-500 text-xs ">{error}</p>
        </div>
        <textarea
          placeholder="Write a function that takes an array of integers and returns the maximum and minimum numbers as a tuple or list."
          className="form-input-Course resize-none"
          rows={4}
          value={courseInfo?.description || ""}
          onChange={({ target }) =>
            handleCourseInfo("description", target.value)
          }
        />
        <div className="flex items-center justify-end">
          <button onClick={UpdateCourse} className="btn-primary1">
            {isLoading && <LuLoaderCircle className="animate-spin text-lg" />}
            {isLoading ? "Saving..." : "Save "}
          </button>
        </div>
      </div>

      <div className="mt-5 px-3">
        {Articles?.map((post, index) => (
          <PreviewBlogPostSummaryCard
            key={post._id || index}
            at={"Course"}
            index={index}
            id={post._id}
            courseID={courseInfo?._id}
            Articles={Articles}
            content={post.content}
            title={post.title}
            imgUrl={data?.title}
            updatedOn={
              post.updatedAt
                ? moment(post.updatedAt).format("Do MMM YYYY")
                : "N/A"
            }
            tags={post.tags}
            likes={post.likes}
            views={post.views}
            FetchCourseArticels={FetchCourseArticels}
            onClick={() => navigate(`/admin/edit/${post.slug}`)}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCardComponent;
