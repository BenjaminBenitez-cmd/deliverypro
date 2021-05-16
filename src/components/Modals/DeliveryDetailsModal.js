import { useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import DeliveryEditModal from "./DeliveryEditModal";

const DeliveryModal = ({ isOpen, toggleModal, information }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleToggle = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <div className="modal-header">
          <h2 className="modal-title" id="exampleModalLabel">
            {information.first_name} {information.last_name}
          </h2>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={toggleModal}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <ModalBody>
          <Row>
            <Col sm={6}>
              <div className="py-2">
                <strong>Buyer</strong>{" "}
                {information.first_name + " " + information.last_name}
              </div>
              <div className="py-2">
                <strong>Email</strong> {information.email}
              </div>
              <div className="py-2">
                <strong>Phone Number</strong> {information.phone_number}
              </div>
              <div className="py-2">
                <strong>Delivery On</strong> {information.delivery_date}
              </div>
              <div className="py-2">
                <strong>Location</strong>{" "}
                {information.street + ", " + information.district}
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="p-4">
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button color="primary" onClick={handleToggle}>
            Edit
          </Button>
        </ModalFooter>
      </Modal>
      {isEditModalOpen && (
        <DeliveryEditModal
          isOpen={isEditModalOpen}
          toggleModal={handleToggle}
          information={{ hello: "hello" }}
        />
      )}
    </>
  );
};

export default DeliveryModal;
