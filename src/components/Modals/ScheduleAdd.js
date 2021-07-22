import {
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import { Form, Formik } from "formik";
import { MyTextInput } from "components/Fields/Input";
import { ScheduleRequests } from "apis";
import * as Yup from "yup";

const ScheduleAddModal = ({ isOpen, toggleModal }) => {
  const initialValues = { name: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(60, "Must be less than 60 characters")
      .required("Name is required"),
  });

  const addASchedule = async (values) => {
    try {
      await ScheduleRequests.createOne(values);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    addASchedule(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        size="md"
        modalClassName="modal-black"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="exampleModalLabel">
            Add a Schedule
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
        <Form>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <MyTextInput
                    label="Name"
                    name="name"
                    placeholder="name"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="p-4">
            <Button
              color="secondary"
              className="btn-secondary btn-simple"
              onClick={toggleModal}
            >
              Close
            </Button>
            <Button
              color="primary"
              type="submit"
              className="btn-primary btn-simple"
              onClick={toggleModal}
            >
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Formik>
  );
};

export default ScheduleAddModal;
