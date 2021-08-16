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
  Table,
  Button,
  CustomInput,
} from "reactstrap";
import ScheduleAddModal from "components/Modals/ScheduleAdd";
import { useHistory } from "react-router-dom";

const Schedule = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { schedules } = useSelector((state) => state.schedule);

  const [isOpen, setIsOpen] = useState(false);

  //create toggle for modal
  const toggleModal = () => setIsOpen(!isOpen);

  //redirect to editable window
  const redirect = (id) => {
    history.push(`/admin/schedule/${id}`);
  };

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  return (
    <>
      <div className="content">
        <Card className="card-plain">
          <CardHeader className="pl-0">
            <CardTitle tag="h4">Schedule</CardTitle>
          </CardHeader>
          <CardBody>
            <Container fluid className="p-0">
              <Row className="mb-3">
                <Button
                  color="info"
                  className="btn btn-info btn-simple"
                  onClick={toggleModal}
                >
                  Add
                </Button>
              </Row>
              <Row>
                <Table className="tablesorter" responsive striped>
                  <thead className="text-info animation-on-hover">
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules &&
                      schedules.map((schedule) => (
                        <tr
                          key={schedule.id}
                          onClick={() => redirect(schedule.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{schedule.name}</td>
                          <td>
                            {" "}
                            <CustomInput
                              type="switch"
                              id="switch-1"
                              checked={schedule.active}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </div>
      {<ScheduleAddModal isOpen={isOpen} toggleModal={toggleModal} />}
    </>
  );
};

export default Schedule;
