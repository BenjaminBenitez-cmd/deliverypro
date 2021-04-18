import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { MyTextInput } from '../components/Fields/Input';
import * as Yup from 'yup';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    FormGroup,
    CardFooter,
} from "reactstrap";
import DriverFinder from 'apis/DriverFinder';
import UserFinder from 'apis/UserFinder';
import NotificationAlert from "react-notification-alert";



export default function Drivers () {
    const notificationAlertRef = React.useRef(null);
    const [drivers, setDrivers ] = useState(null);
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

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await DriverFinder.get('/');
                setDrivers(response.data.data.drivers);
            } catch(err) {
                setDrivers('No drivers');
            }  
        }
        fetchDrivers();
    }, [])
    return (
        <>
         <Formik
            initialValues={{ name: '', email: '' }}
            validationSchema={Yup.object({
            name: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const response = await UserFinder.post('/invites/', values);
                    if(response.status === 201) {
                        notify('br', response.data.message, 'info')
                    } else {
                        notify('br', response.data.message, 'danger')
                    }
                    setSubmitting(false);
                } catch (err) {
                    notify('br', JSON.stringify(err), 'danger')
                }        
            }}
        >
            <div className="content">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref={notificationAlertRef} />
                </div>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Drivers</CardTitle>
                            </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                                <tr>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    drivers && drivers.map(driver => (
                                        <tr key={driver.id}>
                                            <td>{driver.name}</td>
                                            <td>{driver.phone}</td>
                                            <td>{driver.email}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </Table>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">    
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Invite a Driver</CardTitle>
                            </CardHeader>
                            <Form>
                                <CardBody>
                                        <Row>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <MyTextInput  
                                                        label="Name"
                                                        name="name"
                                                        type="text"
                                                    />                                   
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup>
                                                <MyTextInput  
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                    />                                                           
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary" type="submit">
                                        Invite
                                    </Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Formik>
        

        </>
    )
}