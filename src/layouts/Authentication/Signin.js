import { AuthRequests } from "../../apis";
import { MyTextInput } from "components/Fields/Input";
import { authenticate } from "redux/auth/AuthSlice";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { setUserToLocalStorage } from "utilities/utilities";
import * as Yup from "yup";

const Signin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  //initial values to pass into formik
  const initialValues = { email: "", password: "" };

  //validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short use a longer password")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await AuthRequests.signin(values);
      setUserToLocalStorage(response.data.data);
      dispatch(authenticate());
      setLoading(false);
      // history.push("/admin/dashboard");
    } catch (error) {
      setServerError(error.response?.data.message || "Something went wrong");
      setSubmitting(false);
      setLoading(false);
    }
  };

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
                  <CardTitle tag="h1">Sign in</CardTitle>
                </CardHeader>
                <CardBody>
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
                  {serverError && <div>{serverError}</div>}
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="info" className="btn-block">
                    {loading ? "Loading..." : "Login"}
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

export default Signin;
