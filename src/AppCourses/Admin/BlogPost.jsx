import { useState, useEffect} from "react";
import { LuGalleryVerticalEnd, LuLoaderCircle, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AxiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";
import Tabs from "./Components/Tabs";
import BlogPostSummaryCard from "./Components/BlogPostSummaryCard";
import Modal from "../../DashBoard/Modals/Modal";
import DeleteCard from "../../Collaboration/Components/Cards/DeleteCard";


const BlogPosts = () => {
  const navigate = useNavigate()
  const [tabs, settabs] = useState([])
  const [filterStatus, setFilterStatus] = useState("All");
  const [blogPostList, setBlogPostList] = useState([]);
  const [BlogDetails, setBlogDetails] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert,   setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  
    

  
  
  
  
  const getAllPosts = async (pageNumber = 1) => {
    try {
    setIsLoading(true);

     const response = await AxiosInstance.get(`${API_PATH.BLOG.GET_ALL_POSTS}`, {
        params: { page: pageNumber, status: filterStatus },
      });
      console.log(response);
      

    const { posts, totalPages, counts } = response.data;
    
    setBlogPostList((prevPosts) =>
      pageNumber === 1 ? posts : [...prevPosts, ...posts]
    );
    setTotalPages(totalPages);
    setPage(pageNumber);
    const statusSummary = counts || {};
    const statusArray = [
      { label: "All", count: statusSummary.all || 0 },
      { label: "Published", count: statusSummary.published || 0 },
      { label: "Draft", count: statusSummary.draft || 0 },
    ];
    settabs(statusArray);
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    setIsLoading(false);
  }
  };

  const handleLoadMore = ()=>{
    if (page < totalPages)
    {
      getAllPosts(page+1)
    }
  }


  

  const deletePost = async (postId) => {
    try {
      await AxiosInstance.delete(API_PATH.BLOG.DELETE_POST(postId))
      toast.success("Post deleted successfully!");
      getAllPosts(page);
    } catch (error) {
      toast.error("Failed to delete post!");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts(1);
  }, [filterStatus]);

  return (
    <div className="w-auto sm:max-w-[900px] mx-auto  ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mt-5 mb-5">Blog Posts</h2>
        <button
          className="flex item-center gap-2  bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium px-3 py-1.5 rounded hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-sky-200"

          onClick={() => navigate("/Admin/CreateBlog")}
        >
          <LuPlus className="text-[18px]" /> Create Post
        </button>
      </div>
  
      <Tabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />

        <div className="mt-5">
          {blogPostList?.map((post ,index) => (
            <BlogPostSummaryCard
          
              content= {post}
              id={post?._id}
              title={post?.title}
              imgUrl={post?.coverImageUrl}
              updatedOn={
                post?.updatedAt ? moment(post?.updatedAt).format("Do MMM YYYY") : "N/A"
              }
              tags={post?.tags}
              likes={post?.likes}
              views={post?.views}
              onClick={() => navigate(`/admin/edit/${post.slug}`)}
              onDelete={(id)=> deletePost(id)}
              getAllPosts={getAllPosts}
              
            />
          ))}
        </div>

        {
          page !== totalPages && (
            <div className="flex items-center justify-center mb-8">
              <button
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 rounded-full text-nowrap hover:scale-105 transition-all cursor-pointer"
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                {isLoading ? (
                  <>
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                    Loading...
                  </>
                ) : (
                  <>
                    <LuGalleryVerticalEnd className="text-lg" />
                    Load More
                  </>
                )}
              </button>
            </div>
          )
        }
      
      

    </div>
  );
};

export default BlogPosts;
