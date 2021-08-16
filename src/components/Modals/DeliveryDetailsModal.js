import { useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import DeliveryEditModal from "./DeliveryEditModal";
import useFilterDays from "../../hooks/useFilterDays";

const DeliveryDetailsModal = ({ isOpen, toggleModal, information }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [deliveryTime, setDeliveryTime] = useState(null);

  const { deliveryDayToText, deliveryTimeToText } = useFilterDays();

  const handleToggle = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal} size="md">
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
              <section>
                <div>
                  <p className="title">Buyer </p>
                  <p> {information.first_name + " " + information.last_name}</p>
                </div>
                <div>
                  <p className="title">Email</p>
                  <p className="text-muted">{information.email}</p>
                </div>
                <div>
                  <p className="title">Phone Number</p>
                  <p className="text-muted">{information.phone_number}</p>
                </div>
              </section>
            </Col>
            <Col sm={6}>
              <section>
                <div className="py-2">
                  <p className="title">Delivery Time period</p>
                  <p className="text-muted">
                    {deliveryTimeToText(information.delivery_time)}
                  </p>
                </div>
                <div className="py-2">
                  <p className="title">Delivery Day</p>
                  <p className="text-muted">
                    {deliveryDayToText(information.delivery_day)}
                  </p>
                </div>
              </section>
              <section>
                <div className="py-2">
                  <p className="title">Location</p>{" "}
                  <p>{information.street + ", " + information.district}</p>
                </div>
              </section>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="p-4">
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button color="info" onClick={handleToggle}>
            Edit
          </Button>
        </ModalFooter>
      </Modal>
      {isEditModalOpen && (
        <DeliveryEditModal
          isOpen={isEditModalOpen}
          toggleModal={handleToggle}
          information={information}
        />
      )}
    </>
  );
};

export default DeliveryDetailsModal;
