import DropdownCard from 'components/Sidebar/DropdownCard'
import { addTime } from 'features/schedules/ScheduleSlice';
import { deleteTime } from 'features/schedules/ScheduleSlice';
import { getSchedules } from 'features/schedules/ScheduleSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Input, Row, Table } from 'reactstrap'

const Schedule = () => {
    const dispatch = useDispatch(getSchedules);
    const { dates, days, id } = useSelector(state => state.schedule);

    useEffect(() => {
        dispatch(getSchedules());
    }, [dispatch]);

    return (
        <div className="content">
            <Card className="card-plain">
                <CardHeader>
                    <CardTitle tag="h4">Schedule</CardTitle>
                </CardHeader>
                <CardBody>
                  <Container fluid className="p-0">
                      <Row>
                            <Card className="card-plain">
                                <Container>
                                {
                                    dates && dates.map((date, index) => (
                                        <Col sm={6} key={index}>
                                            <Row>
                                                <Col sm={12} className="mb-2">
                                                    <p>{date.name}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                {
                                                    days && days.map(time => {
                                                         
                                                         return time.name_of_day_id.toString() === date.id && (
                                                            <ScheduleCard key={time.id} {...time} deleteScheduleTime={dispatch} />
                                                         )
                                                    })
                                                }
                                            </Row>
                                            <Row>
                                                 <Col sm={12}>
                                                     <Addnew schedule_id={id} name_of_day_id={date.id} name={date.name} addScheduleTime={dispatch}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))
                                }
                                </Container>
                            
                            </Card>
                      </Row>
                      
                  </Container>
                </CardBody>
            </Card>
        </div>
    )
}

const ScheduleCard = ({ time_start, time_end, id, deleteScheduleTime }) => (
    <>
        <Col xs={5} className="my-1">
            <Input type="time" value={time_start}/>
        </Col>
        <Col xs={5} className="my-1">
            <Input type="time" value={time_end}/>
        </Col>
        <Col xs={2}>
            <Button className="btn-link" color="primary" onClick={() => deleteScheduleTime(deleteTime(id))}><i className="tim-icons icon-simple-remove"></i></Button>
        </Col>
    </>
)

const Addnew = ({ addScheduleTime, schedule_id, name_of_day_id }) => {
    const [ formData, setFormData ] = useState({time_start: '', time_end: ''});

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const values = {
        schedule_id,
        name_of_day_id,
        ...formData
    }   

    return (
        <DropdownCard className="card-plain" label="Add new">
            <Container fluid>
                <Row>
                    <Col xs={5}>
                        <Input type="time" name="time_start" onChange={handleFormChange} value={formData.time_start} />
                    </Col>
                    <Col xs={5}>
                        <Input type="time" name="time_end" onChange={handleFormChange} value={formData.time_end} />
                    </Col>
                    <Col sm={2}>
                        <Button className="btn-link" color="primary" onClick={() => addScheduleTime(addTime(values))} ><i className="tim-icons icon-check-2"></i></Button>
                    </Col>
                </Row>
            </Container>
        </DropdownCard>
    )
}

export default Schedule
