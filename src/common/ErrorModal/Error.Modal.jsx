import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../pages/errorModalSlice';
import Modal from 'react-bootstrap/Modal';

export const ErrorModal = () => {
  const isOpen = useSelector((state) => state.errorModal.isOpen);
  const message = useSelector((state) => state.errorModal.message);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
