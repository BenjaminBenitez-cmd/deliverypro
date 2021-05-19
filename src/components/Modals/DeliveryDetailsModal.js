import { ScheduleRequests } from "apis";
import Map from "components/Maps/Map";
import { useEffect, useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import DeliveryEditModal from "./DeliveryEditModal";

const DeliveryDetailsModal = ({ isOpen, toggleModal, information }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [deliveryTime, setDeliveryTime] = useState(null);

  const handleToggle = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  // useEffect(() => {
  //   const fetchTime = async () => {
  //     try {
  //       const response = await ScheduleRequests.fetchTime(information.id);
  //       setDeliveryTime(response.data.data.time);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchTime();
  // }, [information.id]);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
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
                <strong>Buyer </strong>
                {information.first_name + " " + information.last_name}
              </div>
              <div className="py-2">
                <strong>Email</strong> {information.email}
              </div>
              <div className="py-2">
                <strong>Phone Number</strong> {information.phone_number}
              </div>
              <div className="py-2">
                <strong>Delivery Time period</strong>{" "}
                {information.time_start + " to " + information.time_end}
              </div>
              <div className="py-2">
                <strong>Location</strong>{" "}
                {information.street + ", " + information.district}
              </div>
            </Col>
            <Col sm={6}>
              <Map />
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

export default DeliveryDetailsModal;
