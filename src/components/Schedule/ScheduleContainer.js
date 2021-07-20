import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import AddTimeCard from "./AddTimeCard";
import TimeCard from "./TimeCard";

const ScheduleContainer = ({ schedule, daysAvailable }) => {
  return (
    <Container fluid className="p-0">
      <Row>
        <Card className="card-plain">
          <Container>
            {daysAvailable &&
              daysAvailable.map((daysAvailable, index) => (
                <Col sm={6} key={index}>
                  <Row>
                    <Col sm={12} className="mb-2">
                      <p>{daysAvailable.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    {schedule.time &&
                      schedule.time.map((time, index) => {
                        return (
                          time.name_of_day_id.toString() ===
                            daysAvailable.id && (
                            <TimeCard key={index} {...time} />
                          )
                        );
                      })}
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <AddTimeCard
                        schedule_id={schedule.id}
                        name_of_day_id={daysAvailable.id}
                        name={daysAvailable.name}
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
