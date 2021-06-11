import React from "react";
import { MySelect, MyTextInput } from "../Fields/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Col,
  FormGroup,
  Modal,
  ModalBody,
  Row,
  Button,
  ModalFooter,
} from "reactstrap";
import { addDelivery } from "redux/deliveries/DeliverySlice";
import { useDispatch, useSelector } from "react-redux";
import { getNextDay } from "utilities/utilities";

const DeliveryAddModal = ({ isOpen, toggleModal }) => {
  const days = useSelector((state) => state.schedule.days);
  const dispatch = useDispatch();

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    street: "",
    district: "",
    delivery_day: "",
    delivery_time: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .max(20, "Must be less than 20 characters")
      .required("Required"),
    last_name: Yup.string()
      .max(20, "Must be less than 20 characters")
      .required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phone_number: Yup.string()
      .matches(phoneRegExp, "Invalid Phone Number")
      .required("Required"),
    street: Yup.string()
      .max(40, "Must be less than 40 characters")
      .required("Required"),
    district: Yup.string().required("Required"),
    description: Yup.string().max(120, "Must be less than 120 characters"),
    delivery_day: Yup.number().required("Required"),
    delivery_time: Yup.number().required("Required"),
  });

  console.log(initialValues);

  const onSubmit = async (values, { setSubmitting }) => {
    //Calculate the next delivery date using the delivery_day
    let newValues = {
      ...values,
      delivery_date: getNextDay(values.delivery_day),
    };
    dispatch(addDelivery(newValues));
    alert(JSON.stringify(newValues));
    setSubmitting(false);
    toggleModal();
  };

  //function to sort the unique days
  const getUniqueDays = (array) => {
    return array
      .filter(
        (
          (set) => (f) =>
            !set.has(f.name) && set.add(f.name)
        )(new Set())
      )
      .map((days) => {
        return {
          name: days.name,
          id: days.name_of_day_id,
        };
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({ values }) => (
        <Modal
          isOpen={isOpen}
          toggle={toggleModal}
          modalClassName="modal-black"
          size="lg"
          style={{ marginTop: "-105px" }}
        >
          {console.log(values)}

          <div className="modal-header mb-3">
            <h2 className="modal-title" id="exampleModalLabel">
              Add a delivery
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
                <Col md="12">
                  <FormGroup>
                    <MyTextInput
                      label="street"
                      name="street"
                      placeholder="Street Address"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-md-1" md="6">
                  <FormGroup>
                    <MySelect label="District" name="district">
                      <option value="">Select a District</option>
                      <option value="Belize City">Belize City</option>
                      <option value="San Ignacio">San Ignacio</option>
                      <option value="Corozal">Corozal</option>
                      <option value="Orange Walk">Orange Walk</option>
                      <option value="Toledo">Toledo</option>
                      <option value="San Pedro">San Pedro</option>
                    </MySelect>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <MyTextInput
                      label="Special Remarks"
                      name="description"
                      cols="80"
                      placeholder="Any special remarks"
                      rows="4"
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="pr-md-1" md="6">
                  <FormGroup>
                    <MySelect label="Delivery Day" name="delivery_day">
                      <option value="">Select a Day</option>
                      {days &&
                        getUniqueDays(days).map((day) => (
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
    />
  );
};

export default DeliveryAddModal;
