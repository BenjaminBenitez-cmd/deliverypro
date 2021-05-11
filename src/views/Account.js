import React, { useEffect, useState } from "react";
import { MyTextInput } from "../components/Fields/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Row,
  Col,
  NavItem,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Input,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  CardTitle,
  Table,
} from "reactstrap";
import { getUserFromLocalStorage } from "utilities/utilities";
import { CompanyRequests } from "apis";
import { UserRequests } from "apis";
import GenerateToken from "components/Modals/GenerateToken";

const information = {
  user: {
    first_name: "Benjamin",
    last_name: "Benitez",
    phone: "6530203",
    email: "amaryllis@amaryllis.com",
  },
  company: {
    name: "Amaryllis Belize",
    location: "San Lazaro Village, Orange Walk",
    access_token: "3932402938jdurdfm032232",
  },
};

function Account() {
  //State for switching between active windows
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="2">
            <Card className="card-user">
              <CardBody>
                <Nav vertical tag="nav">
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        toggle("1");
                      }}
                      href="#"
                      active
                    >
                      Account
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        toggle("2");
                      }}
                      href="#"
                    >
                      Access Token
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <AccountDetails information={information} />
              </TabPane>
              <TabPane tabId="2">
                <APISection />
              </TabPane>
            </TabContent>
          </Col>
          <GenerateToken />
        </Row>
      </div>
    </>
  );
}

const AccountDetails = ({ information }) => {
  //Toggle the access token visibiltiy
  const [view, SetView] = useState(false);
  const [initialValues, SetInitialValues] = useState(null);

  const handleViewToggle = () => {
    SetView((prev) => !prev);
  };

  const validationSchema = Yup.object({
    user_name: Yup.string()
      .max(40, "Must be less than 40 characters")
      .required("Required"),
    company_name: Yup.string()
      .max(20, "Must be less than 20 characters")
      .required("Required"),
    company_location: Yup.string()
      .max(40, "Must be less than 30 characters")
      .required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      await UserRequests.updateUser(values);
      SetInitialValues((prev) => {
        return {
          ...prev,
          values,
        };
      });
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await CompanyRequests.getCompanyRequest();
        const { location, name } = response.data.data.company;
        SetInitialValues((prev) => {
          return {
            ...prev,
            user_name: getUserFromLocalStorage().user.name,
            email: getUserFromLocalStorage().user.email,
            company_name: name,
            company_location: location,
          };
        });
      } catch (error) {
        alert("An error occured");
      }
    };
    fetchCompanyDetails();
  }, []);

  return (
    initialValues && (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Card>
            <CardHeader>
              <h5 className="title">Account Information</h5>
            </CardHeader>
            <Form>
              <CardBody>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <MyTextInput
                        label="User Name"
                        name="user_name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label htmlFor="email">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={values.email}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <MyTextInput
                        label="Company Name"
                        name="company_name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="6">
                    <FormGroup>
                      <MyTextInput
                        label="Street"
                        name="company_location"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup className="input-group">
                      <label htmlFor="access_token">Access Token</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {view ? (
                              <i
                                onClick={handleViewToggle}
                                className="fa fa-eye-slash"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i
                                onClick={handleViewToggle}
                                className="fa fa-eye"
                                aria-hidden="true"
                              ></i>
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value="7df78dfs08fdf"
                          label="Access Token"
                          name="access_token"
                          readOnly
                          type={view ? "text" : "password"}
                        />
                      </InputGroup>
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
        )}
      </Formik>
    )
  );
};

const APISection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      {isOpen && <GenerateToken toggleOpen={toggleOpen} isOpen={isOpen} />}
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Tokens</CardTitle>
        </CardHeader>
        <CardBody>
          <div>
            <Button
              className="float-right"
              color="primary"
              onClick={toggleOpen}
            >
              Generate <i className="tim-icons icon-simple-add"></i>
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>API keys</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Backend API</td>
                <td>fdsjlk *********</td>
                <td>
                  <Button color="danger">Delete</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default Account;
