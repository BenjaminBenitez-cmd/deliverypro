import React, { useContext } from "react";
import { useHistory } from "react-router";
import { MySelect, MyTextInput } from "../components/Fields/Input";
import { Formik, Form } from 'formik';
import * as Yup from "yup";
//Notification alert 
import NotificationAlert from "react-notification-alert";
//Delivery context
import { DeliveryContext } from "contexts/DeliveryContext";

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

function CreateDelivery() {
  const notificationAlertRef = React.useRef(null);
  const history = useHistory();

  const notify = (place, message, type) => {     
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type || "info",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  return (
    <>
      <Formik
        initialValues={{ first_name: '', last_name: '', email: '', phone_number: '', street: '', district: '', delivery_date:'', delivery_time: '', }}
        validationSchema={Yup.object({
          first_name: Yup.string()
          .max(20, 'Must be less than 20 characters')
          .required('Required'),
          last_name: Yup.string()
          .max(20, 'Must be less than 20 characters')
          .required('Required'),
          email: Yup.string()
          .email('Invalid Email')
          .required('Required'),
          phone_number: Yup.string()
          .matches(phoneRegExp, 'Invalid Phone Number'),
          street: Yup.string()
          .max(40, 'Must be less than 40 characters')
          .required('Required'),
          district: Yup.string()
          .required('Required'),
          description: Yup.string()
          .max(120, 'Must be less than 120 characters'),
          delivery_date: Yup.date('Invalid date')
          .required('Required'),
          delivery_time: Yup.string()
          .required('Required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // const response = await DeliveryFinder.post('/', values);
            // if(response.status === 201) {
            //   notify('br', response.data.status);
            //   addDelivery(response.data.data.delivery);
            //   history.push('/deliveries');
            // } else {
            //   notify('br', 'Unable to add delivery', 'danger');
            // }
            notify('br', 'Testing out the Notification', 'info');
            setSubmitting(false);
            history.push('/admin/deliveries');
          } catch(err) {
            console.log(err);
          }
        }}
      >
      <div className="content">
        
        <Row>
          <div className="react-notification-alert-container">
              <NotificationAlert ref={notificationAlertRef} />
          </div>
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
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <MySelect label='District' name='district'>
                            <option value="">Select a District</option>
                            <option value="belmopan">Belmopan</option>
                            <option value="cayo">Cayo</option>
                            <option value="corozal">Corozal</option>
                            <option value="belize city">Belize City</option>
                          </MySelect>
                        </FormGroup>
                      </Col>
                      <Col md="8">
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
                          <MyTextInput
                            label="Delivery Date"
                            name="delivery_date"
                            type="date"  
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Delivery Time</label>
                          <MyTextInput
                            label="Delivery Time"
                            name="delivery_time"
                            type="time"  
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
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
                  <p className="description">Use this to manually set deliveries</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
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

    </Formik>
    </>
  );
}




export default CreateDelivery;
