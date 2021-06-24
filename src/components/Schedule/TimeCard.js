import React, { useState } from "react";
import { Col, Input, Button, Row, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteTime, updateTime } from "../../redux/schedules/ScheduleSlice";

const TimeCard = ({ time_start, time_end, id }) => {
  //DELETE A TIME
  const dispatch = useDispatch();

  const [time, setTime] = useState({ time_start, time_end, id });
  const [touched, setTouched] = useState(false);

  const handleTimeChange = (e) => {
    setTouched(true);
    setTime((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmitChanges = async () => {
    if (!time.time_start || !time.time_end) {
      return console.error("Missing fields");
    }

    let id = time.id;
    let body = { time_start: time.time_start, time_end: time.time_end };

    dispatch(updateTime({ id, body }));
  };

  return (
    <Container>
      <Row>
        <Col xs={5} className="my-1">
          <Input
            type="time"
            value={time_start}
            name="time_start"
            onChange={handleTimeChange}
          />
        </Col>
        <Col xs={5} className="my-1">
          <Input
            type="time"
            value={time_end}
            name="time_end"
            onChange={handleTimeChange}
          />
        </Col>
        <Col xs={2}>
          {touched ? (
            <Button
              className="btn-link"
              color="success"
              onClick={() => handleSubmitChanges()}
            >
              <i className="tim-icons icon-check-2"></i>
            </Button>
          ) : (
            <Button
              className="btn-link"
              color="primary"
              onClick={() => dispatch(deleteTime(id))}
            >
              <i className="tim-icons icon-simple-remove"></i>
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TimeCard;
