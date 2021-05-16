import React, { useEffect } from "react";

import { Row, Col } from "reactstrap";

import SearchFilter from "components/Fields/SearchFilter";
import DeliveryTable from "components/Tables.js/DeliveryTable";
import FilterSideBar from "components/Sidebar/FilterSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveries } from "redux/deliveries/DeliverySlice";
import Loading from "components/loading/Loading";

export default function Deliveries() {
  const dispatch = useDispatch();
  const { deliveries, status } = useSelector((state) => state.deliveries);

  useEffect(() => {
    dispatch(getDeliveries());
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="3">
            <Row>
              <Col>
                <SearchFilter />
              </Col>
            </Row>
            <Row>
              <Col>
                <FilterSideBar />
              </Col>
            </Row>
          </Col>
          <Col md="9">
            <Loading status={status}>
              <DeliveryTable deliveries={deliveries} />
            </Loading>
          </Col>
        </Row>
      </div>
    </>
  );
}
