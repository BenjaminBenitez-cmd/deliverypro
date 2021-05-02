/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useSelector } from "react-redux";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Container, CardTitle, Table } from "reactstrap";



function Map() {
  const deliveries = useSelector(state => state.deliveries.deliveries);


  const filterPending = (array) => {
    console.log(deliveries);
    return array.filter((item) => item.delivery_status === false);
  }


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Delivery Map</CardHeader>
                <CardBody>
                    <Row>
                      <Col sm={4}>
                        <MapDeliveryList deliveries={filterPending(deliveries)}/>
                      </Col>
                      <Col sm={8}>
                      </Col>
                    </Row>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}


const MapDeliveryList = ({ deliveries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">Deliveries</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="table-full-width table-repsonsive">
          <Table>
            <tbody>
              {
                deliveries && deliveries.map(delivery => (
                  <tr key={delivery.id} className="card-plain">
                    <td>
                      <p className="title">{delivery.first_name + '' + delivery.last_name}</p>
                      <p className="text-muted">{delivery.street + ', ' + delivery.district}</p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

export default Map;
