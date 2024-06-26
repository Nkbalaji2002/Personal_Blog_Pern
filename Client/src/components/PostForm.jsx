import React, { useEffect, useState } from "react";
import { useBlog } from "../context/Blog.context";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
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

    if (!title) {
      setError("Please add a title field");
      return;
    }

    if (!content) {
      setError2("Please add a content field");
      return;
    }

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
    setError("");
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setError2("");
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
          <div className="mb-3">
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
            />
          </div>

          {/* Error Messages */}
          {error && <p className="text-red-500 mb-3">{error}</p>}

          {/* content */}
          <div className="mb-3">
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
            ></textarea>
          </div>

          {/* Error Messages */}
          {error2 && <p className="text-red-500 mb-3">{error2}</p>}

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
