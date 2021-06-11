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
  Button,
} from "reactstrap";
import { statustoText } from "../../utilities/utilities";
import { useDispatch, useSelector } from "react-redux";
import { toggleDelivery } from "redux/deliveries/DeliverySlice";
import DeliveryDetailsModal from "components/Modals/DeliveryDetailsModal";
import LoadingSpinner from "components/loading/LoadingSpinner";
import useFilterDays from "../../hooks/useFilterDays";
import ExcelConverter from "components/utils/ExcelConverter";
import { deleteDelivery } from "redux/deliveries/DeliverySlice";

const DeliveryTable = ({ deliveries, status }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [delivery, setDelivery] = useState({});
  // const schedule = useSelector((state) => state.schedule);

  const { deliveryDayToText, deliveryTimeToText } = useFilterDays();

  const { value, data } = useSelector((state) => state.deliveries.filter);

  //filter any deliveries based on values and data
  const filterDeliveries = () => {
    if (!value || !data) return deliveries;
    return deliveries.filter((item) =>
      item[data].toLowerCase().includes(value.toLowerCase())
    );
  };

  //Map the deliveries to their respective time and day by using the id
  const generateDeliveries = (deliveries) => {
    return deliveries.map((item) => {
      return {
        ...item,
        delivery_day: deliveryDayToText(item.delivery_day),
        delivery_time: deliveryTimeToText(item.delivery_time),
      };
    });
  };

  //handle the toggling of the individual deliveries
  const handleToggleOpen = (id) => {
    if (id) {
      setDelivery(deliveries.find((delivery) => delivery.id === id));
    }
    setIsOpen(!isOpen);
  };

  const handleDeleteDelivery = (id, e) => {
    dispatch(deleteDelivery(id));
    e.stopPropagation();
  };

  //if loading display an indicator
  if (status === "loading") {
    return <LoadingSpinner />;
  } else if (status === "failed") {
    return (
      <div className="h-100 d-flex justify-content-center align-items-end">
        <p className="h5 text-white">An Error occurred, report to developer</p>
      </div>
    );
  } else if (deliveries.length <= 0) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-end">
        <p className="h5 text-white">No deliveries added, add some : )</p>
      </div>
    );
  }

  const TableRow = ({
    id,
    delivery_status,
    first_name,
    last_name,
    delivery_day,
    delivery_time,
    phone_number,
    street,
    district,
  }) => (
    <tr key={id} onClick={() => handleToggleOpen(id)}>
      <td>
        <FormGroup check>
          <Label check>
            <Input
              onChange={() => dispatch(toggleDelivery(id))}
              checked={delivery_status}
              type="checkbox"
            />
            <span className="form-check-sign" />
          </Label>
        </FormGroup>
      </td>
      <td>{statustoText(delivery_status)}</td>
      <td>
        {first_name} {last_name}
      </td>
      <td>
        {deliveryDayToText(delivery_day)} {deliveryTimeToText(delivery_time)}
      </td>
      <td>
        <p className="text-muted">{phone_number}</p>
      </td>
      <td>{street}</td>
      <td>{district}</td>
      <td>
        <Button
          type="button"
          className="btn btn-danger"
          onClick={(e) => handleDeleteDelivery(id, e)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );

  return (
    <>
      <Card className="card-plain">
        <CardHeader>
          <CardTitle tag="h4">Deliveries</CardTitle>
          {/* <ExcelConverter
            csvData={generateDeliveries(deliveries)}
            fileName={"deliveries"}
          /> */}
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
                filterDeliveries().map((delivery) => (
                  <TableRow {...delivery} />
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
