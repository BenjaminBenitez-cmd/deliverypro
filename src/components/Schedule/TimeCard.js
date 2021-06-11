import React from "react";
import { Col, Input, Button, Row, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteTime } from "../../redux/schedules/ScheduleSlice";

const TimeCard = ({ time_start, time_end, id }) => {
  //DELETE A TIME
  const dispatch = useDispatch();

  return (
    <Container key={id}>
      <Row>
        <Col xs={5} className="my-1">
          <Input type="time" value={time_start} readOnly />
        </Col>
        <Col xs={5} className="my-1">
          <Input type="time" value={time_end} readOnly />
        </Col>
        <Col xs={2}>
          <Button
            className="btn-link"
            color="primary"
            onClick={() => dispatch(deleteTime(id))}
          >
            <i className="tim-icons icon-simple-remove"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TimeCard;
