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
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  //initial values to pass into formik
  const initialValues = { password: "", repeatpassword: "" };

  //validation
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Must be 8 or more characters")
      .required("Required"),
    repeatpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setServerMessage("");
      setLoading(true);
      await AuthRequests.resetpassword({ password: values.password }, token);
      setLoading(false);
      setServerMessage("Password has been reset");
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
                  <CardTitle tag="h1">Reset Password</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <MyTextInput
                      label="Password"
                      type="password"
                      name="password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <MyTextInput
                      label="Repeat Password"
                      type="password"
                      name="repeatpassword"
                    />
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

export default ResetPassword;
