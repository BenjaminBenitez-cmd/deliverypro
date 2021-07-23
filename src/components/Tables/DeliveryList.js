import { Button } from "reactstrap";
import React from "react";
import { Card, CardBody, CardFooter, Table } from "reactstrap";
import TableRow from "./DeliveryTableRow";

const MapDeliveryList = ({ deliveries, handleToggle, activeID }) => {
  return (
    <Card className="card-plain">
      <CardBody>
        <Table className="table-sorter" striped>
          <tbody>
            {deliveries &&
              deliveries.map((delivery) => (
                <TableRow
                  key={delivery.id}
                  handleToggle={handleToggle}
                  {...delivery}
                />
              ))}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>
        <Button color="success">Generate</Button>
      </CardFooter>
    </Card>
  );
};

export default MapDeliveryList;
