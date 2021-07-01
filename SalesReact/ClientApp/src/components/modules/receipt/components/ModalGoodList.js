import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { GoodList } from '../../good/components/GoodList';

export function ModalGoodList({onSelected}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const onInternalSelected = (res) => {
    handleClose();
    onSelected(res);
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add good
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add good</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <GoodList disableEdit={true} onSelected={onInternalSelected}></GoodList>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
