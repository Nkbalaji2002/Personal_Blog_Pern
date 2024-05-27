import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createBlogs,
  deleteBlogs,
  getBlogs,
  updateBlogs,
} from "../services/Blog.service";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const responseData = await getBlogs();
      setPosts(responseData);
    } catch (error) {
      console.error("Error fetching data :", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (title, content) => {
    try {
      const responseData = await createBlogs({ title, content });
      if (responseData) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error Adding Data :", error);
    }
  };

  const UpdatePost = async (id, title, content) => {
    try {
      const responseData = await updateBlogs(id, { title, content });
      if (responseData) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error Update Data :", error);
    }
  };

  const deletePost = async (id) => {
    try {
      const responseData = await deleteBlogs(id);
      if (responseData) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error Delete Data :", error);
    }
  };

  return (
    <>
      <BlogContext.Provider
        value={{
          posts,
          selectedPost,
          setSelectedPost,
          createPost,
          UpdatePost,
          deletePost,
        }}
      >
        {children}
      </BlogContext.Provider>
    </>
  );
};

export const useBlog = () => useContext(BlogContext);
