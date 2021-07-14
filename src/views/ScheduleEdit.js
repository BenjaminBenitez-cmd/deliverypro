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
import { ScheduleRequests } from "apis";
import { useParams } from "react-router-dom";

const ScheduleEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState(null);
  const [days, setDays] = useState(null);
  const [dates, setDates] = useState(null);

  //fetch the schedule by id
  const fetchSchedule = async (id) => {
    try {
      const response = await ScheduleRequests.getOne(id);
      setDays(response.data.data.schedule.days);
      setDates(response.data.data.days_available);
      setName(response.data.data.schedule.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchSchedule(id);
  }, [id]);

  return (
    <div className="content">
      <Card className="card-plain">
        <CardHeader>
          <CardTitle tag="h4">{name}</CardTitle>
        </CardHeader>
        <CardBody>
          <Container fluid className="p-0">
            <Row>
              <Card className="card-plain">
                <ScheduleContainer dates={dates} days={days} id={id} />
              </Card>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default ScheduleEdit;
