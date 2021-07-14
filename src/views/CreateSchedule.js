import { getSchedules } from "redux/schedules/ScheduleSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Table,
  Button,
} from "reactstrap";

const data = [
  {
    id: 1,
    name: "Monday schedule",
    active: false,
  },
  {
    id: 2,
    name: "March special schedule",
    active: false,
  },
  {
    id: 3,
    name: "Summer Fast schedule",
    active: true,
  },
];

const CreateSchedule = () => {
  const dispatch = useDispatch(getSchedules);

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  return (
    <div className="content">
      <Card className="card-plain">
        <CardHeader className="pl-0">
          <CardTitle tag="h4">Schedule</CardTitle>
        </CardHeader>
        <CardBody>
          <Container fluid className="p-0">
            <Row className="mb-3">
              <Button color="primary" className="btn btn-primary btn-simple">
                Add
              </Button>
            </Row>
            <Row>
              <Table className="tablesorter" responsive striped>
                <thead className="text-primary animation-on-hover">
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((schedule) => (
                    <tr key={schedule.id}>
                      <td>{schedule.name}</td>
                      <td>{schedule.active ? "Active" : "Not Active"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateSchedule;
