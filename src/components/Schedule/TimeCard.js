import React from "react";
import { Col, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteTime } from "../../redux/schedules/ScheduleSlice";

const TimeCard = ({ time_start, time_end, id }) => {
  //DELETE A TIME
  const dispatch = useDispatch();

  return (
    <>
      <Col xs={5} className="my-1">
        <Input type="time" value={time_start} />
      </Col>
      <Col xs={5} className="my-1">
        <Input type="time" value={time_end} />
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
    </>
  );
};

export default TimeCard;
