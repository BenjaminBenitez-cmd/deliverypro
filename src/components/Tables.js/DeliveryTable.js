import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { statustoText } from "../../utilities/utilities";
import { useDispatch } from "react-redux";
import { toggleDelivery } from "redux/deliveries/DeliverySlice";
import DeliveryDetailsModal from "components/Modals/DeliveryDetailsModal";
import LoadingSpinner from "components/loading/LoadingSpinner";
import useFilterDays from "../../hooks/useFilterDays";

const DeliveryTable = ({ deliveries, status }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [delivery, setDelivery] = useState({});
  // const schedule = useSelector((state) => state.schedule);

  const { deliveryDayToText, deliveryTimeToText } = useFilterDays();
  //handle the toggling of the individual deliveries
  const handleToggleOpen = (id) => {
    if (id) {
      setDelivery(deliveries.find((delivery) => delivery.id === id));
    }
    setIsOpen(!isOpen);
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  } else if (status === "failed") {
    return <div>An Error occurred, report to developer</div>;
  }

  return (
    <>
      <Card className="card-plain">
        <CardHeader>
          <CardTitle tag="h4">Deliveries</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive striped>
            <thead className="text-primary">
              <tr>
                <th>Fullfilled</th>
                <th>Delivery Status</th>
                <th>Name</th>
                <th>Delivery On</th>
                <th>Phone Number</th>
                <th>Street</th>
                <th>District</th>
              </tr>
            </thead>
            <tbody>
              {deliveries &&
                deliveries.map((node) => (
                  <tr key={node.id} onClick={() => handleToggleOpen(node.id)}>
                    <td>
                      <FormGroup check>
                        <Label check>
                          <Input
                            onChange={() => dispatch(toggleDelivery(node.id))}
                            checked={node.delivery_status}
                            type="checkbox"
                          />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </td>
                    <td>{statustoText(node.delivery_status)}</td>
                    <td>
                      {node.first_name} {node.last_name}
                    </td>
                    <td>
                      {deliveryDayToText(node.delivery_day)}{" "}
                      {deliveryTimeToText(node.delivery_time)}
                    </td>
                    <td>
                      <p className="text-muted">{node.phone_number}</p>
                    </td>
                    <td>{node.street}</td>
                    <td>{node.district}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {isOpen && (
        <DeliveryDetailsModal
          isOpen={isOpen}
          toggleModal={handleToggleOpen}
          information={delivery}
        />
      )}
    </>
  );
};

export default DeliveryTable;
