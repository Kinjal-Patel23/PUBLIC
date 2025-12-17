import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddBlog = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");

  const handleSubmit = () => {
    const blogData = {
      title,
      image,
      description,
      status,
    };

    axios
      .post("http://localhost:5000/api/blogs/add", blogData, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        alert("Blog added successfully");
        navigate("/blogs"); // redirect to blog list
      })
      .catch(() => {
        alert("Error adding blog");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Blog</h2>

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
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Submit Blog
      </button>
    </div>
  );
};

export default AddBlog;
