import { MyTextInput, MySelect } from "../Fields/Input";
import { Formik, Form } from "formik";
import { Button, Modal, ModalBody, Row, Col, ModalFooter } from "reactstrap";
import * as Yup from "yup";

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

export default DeliveryEditModal;
