import React from 'react';
import Modal from 'react-modal';
import "./ConfirmModal.css"

Modal.setAppElement('#root');

export const ConfirmationModal = ({ isOpen, onRequestClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onRequestClose();

  };

  return (
    <Modal
      isOpen={isOpen}
      className="Modal"
      overlayClassName="Overlay"
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
    >
      <h2>¿ELIMINAR EL EVENTO?</h2>
      <div className="modalButtonContainer">
      <button onClick={handleDelete}>Sí, borrar.</button>
      <button onClick={onRequestClose}>No, espera.</button>
      </div>
    </Modal>
  );
};
