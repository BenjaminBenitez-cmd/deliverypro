import { AuthRequests } from "../../apis";
import { MyTextInput } from "components/Fields/Input";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import * as Yup from "yup";

const Signup = () => {
  const [serverError, setServerError] = useState("");
  //state for success page
  const [showSuccess, setShowSuccess] = useState(false);

  //initial values to pass into formik
  const initialValues = {
    email: "",
    password: "",
    company: "",
    phone_number: "",
    name: "",
  };

  //validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required"),
    name: Yup.string()
      .max(60, "Please use a shorter name")
      .required("Required"),
    company: Yup.string()
      .max(100, "Company name is too long")
      .required("Required"),
    phone_number: Yup.string()
      .max(100, "Invalid phone number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password is too short use a longer password")
      .required("Required"),
  });

  //dispatch
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await AuthRequests.signup(values);
      setShowSuccess(true);
      setSubmitting(false);
    } catch (error) {
      setServerError(error.response.data.message);
      setSubmitting(false);
    }
  };

  if (showSuccess === true) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <h1 className="h5 text-white">
          An activation link has been sent to your email inbox.
        </h1>
      </div>
    );
  }

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      <div className="wrapper">
        <Container>
          <Row className="justify-content-center align-items-center vh-100">
            <Form>
              <Card
                className="card-login card-white"
                style={{ minWidth: "300px" }}
              >
                <CardHeader>
                  <CardTitle tag="h1">Sign Up</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <MyTextInput label="Email" type="email" name="email" />
                  </FormGroup>
                  <FormGroup>
                    <MyTextInput label="Name" type="text" name="name" />
                  </FormGroup>
                  <FormGroup>
                    <MyTextInput
                      label="Phone Number"
                      type="text"
                      name="phone_number"
                    />
                  </FormGroup>
                  <FormGroup>
                    <MyTextInput
                      label="password"
                      type="password"
                      name="password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <MyTextInput label="company" type="text" name="company" />
                  </FormGroup>
                  {serverError && <div>{serverError}</div>}
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="success" className="btn-block">
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Row>
        </Container>
      </div>
    </Formik>
  );
};

export default Signup;
