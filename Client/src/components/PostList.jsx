import React from "react";
import { useBlog } from "../context/Blog.context";
import { useModal } from "../context/Modal.Context";
import DeleteModal from "./Modal";

const PostList = () => {
  const { posts, setSelectedPost } = useBlog();
  const { handleOpenModal } = useModal();

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleString("en-GB", options)
      .replace(/\b(am|pm)\b/gi, (match) => match.toUpperCase());
  };

  return (
    <>
      <div className="my-8">
        <h2 className="text-2xl mb-4">Posts</h2>

        {posts.map((post) => (
          <div
            className="mb-4 p-4 border border-gray-300 rounded"
            key={post.id}
          >
            <h3 className="text-xl mb-2">
              {post.title}{" "}
              <span className=" text-xs text-gray-500">
                {post.edited ? "(Edited)" : ""}
              </span>
            </h3>
            <p className="mb-4">{post.content}</p>

            <div className="flex justify-between items-center">
              <span className="text-sm mt-3 text-gray-500">
                Created Date : {formatDate(post.created_at)}
              </span>
              <div className="btn-container">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-400 "
                  onClick={() => setSelectedPost(post)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-400 "
                  onClick={() => handleOpenModal(post)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal />
    </>
  );
};

export default PostList;
