import { getSchedules } from "redux/schedules/ScheduleSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
} from "reactstrap";
import ScheduleContainer from "components/Schedule/ScheduleContainer";

const Schedule = () => {
  const dispatch = useDispatch(getSchedules);
  const { dates, days, id, status } = useSelector((state) => state.schedule);

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  return (
    <div className="content">
      <Card className="card-plain">
        <CardHeader>
          <CardTitle tag="h4">Schedule</CardTitle>
        </CardHeader>
        <CardBody>
          <Container fluid className="p-0">
            <Row>
              <Card className="card-plain">
                <ScheduleContainer
                  dates={dates}
                  days={days}
                  id={id}
                  status={status}
                />
              </Card>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default Schedule;
