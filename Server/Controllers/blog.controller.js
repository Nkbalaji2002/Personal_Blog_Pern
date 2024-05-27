const blogsModel = require("../Models/blog.model.js");

// get the tasks
const getPosts = async (req, res) => {
  try {
    const posts = await blogsModel.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// post the tasks
const addPosts = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required fields",
      });
    }

    const newBlog = await blogsModel.addPosts(title, content);

    if (!newBlog) {
      return res.status(500).json({
        message: "Failed to add task",
      });
    } else {
      return res.status(201).json({
        message: "Blog Created Successfully",
      });
    }
  } catch (error) {
    console.error("Error Adding Task :", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update a task
const EditPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (title === undefined || content === undefined) {
      return res.status(400).json({
        message: "title and content are required fields for updating a post",
      });
    }

    const updatedBlog = await blogsModel.updatePosts(id, title, content);

    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not Updated",
      });
    } else {
      return res.status(200).json({
        message: "Blog updated successfully",
      });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a task
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await blogsModel.deletePosts(id);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    } else {
      return res.status(200).json({
        message: "Blog Deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPosts,
  addPosts,
  EditPosts,
  deletePost,
};
