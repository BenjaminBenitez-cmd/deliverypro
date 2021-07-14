import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import SearchFilter from "components/Fields/SearchFilter";
import DeliveryTable from "components/Tables/DeliveryTable";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveries } from "redux/deliveries/DeliverySlice";

export default function Deliveries() {
  const dispatch = useDispatch();
  const { deliveries, status } = useSelector((state) => state.deliveries);

  useEffect(() => {
    dispatch(getDeliveries());
  }, [dispatch]);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Row>
              <Col>
                <SearchFilter />
              </Col>
            </Row>
          </Col>
          <Col md="12">
            <DeliveryTable deliveries={deliveries} status={status} />
          </Col>
        </Row>
      </div>
    </>
  );
}
