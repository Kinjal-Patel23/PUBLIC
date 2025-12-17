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
      .get("http://localhost:5000/api/blogs", { headers: { Authorization: token } })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/blogs/${id}`, { headers: { Authorization: token } })
      .then(() => {
        alert("Blog deleted");
        fetchBlogs(); 
      })
      .catch((err) => alert(err.response?.data?.message || "Delete failed"));
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {blogs.length === 0 ? (
        <p className="col-span-3 text-center text-gray-500">No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="border rounded shadow p-4">
            <img
              src={blog.image || "https://via.placeholder.com/300"}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
            <p className="text-gray-600">{blog.description}</p>
            <p className="text-sm text-gray-500 mt-1">Status: {blog.status}</p>

            <div className="flex justify-between mt-3">
              {/* EDIT BUTTON */}
              {blog.userId?._id === userId && (
                <button
                  className="bg-yellow-400 px-3 py-1 rounded"
                  onClick={() => navigate(`/edit-blog/${blog._id}`)} // <--- navigate to edit page
                >
                  Edit
                </button>
              )}

              {/* DELETE BUTTON */}
              {blog.userId?._id === userId && (
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
