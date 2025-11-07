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
import Modal from "../../DashBoard/Modals/Modal"
import CourseScraping from "./CourseScraping";

const EditBlog = ({ isEdit }) => {
  const navigate = useNavigate();
  const { postSlug = "" } = useParams();

  const [OpenScapingEnv, setOpenScapingEnv] = useState(false)
  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: "",
    isDraft: "",
    generatedByAI: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });
  const [ideaLoading, setIdeaLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(true);
  const [postIdeas, setpostIdeas] = useState([])
  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({ ...prevData, [key]: value }));
  };

  // Generate Blog Post Ideas Using AI
  // Generate Blog Post Ideas Using AI
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


  // Handle Blog Post Publish
  const handlePublish = async (isDraft) => {};

  // Get Post Data By Slug
  const fetchPostDetailsBySlug = async () => {};

  // Delete Blog Post
  const deletePost = async () => {};

//   useEffect(() => {
//     if (isEdit) {
//       fetchPostDetailsBySlug();
//     } else {
//       generatePostIdeas();
//     }
//     return () => {};
    
//   }, []);

    return (

    <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12  my-4 ">
            <div className="form-card p-6 col-span-12 md:col-span-8 border border-dotted border-sky-500 p-3 rounded-md">
                <div className="flex items-center justify-between">
                <h2 className="text-base md:text-lg font-medium ">
                    {!isEdit ? "Add New Post" : "Edit Post"}
                </h2>

                <div className="flex items-center gap-3">
                    {isEdit && (
                    <button
                        className="flex items-center gap-2.5 text-[13px] font-medium text-rose-500 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-rose-50 hover:border-rose-300 cursor-pointer hover:scale-[1.02] transition-all  "
                        disabled={loading}
                        onClick={() => setOpenDeleteAlert(true)}
                    >
                        <LuTrash2 className="text-sm" />
                        <span className="hidden md:block">Delete</span>
                    </button>
                    )}

                    
                    <button
                    className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all   "
                    disabled={loading}
                    onClick={() => setOpenScapingEnv(true)}
                    >
                    <BrushCleaning  className="size-4"/>
                    <span>Scrap Content</span>
                    </button>


                    <button
                    className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all   "
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

                {error && (
                <p className="text-red-500 text-xs pb-2.5">{error}</p>
                )}

                <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                    Post Title
                </label>
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
                    <label className="text-xs font-medium text-slate-600">
                        Tags
                    </label>

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
                            Ideas for  next post
                        </h4>
                        <button
                            className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium px-2.5 py-1 rounded hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-sky-200"
                            onClick={() => setOpenBlogPostGenForm({ open: true, data: null })}
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
                            onSelect={() => setOpenBlogPostGenForm({ open: true, data: idea })}
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
            type=""
            title="WebScraping For Content"
        >
           <CourseScraping/>
        </Modal>
    </div>

    );
};

export default EditBlog;
