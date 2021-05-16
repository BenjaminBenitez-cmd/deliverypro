import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  CustomInput,
} from "reactstrap";
import { statustoText } from "../../utilities/utilities";
import { useDispatch } from "react-redux";
import { toggleDelivery } from "redux/deliveries/DeliverySlice";
import DeliveryModal from "components/Modals/DeliveryDetailsModal";

const DeliveryTable = ({ deliveries }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [delivery, setDelivery] = useState({});

  //handle the toggling of the individual deliveries
  const handleToggleOpen = (id) => {
    if (id) {
      setDelivery(deliveries.find((delivery) => delivery.id === id));
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Deliveries</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
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
                deliveries.map((node, index) => (
                  <tr key={node.id} onClick={() => handleToggleOpen(node.id)}>
                    <td>
                      <CustomInput
                        type="switch"
                        id={`switch-${node.id}`}
                        onClick={() => dispatch(toggleDelivery(node.id))}
                      />
                    </td>
                    <td>{statustoText(node.delivery_status)}</td>
                    <td>
                      {node.first_name} {node.last_name}
                    </td>
                    <td>
                      {node.delivery_day} {node.time_start} : {node.time_start}
                    </td>
                    <td>{node.phone_number}</td>
                    <td>{node.street}</td>
                    <td>{node.district}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {isOpen && (
        <DeliveryModal
          isOpen={isOpen}
          toggleModal={handleToggleOpen}
          information={delivery}
        />
      )}
    </>
  );
};

export default DeliveryTable;
