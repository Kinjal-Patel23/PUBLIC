const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// ADD BLOG
router.post("/add", (req, res) => {
    const { title, image, description, status } = req.body;

    Blog.create({
        title,
        image,
        description,
        status,
        userId: req.userId,
    })
        .then((blog) => res.json(blog))
        .catch(() => res.json({ message: "Blog not added" }));
});

// GET ALL BLOGS
router.get("/", (req, res) => {
    Blog.find()
        .populate("userId", "name")
        .then((blogs) => res.json(blogs))
        .catch(() => res.json({ message: "Error...!!" }));
});

// DELETE BLOG 
router.delete("/:id", (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            if (!blog) return res.json({ message: "Blog not found" });

            blog.deleteOne().then(() => res.json({ message: "Blog deleted" }));
        })
        .catch(() => res.json({ message: "Error...!!" }));
});

// UPDATE BLOG 
router.put("/:id",  (req, res) => {
  const { title, image, description, status } = req.body;

  Blog.findById(req.params.id)
    .then((blog) => {
      if (!blog) return res.json({ message: "Blog not found" });

      blog.title = title;
      blog.image = image;
      blog.description = description;
      blog.status = status;

      blog.save().then((updatedBlog) => res.json(updatedBlog));
    })
    .catch(() => res.json({ message: "Error updating blog" }));
});


module.exports = router;
