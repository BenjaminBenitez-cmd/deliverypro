import { AuthRequests } from "../../apis";
import { MyTextInput } from "components/Fields/Input";
import { authenticate } from "redux/auth/AuthSlice";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Row,
} from "reactstrap";
import { setUserToLocalStorage } from "utilities/utilities";
import * as Yup from "yup";

const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short use a longer password")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await AuthRequests.signinUserRequest(values);
      setUserToLocalStorage(response.data.data);
      dispatch(authenticate());
      history.push("/admin/dashboard");
    } catch (error) {
      setServerError(error.response.data.message);
      setSubmitting(false);
    }
  };

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      <div className="wrapper">
        <Row>
          <Col sm={6}>
            <Card className="card-user mx-4">
              <CardHeader>
                <CardTitle tag="h5">Sign Up</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <MyTextInput label="Email" type="email" name="email" />
                  </FormGroup>
                  <FormGroup>
                    <MyTextInput
                      label="password"
                      type="password"
                      name="password"
                    />
                  </FormGroup>
                  <Button type="submit">Login</Button>
                  {serverError && <div>{serverError}</div>}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Formik>
  );
};

export default Signin;
