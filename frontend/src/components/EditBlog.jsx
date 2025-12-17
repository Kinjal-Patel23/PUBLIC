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
      .get(`http://localhost:5000/api/blogs`, { headers: { Authorization: token } })
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

  // Handle update
  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5000/api/blogs/${id}`,
        { title, image, description, status },
        { headers: { Authorization: token } }
      )
      .then(() => {
        alert("Blog updated successfully");
        navigate("/blogs"); // redirect to blog list
      })
      .catch(() => alert("Error updating blog"));
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option>Draft</option>
        <option>Published</option>
      </select>

      <button
        onClick={handleUpdate}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Update Blog
      </button>
    </div>
  );
};

export default EditBlog;
