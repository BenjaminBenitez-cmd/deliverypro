import React from "react";
import { useHistory } from "react-router";
import { MySelect, MyTextInput } from "../components/Fields/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDelivery } from "redux/deliveries/DeliverySlice";

function CreateDelivery() {
  const days = useSelector((state) => state.schedule.days);
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const dispatch = useDispatch();
  const history = useHistory();

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
          id: days.id,
        };
      });
  };

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    street: "",
    district: "",
    delivery_date: "",
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
    phone_number: Yup.string().matches(phoneRegExp, "Invalid Phone Number"),
    street: Yup.string()
      .max(40, "Must be less than 40 characters")
      .required("Required"),
    district: Yup.string().required("Required"),
    description: Yup.string().max(120, "Must be less than 120 characters"),
    delivery_date: Yup.string().required("Required"),
    delivery_time: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          dispatch(addDelivery(values));
          history.push("/admin/deliveries");
          setSubmitting(false);
        }}
      >
        {({ errors, values, touched, setValues }) => (
          <div className="content">
            <Row>
              <Col md="8">
                <Card>
                  <CardHeader>
                    <h5 className="title">Create a Delivery</h5>
                  </CardHeader>
                  <Form>
                    <CardBody>
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
                              <option value="belmopan">Belmopan</option>
                              <option value="cayo">Cayo</option>
                              <option value="corozal">Corozal</option>
                              <option value="belize city">Belize City</option>
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
                            <MySelect label="Delivery Day" name="delivery_date">
                              <option value="">Select a Day</option>
                              {days &&
                                getUniqueDays(days).map((day) => (
                                  <option key={day.id} value={day.name}>
                                    {day.name}
                                  </option>
                                ))}
                            </MySelect>
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="6">
                          <FormGroup>
                            <MySelect
                              label="Delivery Time"
                              name="delivery_time"
                            >
                              <option value="">Select a Time Period</option>
                              {days &&
                                days.map((day) => {
                                  return (
                                    day.name === values.delivery_date && (
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
                    </CardBody>
                    <CardFooter>
                      <Button className="btn-fill" color="info" type="submit">
                        Save
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar"
                          src={require("assets/img/emilyz.jpg").default}
                        />
                        <h5 className="title">Create Delivery</h5>
                      </a>
                      <p className="description">
                        Use this to manually set deliveries
                      </p>
                    </div>
                    <div className="card-description">
                      Do not be scared of the truth because we need to restart
                      the human foundation in truth And I love you like Kanye
                      loves Kanye I love Rick Owens’ bed design but the back
                      is...
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="button-container">
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button className="btn-icon btn-round" color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button className="btn-icon btn-round" color="google">
                        <i className="fab fa-google-plus" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Formik>
    </>
  );
}

export default CreateDelivery;
