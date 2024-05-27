import React, { useEffect, useState } from "react";
import { useBlog } from "../context/Blog.context";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createPost, UpdatePost, selectedPost, setSelectedPost } = useBlog();

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedPost) {
      const res = await UpdatePost(selectedPost.id, title, content);
      setSelectedPost(null);
      return res;
    } else {
      const res = await createPost(title, content);
      setTitle("");
      setContent("");
      return res;
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    setSelectedPost(null);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div className="my-6">
        <h2 className="text-2xl mb-4">
          {selectedPost ? "Edit Post" : "Create a New Post"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 rounded">
              Title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="title"
              name="title"
              placeholder="Enter the Title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          {/* content */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 rounded">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the Content"
              value={content}
              onChange={handleContentChange}
              required
            ></textarea>
          </div>

          {/* Submit or Cancel Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              {selectedPost ? "Update" : "Submit"}
            </button>

            {selectedPost && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default PostForm;
