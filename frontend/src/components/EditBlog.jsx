import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const blog = res.data.find((b) => b._id === id);
        if (blog) {
          setTitle(blog.title);
          setImage(blog.image);
          setDescription(blog.description);
          setStatus(blog.status);
        } else {
          alert("Blog not found");
          navigate("/blogs");
        }
      })
      .catch(() => {
        alert("Error fetching blog");
        navigate("/blogs");
      });
  }, [id, token, navigate]);

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5000/api/blogs/${id}`,
        { title, image, description, status },
        { headers: { Authorization: token } }
      )
      .then(() => {
        alert("Blog updated successfully");
        navigate("/blogs");
      })
      .catch(() => alert("Error updating blog"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-100 via-gray-100 to-pink-50 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Edit Blog
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Update your blog details
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <textarea
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition resize-none"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition bg-white"
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full mt-6 bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition shadow-md"
        >
          Update Blog
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
