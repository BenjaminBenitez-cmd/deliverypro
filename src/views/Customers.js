import React, { useEffect, useState } from "react";
import { CustomerRequests } from "../apis";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

const Customers = () => {
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await CustomerRequests.getOne();
        setCustomer(response.data.data.customers);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCustomers();
  }, []);

  if (customers.length <= 0) {
    return (
      <div className="content d-flex justify-content-center align-items-center">
        <div className="h5 text-white">
          No customers, create your first delivery to view
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <Row>
        <Col sm={12}>
          <Card className="card-plain">
            <CardHeader>
              <CardTitle tag="h4">Customers</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-info">
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>email</th>
                    <th>Pending</th>
                    <th>Fullfulled</th>
                  </tr>
                </thead>
                <tbody>
                  {customers &&
                    customers.map((node, index) => (
                      <tr key={index}>
                        <td>{node.first_name}</td>
                        <td>{node.last_name}</td>
                        <td>{node.email}</td>
                        <td>
                          <span className="text-info">
                            {node.pending_deliveries}
                          </span>
                        </td>
                        <td>
                          <span className="text-success">
                            {node.completed_deliveries}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Customers;
