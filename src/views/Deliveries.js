import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import SearchFilter from "components/Fields/SearchFilter";
import DeliveryTable from "components/Tables/DeliveryTable";
import { useDispatch, useSelector } from "react-redux";
import { getDeliveries } from "redux/deliveries/DeliverySlice";
import { useHistory } from "react-router-dom";
import { setMessage } from "redux/notifications/NotificationsSlice";
import { getSchedules } from "redux/schedules/ScheduleSlice";

export default function Deliveries() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { deliveries, status } = useSelector((state) => state.deliveries);
  const activeSchedule = useSelector((state) => state.schedule.active);
  const days = useSelector((state) => state.schedule.active?.time);

  useEffect(() => {
    dispatch(getDeliveries());
    dispatch(getSchedules());
  }, [dispatch]);

  useEffect(() => {
    if (!activeSchedule || !days) {
      history.push("/admin/schedule");
      dispatch(
        setMessage(
          "You need a schedule with days before you can add deliveries"
        )
      );
    }
  }, [days, history, dispatch, activeSchedule]);

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
