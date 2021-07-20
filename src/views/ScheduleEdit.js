import { getSchedules } from "redux/schedules/ScheduleSlice";
import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

const ScheduleEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { daysAvailable, schedules } = useSelector((state) => state.schedule);

  const filterByID = (array, id) => {
    const schedule = array.find((schedule) => schedule.id === id);
    return schedule;
  };

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  return (
    <div className="content">
      <Card className="card-plain">
        <CardHeader>
          {/* <CardTitle tag="h4">{schedules}</CardTitle> */}
        </CardHeader>
        <CardBody>
          <Container fluid className="p-0">
            <Row>
              <Card className="card-plain">
                {schedules && (
                  <ScheduleContainer
                    daysAvailable={daysAvailable}
                    schedule={filterByID(schedules, id)}
                  />
                )}
              </Card>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default ScheduleEdit;
