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

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  //initial values to pass into formik
  const initialValues = { email: "" };

  //validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setServerMessage("");
      setLoading(true);
      await AuthRequests.forgotPassword(values);
      setLoading(false);
      setServerMessage("An email has been sent to your inbox!");
    } catch (error) {
      setServerMessage(error.response.data.message || "Something went wrong");
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
                  <CardTitle tag="h1">Forgot Password</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <MyTextInput label="Email" type="email" name="email" />
                  </FormGroup>
                  {serverMessage && <div>{serverMessage}</div>}
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="info" className="btn-block">
                    {loading ? "Loading..." : "Submit"}
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

export default ForgotPassword;
