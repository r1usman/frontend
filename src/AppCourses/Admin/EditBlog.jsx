import { useState, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  LuLoaderCircle,
  LuSave,
  LuSend,
  LuSparkles,
  LuTrash2,
} from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import TagInput from "./Components/TagInput";
import SkeletonLoader from "./Components/SkeletonLoader";
import BlogPostIdeaCard from "./Components/BlogPostIdeaCard";
import AxiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";
import { BrushCleaning } from "lucide-react";
import Modal from "../../DashBoard/Modals/Modal";
import CourseScraping from "./CourseScraping";
import GenerateBlogPostForm from "./Components/GenerateBlogPostForm";
import { useEffectEvent } from "react";
import { getToastMessagesByType } from "../../Utility/Helper";
import { toast } from "react-toastify";
import DeleteBlogCard from "./Components/DeleteBlogCard";
import DeleteBlogFromEdit from "./Components/DeleteBlogFromEdit";
import { HttpError } from "@liveblocks/core";

const EditBlog = ({ isEdit }) => {
  const navigate = useNavigate();
  const [DeletePost, setDeletePost] = useState(false);
  const { postSlug = "" } = useParams();

  const [OpenScapingEnv, setOpenScapingEnv] = useState(false);
  const [RegistedCourses, setRegistedCourses] = useState([]);

  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    BelongTo: "",
    tags: "",
    isDraft: "",
    generatedByAI: false,
  });

  console.log(postData);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });
  const [ideaLoading, setIdeaLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(true);
  const [postIdeas, setpostIdeas] = useState([]);
  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({ ...prevData, [key]: value }));
  };

  const generatePostIdeas = async () => {
    setIdeaLoading(true);

    try {
      const aiResponse = await AxiosInstance.post(
        API_PATH.PLATFORM_COURSES.GENERATE_IDEAS,
        {
          topics: "Python, C++, JavaScript, Java",
        }
      );

      const generatedIdeas = aiResponse.data;

      if (generatedIdeas?.length > 0) {
        setpostIdeas(generatedIdeas);
      } else {
        console.log("No ideas generated.");
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setIdeaLoading(false);
    }
  };

  const GetRegisteredCourses = async () => {
    try {
      const result = await AxiosInstance.get(
        "http://localhost:3000/courses/instructor"
      );
      setRegistedCourses(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateData = (key, value) => {
    setPostData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePublish = async (isDraft) => {
    let coverImageUrl = "";

    if (!postData.title.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!postData.content.trim()) {
      setError("Please enter some content.");
      return;
    }

    // if (!postData.tags.length) {
    //   setError("Please add some tags.");
    //   return;
    // }

    if (!postData.BelongTo.trim()) {
      setError("Please Select the Category.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const reqPayload = {
        title: postData.title,
        content: postData.content,
        coverImageUrl,
        tags: postData.tags,
        isDraft: !!isDraft,
        generatedByAI: true,
        BelongTo: postData.BelongTo,
      };

      // Send request
      const response = isEdit
        ? await AxiosInstance.put(
            API_PATH.BLOG.UPDATE_POST(postData.id),
            reqPayload
          )
        : await AxiosInstance.post(API_PATH.BLOG.CREATE_POST, reqPayload);

      if (response.data) {
        toast.success(
          getToastMessagesByType(
            isDraft ? "draft" : isEdit ? "edit" : "published"
          )
        );
        navigate("/Instructor/BlogPost");
      }
    } catch (error) {
      setError("Failed to publish blog post. Please try again.");
      console.error("Error publishing blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get Post Data By Slug
  // Get Post Data By Slug
  const fetchPostDetailsBySlug = async () => {
    try {
      const response = await AxiosInstance.get(
        API_PATH.BLOG.GET_POST_BY_SLUG(postSlug)
      );

      if (response.data) {
        const data = response.data;
        setPostData((prevState) => ({
          ...prevState,
          id: data._id,
          title: data.title,
          content: data.content,
          coverPreview: data.coverImageUrl,
          tags: data.tags,
          isDraft: data.isDraft,
          generatedByAI: data.generatedByAI,
        }));
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await AxiosInstance.delete(API_PATH.BLOG.DELETE_POST(postId));
      toast.success("Post deleted successfully!");
      navigate("/Instructor/BlogPost");
    } catch (error) {
      toast.error("Failed to delete post!");
      console.error(error);
    }
  };

  useEffect(() => {
    // generatePostIdeas();
    GetRegisteredCourses();
    if (isEdit) {
      fetchPostDetailsBySlug();
    }
  }, []);

  console.log("postData", postData);

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-12  my-4 ">
        <div
          className={`form-card p-6 col-span-12 ${
            isEdit ? "md:col-span- " : "md:col-span-8 "
          } border border-dotted border-sky-500 p-3 rounded-md`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-medium ">
              {!isEdit ? "Add New Post" : "Edit Post"}
            </h2>

            <div className="flex items-center gap-3">
              {isEdit && (
                <button
                  className="flex items-center gap-2.5 text-[13px] font-medium text-rose-500 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-rose-50 hover:border-rose-300 cursor-pointer hover:scale-[1.02] transition-all  "
                  disabled={loading}
                  onClick={() => setDeletePost(true)}
                >
                  <LuTrash2 className="text-sm" />
                  <span className="hidden md:block">Delete</span>
                </button>
              )}

              <div className="flex flex-col my-2  space-y-1.5 ">
                <select
                  value={postData?.BelongTo}
                  onChange={({ target }) =>
                    UpdateData("BelongTo", target.value)
                  }
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all   focus:outline-none"
                  name=""
                  id=""
                >
                  <option disabled value={""}>
                    {" "}
                    Category
                  </option>
                  {RegistedCourses.map((data) => (
                    <option value={data?._id}>{data?.title}</option>
                  ))}
                </select>
              </div>

              {!isEdit && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-1.5 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all   "
                  disabled={loading}
                  onClick={() => setOpenScapingEnv(true)}
                >
                  <BrushCleaning className="size-4" />
                  <span>Scrap Content</span>
                </button>
              )}

              <button
                className="flex items-center gap-1.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-1.5 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all   "
                disabled={loading}
                onClick={() => handlePublish(true)}
              >
                <LuSave className="text-sm" />
                <span>Save as Draft</span>
              </button>

              <button
                className="flex items-center gap-2.5 text-[13px] font-medium text-sky-600 
                            hover:text-white hover:bg-gradient-to-r hover:from-sky-600 hover:to-indigo-700 
                            rounded px-3 py-[3px] border border-sky-500 hover:border-sky-50 cursor-pointer 
                            hover:scale-[1.02] transition-all"
                disabled={loading}
                onClick={() => handlePublish(false)}
              >
                {loading ? (
                  <LuLoaderCircle className="animate-spin text-[15px]" />
                ) : (
                  <LuSend className="text-sm" />
                )}
                <span>Publish</span>
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Post Title</label>
            <input
              placeholder="How to Build a MERN App"
              className="form-input"
              value={postData.title}
              onChange={({ target }) =>
                handleValueChange("title", target.value)
              }
            />
          </div>

          <div className="mt-3">
            <label className="text-xs font-medium text-slate-600">
              Content
            </label>

            <div data-color-mode="light" className="mt-3">
              <MDEditor
                value={postData.content}
                onChange={(data) => handleValueChange("content", data)}
                commands={[
                  commands.bold,
                  commands.italic,
                  commands.strikethrough,
                  commands.hr,
                  commands.title,
                  commands.divider,
                  commands.link,
                  commands.code,
                  commands.image,
                  commands.unorderedListCommand,
                  commands.orderedListCommand,
                  commands.checkedListCommand,
                ]}
                hideMenu={true}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-600">Tags</label>

            <TagInput
              tags={postData?.tags || []}
              setTags={(data) => handleValueChange("tags", data)}
            />
          </div>
        </div>
        {!isEdit && (
          <div className="form-card col-span-12 md:col-span-4 p-0  ">
            <div className="flex items-center justify-between px-4 pt-6">
              <h4 className="text-sm md:text-base font-medium inline-flex items-center gap-2">
                <span className="text-sky-600">
                  <LuSparkles />
                </span>
                Ideas for next post
              </h4>
              <button
                className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium px-2.5 py-1 rounded hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-sky-200"
                onClick={() =>
                  setOpenBlogPostGenForm({ open: true, data: null })
                }
              >
                Generate New
              </button>
            </div>
            <div>
              {ideaLoading ? (
                <div className="p-5 py-3">
                  <SkeletonLoader />
                </div>
              ) : (
                postIdeas.map((idea, index) => (
                  <BlogPostIdeaCard
                    key={`idea_${index}`}
                    title={idea.title || ""}
                    description={idea.description || ""}
                    tags={idea.tags || []}
                    tone={idea.tone || "casual"}
                    onSelect={() =>
                      setOpenBlogPostGenForm({ open: true, data: idea })
                    }
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        onClose={() => setOpenScapingEnv(false)}
        isOpen={OpenScapingEnv}
        type="BlogView"
        title="WebScraping For Content"
      >
        <CourseScraping
          setPostContent={(title, content) => {
            const postInfo = openBlogPostGenForm?.data || null;
            setPostData((prevState) => ({
              ...prevState,
              title: title || prevState.title,
              content: content,
              tags: postInfo?.tags || prevState.tags,
              generatedByAI: false,
            }));
          }}
          handleCloseForm={() => {
            setOpenScapingEnv(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={openBlogPostGenForm?.open}
        onClose={() => {
          setOpenBlogPostGenForm({ open: false, data: null });
        }}
        hideHeader
        type="Banner"
      >
        <GenerateBlogPostForm
          contentParams={openBlogPostGenForm?.data || null}
          setPostContent={(title, content) => {
            const postInfo = openBlogPostGenForm?.data || null;
            setPostData((prevState) => ({
              ...prevState,
              title: title || prevState.title,
              content: content,
              tags: postInfo?.tags || prevState.tags,
              generatedByAI: true,
            }));
          }}
          handleCloseForm={() => {
            setOpenBlogPostGenForm({ open: false, data: null });
          }}
        />
      </Modal>
      <Modal
        isOpen={DeletePost}
        onClose={(e) => {
          setDeletePost((prev) => !prev), e.stopPropagation();
        }}
        title={`Delete Blog`}
        type={"small"}
      >
        <DeleteBlogFromEdit
          id={postData?.id}
          AssingmentInfo={postData?.title}
          deletePost={(id) => deletePost(id)}
          setDeletePost={setDeletePost}
        />
      </Modal>
    </div>
  );
};

export default EditBlog;
