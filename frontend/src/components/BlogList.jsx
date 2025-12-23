import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios
      .get("http://localhost:5000/api/blogs", {
        headers: { Authorization: token },
      })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        alert("Blog deleted");
        fetchBlogs();
      })
      .catch((err) => alert(err.response?.data?.message || "Delete failed"));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-gray-100 to-pink-50 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Blogs
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={blog.image || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                  {blog.description}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Status:{" "}
                  <span className="font-medium">{blog.status}</span>
                </p>

                {blog.userId?._id === userId && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-400 hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
