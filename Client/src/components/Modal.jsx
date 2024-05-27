import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useModal } from "../context/Modal.Context";
import { useBlog } from "../context/Blog.context";

const DeleteModal = () => {
  const { isOpen, postToDelete, handleCloseModal } = useModal();
  const { deletePost } = useBlog();

  const handleDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete.id);
    }
    handleCloseModal();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      center
      closeOnOverlayClick={false}
      showCloseIcon={false}
      closeOnEsc={false}
    >
      <h2>Are you sure you want to delete this post?</h2>
      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-400"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
          onClick={handleDelete}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
