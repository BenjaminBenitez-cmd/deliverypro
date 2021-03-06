import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import { chartExample1 } from "variables/charts.js";
import { useDispatch, useSelector } from "react-redux";
import { getSchedules } from "redux/schedules/ScheduleSlice";
import { getDeliveries } from "redux/deliveries/DeliverySlice";
import { useState } from "react";
import DeliveryOnboardModal from "components/Modals/DeliveryOnboardModal";
import { CompanyRequests } from "apis";

function Dashboard(props) {
  const dispatch = useDispatch();
  const deliveries = useSelector((state) => state.deliveries.deliveries);
  const [isOpen, setIsOpen] = useState(false);

  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  //check if the company has a location
  useEffect(() => {
    const fetchCompanyAddress = async () => {
      try {
        const response = await CompanyRequests.getOne();
        if (
          !response.data.data.company.geolocation ||
          response.data.data.company.geolocation.coordinates.length <= 0
        ) {
          setIsOpen(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompanyAddress();
  }, []);

  useEffect(() => {
    dispatch(getSchedules());
    dispatch(getDeliveries());
  }, [dispatch]);

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart card-plain">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Deliveries</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Total
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Fullfilled
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Canceled
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Pending Deliveries</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-info">
                    <tr>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Date</th>
                      <th className="text-center">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries &&
                      deliveries.map((delivery) => {
                        return (
                          delivery.delivery_status === false && (
                            <tr key={delivery.id}>
                              <td>
                                {delivery.first_name} {delivery.last_name}
                              </td>
                              <td>{delivery.phone_number}</td>
                              <td>{delivery.delivery_day}</td>
                              <td className="text-center">
                                {delivery.district}
                              </td>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {isOpen && (
          <DeliveryOnboardModal
            isOpen={isOpen}
            toggleModal={() => setIsOpen((prev) => (prev = !prev))}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
