import DropdownCard from "components/Sidebar/DropdownCard";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { addTime } from "redux/schedules/ScheduleSlice";

const AddTimeCard = ({ schedule_id, name_of_day_id }) => {
  //DISPATCH ADD SCHEDULE
  const dispatch = useDispatch();
  //STATE FOR THE TIME FORM
  const [formData, setFormData] = useState({ time_start: "", time_end: "" });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const values = {
    schedule_id,
    name_of_day_id,
    ...formData,
  };

  return (
    <DropdownCard className="card-plain" label="Add new">
      <Container fluid>
        <Row>
          <Col xs={5}>
            <Input
              type="time"
              name="time_start"
              onChange={handleFormChange}
              value={formData.time_start}
            />
          </Col>
          <Col xs={5}>
            <Input
              type="time"
              name="time_end"
              onChange={handleFormChange}
              value={formData.time_end}
            />
          </Col>
          <Col sm={2}>
            <Button
              className="btn-link"
              color="primary"
              onClick={() => dispatch(addTime(values))}
            >
              <i className="tim-icons icon-check-2"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </DropdownCard>
  );
};

export default AddTimeCard;
