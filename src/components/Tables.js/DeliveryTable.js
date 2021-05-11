import React, { useState } from "react";
import useGetDeliveries from "hooks/useGetDeliveries";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  Modal,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import { statustoText } from "../../utilities/utilities";
import { Form, Formik } from "formik";
import { MyTextInput } from "components/Fields/Input";
import * as Yup from "yup";
import { MySelect } from "components/Fields/Input";
import { useDispatch } from "react-redux";
import { toggleDelivery } from "features/deliveries/DeliverySlice";

const DeliveryTable = () => {
  const dispatch = useDispatch();
  const { deliveries } = useGetDeliveries();
  const [isOpen, setIsOpen] = useState(false);
  const [delivery, setDelivery] = useState({});

  //handle the toggling of the individual deliveries
  const handleToggleOpen = (id) => {
    if (id) {
      setDelivery(deliveries.find((delivery) => delivery.id === id));
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Deliveries</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>Fullfilled</th>
                <th>Delivery Status</th>
                <th>Name</th>
                <th>Delivery On</th>
                <th>Phone Number</th>
                <th>Street</th>
                <th>District</th>
              </tr>
            </thead>
            <tbody>
              {deliveries &&
                deliveries.map((node, index) => (
                  <tr key={node.id} onClick={() => handleToggleOpen(node.id)}>
                    <td>
                      <CustomInput
                        type="switch"
                        id={`switch-${node.id}`}
                        onClick={() => dispatch(toggleDelivery(node.id))}
                      />
                    </td>
                    <td>{statustoText(node.delivery_status)}</td>
                    <td>
                      {node.first_name} {node.last_name}
                    </td>
                    <td>
                      {node.delivery_day} {node.time_start} : {node.time_start}
                    </td>
                    <td>{node.phone_number}</td>
                    <td>{node.street}</td>
                    <td>{node.district}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {isOpen && (
        <DeliveryModal
          isOpen={isOpen}
          toggleModal={handleToggleOpen}
          information={delivery}
        />
      )}
    </>
  );
};

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

const DeliveryEditModal = ({ isOpen, toggleModal, information }) => (
  <>
    <Formik
      initialValues={{
        phone_number: "",
        street: "",
        district: "",
        delivery_date: "",
        delivery_time: "",
      }}
      validationSchema={Yup.object({
        phone_number: Yup.string()
          .max(20, "Phone number must be less than 20 Characters")
          .required("required"),
        street: Yup.string()
          .max(40, "Must be less than 20 characters")
          .required("Required"),
        district: Yup.string()
          .max(20, "Must be less than 20 characters")
          .required("Required"),
        delivery_date: Yup.string()
          .max(30, "Must be less than 30 characters")
          .required("Required"),
        delivery_time: Yup.string()
          .max(30, "Must be less than 20 characters")
          .required("Required"),
      })}
      onSubmit={() => {
        console.log("submited hurray");
      }}
    >
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Benjamin's information
          </h5>
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
          <Form>
            <Row>
              <Col sm={6}>
                <MyTextInput
                  label="phone"
                  type="text"
                  value="6500343"
                  name="phone_number"
                />
                <MyTextInput
                  label="Street"
                  type="text"
                  value="Pasadita Street"
                  name="street"
                />
                <MySelect label="Province" name="district">
                  <option value="">Select a District</option>
                  <option value="belmopan">Belmopan</option>
                  <option value="cayo">Cayo</option>
                  <option value="corozal">Corozal</option>
                  <option value="belize city">Belize City</option>
                </MySelect>
              </Col>
              <Col sm={6}>
                <MyTextInput
                  label="Delivery Date"
                  type="date"
                  value="2021-09-12"
                  name="delivery_date"
                />
                <MyTextInput
                  label="Time"
                  type="time"
                  value="12:34:00"
                  name="delivery_time"
                />
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter className="p-4">
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button color="primary">Edit</Button>
        </ModalFooter>
      </Modal>
    </Formik>
  </>
);

export default DeliveryTable;
