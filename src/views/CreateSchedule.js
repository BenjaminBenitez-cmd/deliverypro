import { getSchedules } from "redux/schedules/ScheduleSlice";
import React, { useEffect, useState } from "react";
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
  CustomInput,
} from "reactstrap";
import { ScheduleRequests } from "apis";
import ScheduleAddModal from "components/Modals/ScheduleAdd";
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [schedules, setSchedules] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  //create toggle for modal
  const toggleModal = () => setIsOpen(!isOpen);

  //fetch schedules
  const fetchSchedules = async () => {
    try {
      const response = await ScheduleRequests.getMany();
      setSchedules(response.data.data.schedules);
    } catch (err) {
      console.log(err);
    }
  };

  //redirect to editable window
  const redirect = (id) => {
    history.push(`/admin/schedule/${id}`);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

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
                  color="primary"
                  className="btn btn-primary btn-simple"
                  onClick={toggleModal}
                >
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

export default CreateSchedule;
