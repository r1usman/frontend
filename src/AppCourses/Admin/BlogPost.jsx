import { useState, useEffect} from "react";
import { LuGalleryVerticalEnd, LuLoaderCircle, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const BlogPosts = () => {
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState("All");
  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${API_PATHS.GET_POSTS}`, {
        params: { page: pageNumber, status: filterStatus },
      });
      setBlogPostList(response.data.posts || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      toast.error("Failed to fetch posts!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axiosInstance.delete(`${API_PATHS.DELETE_POST}/${postId}`);
      toast.success("Post deleted successfully!");
      getAllPosts(page);
    } catch (error) {
      toast.error("Failed to delete post!");
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getAllPosts(1);
  // }, [filterStatus]);

  return (
    <div className="w-auto sm:max-w-[900px] mx-auto  ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mt-5 mb-5">Blog Posts</h2>
        <button
          className="btn-small flex items-center gap-2"
          onClick={() => navigate("/Admin/CreateBlog")}
        >
          <LuPlus className="text-[18px]" /> Create Post
        </button>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LuLoaderCircle className="animate-spin text-3xl text-gray-500" />
          </div>
        ) : blogPostList.length > 0 ? (
          blogPostList.map((post) => (
            <div
              key={post._id}
              className="border-b py-3 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {moment(post.createdAt).format("MMM D, YYYY")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/admin/edit/${post._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setOpenDeleteAlert({ open: true, data: post._id })
                  }
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>

      {openDeleteAlert.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="text-gray-600"
                onClick={() => setOpenDeleteAlert({ open: false, data: null })}
              >
                Cancel
              </button>
              <button
                className="text-red-600"
                onClick={() => {
                  deletePost(openDeleteAlert.data);
                  setOpenDeleteAlert({ open: false, data: null });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
