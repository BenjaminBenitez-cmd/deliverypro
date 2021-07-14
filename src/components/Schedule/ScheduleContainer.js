import LoadingSpinner from "components/loading/LoadingSpinner";
import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import AddTimeCard from "./AddTimeCard";
import TimeCard from "./TimeCard";

const ScheduleContainer = ({ dates, days, id }) => {
  return (
    <Container fluid className="p-0">
      <Row>
        <Card className="card-plain">
          <Container>
            {dates &&
              dates.map((date, index) => (
                <Col sm={6} key={index}>
                  <Row>
                    <Col sm={12} className="mb-2">
                      <p>{date.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    {days &&
                      days.map((time, index) => {
                        return (
                          time.name_of_day_id.toString() === date.id && (
                            <TimeCard key={index} {...time} />
                          )
                        );
                      })}
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <AddTimeCard
                        schedule_id={id}
                        name_of_day_id={date.id}
                        name={date.name}
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
          </Container>
        </Card>
      </Row>
    </Container>
  );
};

export default ScheduleContainer;
