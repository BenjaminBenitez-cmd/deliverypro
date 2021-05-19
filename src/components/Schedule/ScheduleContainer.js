import LoadingSpinner from "components/loading/LoadingSpinner";
import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import AddTimeCard from "./AddTimeCard";
import TimeCard from "./TimeCard";

const ScheduleContainer = ({ dates, days, id, status }) => {
  if (status === "loading") {
    return <LoadingSpinner />;
  } else if (status === "failed") {
    return <div>An Error occurred, report to developer</div>;
  }
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
                      days.map((day) => {
                        return (
                          day.name === date.name &&
                          day &&
                          day.times.map((time) => (
                            <TimeCard key={time.id} {...time} />
                          ))
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
