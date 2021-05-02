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
import NotificationAlert from "react-notification-alert";
import { DriverRequests} from "../apis";


export default function Drivers () {
    const notificationAlertRef = React.useRef(null);
    const [drivers, setDrivers ] = useState(null);

    useEffect(() => {
        const getDrivers = async () => {
            try {
                const response = await DriverRequests.fetchDrivers();
                setDrivers(response.data.data.drivers);
            } catch(err) {
                setDrivers('No drivers');
            }  
        }
        getDrivers();
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
                alert('yow');
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