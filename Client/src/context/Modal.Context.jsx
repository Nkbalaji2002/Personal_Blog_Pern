import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleOpenModal = (post) => {
    setPostToDelete(post);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setPostToDelete(null);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, postToDelete, handleOpenModal, handleCloseModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
