import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <Modal show={isOpen} onHide={onCancel}>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>No</Button>
        <Button variant="primary" onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
