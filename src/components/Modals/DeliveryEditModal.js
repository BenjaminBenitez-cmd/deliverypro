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
  Container,
} from "reactstrap";
import * as Yup from "yup";
import useFilterDays from "hooks/useFilterDays";
import { useDispatch } from "react-redux";
import { updateDelivery } from "redux/deliveries/DeliverySlice";
import Map from "../Maps/Map";
import { useState } from "react";

const DeliveryEditModal = ({ isOpen, toggleModal, information }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const stepUp = () => {
    if (step > 3) {
      return setStep((prev) => (prev = 1));
    }
    setStep((prev) => prev + 1);
  };
  const stepDown = () => setStep((prev) => prev - 1);
  const [location, setLocation] = useState({
    street: information.street,
    district: information.district,
    longitude: information.geolocation.coordinates[0],
    latitude: information.geolocation.coordinates[1],
  });
  const initialValues = {
    first_name: information.first_name,
    last_name: information.last_name,
    email: information.email,
    phone_number: information.phone_number,
    description: information.description,
    delivery_day: information.delivery_day,
    delivery_time: information.delivery_time,
  };

  const updateLocation = (location) => {
    setLocation((prev) => {
      return { ...prev, ...location };
    });
  };

  const { deliveryUniqueDays, days, deliveryDayToText, deliveryTimeToText } =
    useFilterDays();
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .max(20, "Must be less than 20 characters")
      .required("Required"),
    last_name: Yup.string()
      .max(20, "Must be less than 20 characters")
      .required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phone_number: Yup.string().matches(phoneRegExp, "Invalid Phone Number"),
    description: Yup.string()
      .max(120, "Must be less than 120 characters")
      .nullable(true),
    delivery_day: Yup.number().required("Required"),
    delivery_time: Yup.number().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    debugger;
    const combinedValues = { ...values, ...location };
    dispatch(updateDelivery({ id: information.id, body: combinedValues }));
    setSubmitting(false);
    toggleModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      modalClassName="modal-black"
      size="lg"
      style={{ marginTop: "-100px" }}
    >
      <div className="modal-header mb-3">
        <h2 className="modal-title" id="exampleModalLabel">
          Confirm {information.first_name}'s address
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <>
            <Form>
              <ModalBody>
                {step === 1 && (
                  <>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <MyTextInput
                            label="First Name"
                            name="first_name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <MyTextInput
                            label="Last Name"
                            name="last_name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <MyTextInput
                            label="Email"
                            name="email"
                            type="email"
                          />
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
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <MyTextInput
                            label="Description"
                            name="description"
                            type="text"
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
                            <option value={values.delivery_time}>
                              {deliveryTimeToText(values.delivery_time)}
                            </option>
                            {days &&
                              days.map((day) => {
                                return (
                                  day.name_of_day_id ===
                                    values.delivery_day && (
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
                )}
                {step === 2 && (
                  <Container>
                    <Row>
                      <Map
                        longitude={information.geolocation.coordinates[0]}
                        latitude={information.geolocation.coordinates[1]}
                        draggable={true}
                        search={true}
                        mapStyle="tall"
                        updateLocation={updateLocation}
                      />
                    </Row>
                  </Container>
                )}
              </ModalBody>
              <ModalFooter className="p-3">
                <Button
                  color="secondary"
                  onClick={step === 2 ? stepDown : toggleModal}
                >
                  {step === 2 ? "Go back" : "Close"}
                </Button>
                {step === 1 && (
                  <Button
                    className="btn-fill"
                    type="button"
                    color="info"
                    onClick={stepUp}
                  >
                    Next
                  </Button>
                )}
                {step === 2 && (
                  <Button className="btn-fill" type="submit" color="info">
                    Save
                  </Button>
                )}
              </ModalFooter>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default DeliveryEditModal;
