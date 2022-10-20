import React from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";

interface EditModalInterface {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

const EditModal = (props: EditModalInterface) => {
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onShow={props.handleShow}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong>Editing Subscriber</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form></Form>
        </Modal.Body>
        <Modal.Footer>
          <Col>
            <Button variant="danger">Delete</Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button className="ms-1 ps-4 pe-4" variant="success">
              Save
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
