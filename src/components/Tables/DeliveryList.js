import { Button } from "reactstrap";
import React from "react";
import { Card, CardBody, CardFooter, Table } from "reactstrap";
import TableRow from "./DeliveryTableRow";

const MapDeliveryList = ({
  deliveries,
  handleToggle,
  activeID,
  setGenerate,
  generate,
}) => {
  return (
    <Card
      className="card-plain position-absolute left-0"
      style={{ width: "200px", top: "90px" }}
    >
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
        <Button color="info" onClick={() => setGenerate(true)}>
          {generate ? "Generating..." : "Generate"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MapDeliveryList;
