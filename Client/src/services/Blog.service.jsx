import { api_url } from "../env/devURL";
import axios from "axios";
import { ShowErrorMessage, ShowSuccessMessage } from "./Toasts.service";

const getBlogs = async () => {
  try {
    const response = await axios.get(api_url);
    return response.data;
  } catch (error) {
    ShowErrorMessage("Failed to Fetch Data");
    throw error;
  }
};

const createBlogs = async (data) => {
  try {
    const response = await axios.post(api_url, data);
    ShowSuccessMessage("Blog Created Successfully");
    return response.data;
  } catch (error) {
    ShowErrorMessage("Failed to Create Blog");
    throw error;
  }
};

const updateBlogs = async (id, data) => {
  try {
    const response = await axios.put(`${api_url}/${id}`, data);
    ShowSuccessMessage("Blog Updated Successfully");
    return response.data;
  } catch (error) {
    ShowErrorMessage("Failed to Update Blog");
    throw error;
  }
};

const deleteBlogs = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/${id}`);
    ShowSuccessMessage("Blog Deleted Successfully");
    return response.data;
  } catch (error) {
    ShowErrorMessage("Failed to Delete Blog");
    throw error;
  }
};

export { getBlogs, createBlogs, updateBlogs, deleteBlogs };
