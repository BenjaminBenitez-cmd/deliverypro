import { MyTextInput, MySelect } from "../Fields/Input";
import { Formik, Form } from "formik";
import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import * as Yup from "yup";
import useFilterDays from "hooks/useFilterDays";
import { useDispatch } from "react-redux";
import { updateDelivery } from "redux/deliveries/DeliverySlice";
import Map from "../Maps/Map";
import { useState } from "react";

const DeliveryEditModal = ({ isOpen, toggleModal, information }) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { deliveryUniqueDays, days, deliveryDayToText } = useFilterDays();
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const initialValues = {
    first_name: information.first_name,
    last_name: information.last_name,
    email: information.email,
    phone_number: information.phone_number,
    description: information.description,
    delivery_day: information.delivery_day,
    delivery_time: information.delivery_time,
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .max(20, "Must be less than 20 characters")
      .required("Required"),
    last_name: Yup.string()
      .max(20, "Must be less than 20 characters")
      .required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phone_number: Yup.string().matches(phoneRegExp, "Invalid Phone Number"),
    description: Yup.string().max(120, "Must be less than 120 characters"),
    delivery_day: Yup.number().required("Required"),
    delivery_time: Yup.number().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    alert(JSON.stringify(values));
    dispatch(updateDelivery({ id: information.id, body: values }));
    setSubmitting(false);
    toggleModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Modal
          isOpen={isOpen}
          toggle={toggleModal}
          modalClassName="modal-black"
          size="lg"
          style={
            ({ marginTop: "-105px" }, step === 1 && { backgroundColor: "red" })
          }
        >
          <div className="modal-header mb-3">
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
          <Form>
            <ModalBody>
              <EditDeliveryDetailsForm
                deliveryDayToText={deliveryDayToText}
                deliveryUniqueDays={deliveryUniqueDays}
                values={{ delivery_day: 3 }}
                days={days}
              />
              <Row>
                <Map
                  longitude={information.geolocation.coordinates[0]}
                  latitude={information.geolocation.coordinates[1]}
                  draggable={true}
                  search={true}
                />
              </Row>
            </ModalBody>
            <ModalFooter className="p-3">
              <Button color="secondary" onClick={toggleModal}>
                Close
              </Button>
              <Button className="btn-fill" color="primary" type="submit">
                Save
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

const EditDeliveryDetailsForm = (
  deliveryDayToText,
  days,
  values,
  deliveryUniqueDays
) => (
  <>
    <Row>
      <Col className="pr-md-1" md="6">
        <FormGroup>
          <MyTextInput label="First Name" name="first_name" type="text" />
        </FormGroup>
      </Col>
      <Col className="px-md-1" md="6">
        <FormGroup>
          <MyTextInput label="Last Name" name="last_name" type="text" />
        </FormGroup>
      </Col>
      <Col className="pr-md-1" md="6">
        <FormGroup>
          <MyTextInput label="Email" name="email" type="email" />
        </FormGroup>
      </Col>
      <Col className="px-md-1" md="6">
        <FormGroup>
          <MyTextInput
            label="Phone Number"
            placeholder="xxx xxx xxxx"
            name="phone_number"
            type="tel"
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col className="pr-md-1" md="6">
        <FormGroup>
          <MySelect label="Delivery Day" name="delivery_day">
            <option value={values.delivery_day}>
              {deliveryDayToText(values.delivery_day)}
            </option>
            {days &&
              deliveryUniqueDays().map((day) => (
                <option key={day.id} value={day.id}>
                  {day.name}
                </option>
              ))}
          </MySelect>
        </FormGroup>
      </Col>
      <Col className="px-md-1" md="6">
        <FormGroup>
          <MySelect label="Delivery Time" name="delivery_time">
            <option value="">Select a Time Period</option>
            {days &&
              days.map((day) => {
                return (
                  day.name_of_day_id === values.delivery_day && (
                    <option key={day.id} value={day.id}>
                      {day.time_start + " to " + day.time_end}
                    </option>
                  )
                );
              })}
          </MySelect>
        </FormGroup>
      </Col>
    </Row>
  </>
);

export default DeliveryEditModal;
