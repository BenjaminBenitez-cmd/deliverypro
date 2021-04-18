import DeliveryFinder from 'apis/DeliveryFinder';
import { DeliveryContext } from 'contexts/DeliveryContext';
import React, { useContext, useEffect, useState } from 'react';
import {  useHistory } from 'react-router';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    FormGroup,
    Input,
    Label,
    Collapse,
    CardFooter
} from "reactstrap";

const provinces = [
  {
    id: 1, 
    name: 'Orange Walk'
  }, 
  {
    id: 2, 
    name: 'Belize City'
  }, 
  {
    id: 3, 
    name: 'Corozal'
  }, 
  {
    id: 4, 
    name: 'Belmopan'
  }, 
  {
    id: 5, 
    name: 'Cayo'
  }, 
  {
    id: 6, 
    name: 'Placencia'
  }, 
]

const statuses = [
  {
    id: 1,
    name: 'pending'
  },
  {
    id: 2,
    name: 'completed'
  },
  {
    id: 3,
    name: 'canceled'
  }
]

export default function Deliveries () {
    let history = useHistory();

    const { deliveries, setDeliveries } =  useContext(DeliveryContext);
    //State for keeping track of the localdeliveries
    const [localDeliveries, setLocalDeliveries] = useState([]);
    //State for the search bar(can filter results by name)
    const [search, SetSearch] = useState('');
    //state for the filtering the date
    const [dateFilter, setDateFilter ] = useState('');
    //state for opening and closing the cards in the filter bar
    const [filterBar, setFilterBar] = useState({ date: false, province: false, status: false });
    //state for the checkboxes
    const [checkBoxState, setCheckBoxState] = useState([]);

    const handleFilterToggle = (name) => {
      setFilterBar({...filterBar, [name]: !filterBar[name]});
    }

    const handleClick = () => {
      history.push('/admin/createdelivery');
    }

    const handleDateSearch = (e) => {
      const filtered = deliveries.filter(delivery => {
        return delivery.delivery_date.toLowerCase().includes(e.target.value.toLowerCase());
      })
      setDateFilter({...dateFilter, value: e.target.value});
      setLocalDeliveries(filtered);
    }
    
    const handleSearch = (e) => {
      const filtered = deliveries.filter((delivery) => {
        return delivery.first_name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      SetSearch(e.target.value);
      setLocalDeliveries(filtered);
    }

    const getStatusText = (text) => {
      const value = text.toLowerCase();
      switch (value) {
        case "completed":
            return (
              <span className="text-success">Completed</span>
            )
        case "pending":
          return (
            <span className="text-info">Pending</span>
          )
        case "canceled":
          return (
            <span className="text-danger">Canceled</span>
          )
        default:
          break;
      }
    }
  
    const handleFilterDelivery = (e) => {
      const wordToFilter = e.target.value;
      const columnToFilter = e.target.name;
      const inputType = e.target.type;
      if(e.target.checked) {
        if(inputType === 'checkbox') {
          let options = [...checkBoxState, wordToFilter];
          console.log(options);
          const filtered = deliveries.filter((delivery) => {
            return options.includes(delivery.district);
          });
          setCheckBoxState(options);
          return setLocalDeliveries(filtered);
        } else {
          const filtered = deliveries.filter((delivery) => {
            return delivery[columnToFilter].toLowerCase().includes(wordToFilter.toLowerCase());
          });
          return setLocalDeliveries(filtered);
        }
      }
      setLocalDeliveries(deliveries);
      setCheckBoxState([...checkBoxState.filter(item => item !== wordToFilter)])
    }
 
    //Fetch deliveries from api on component load
    useEffect(() => {
        const FetchDeliveries = async () => {
            try {
                const response = await DeliveryFinder.get('/');
                setDeliveries(response.data.data.deliveries);
                setLocalDeliveries(response.data.data.deliveries);  
            } catch (err) {
                console.log(err);
            }
        }
        FetchDeliveries();
    }, []);
    
    return (
        <>
        <div className="content">
        <Row>
         
        </Row>
        <Row>
          <Col md="3">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Filter By</CardTitle>
              </CardHeader>
              <CardBody>
                <Card>
                  <CardHeader onClick={() => handleFilterToggle('date')}>
                    <CardTitle tag="h6">Date</CardTitle>  
                  </CardHeader>
                  <Collapse isOpen={filterBar.date}>
                    <CardBody>
                       <Input
                          onChange={handleDateSearch}
                          type="date"
                          name="filter-date"
                          value={dateFilter.value}
                        />
                    </CardBody>
                  </Collapse>
                </Card>
                <Card>
                  <CardHeader onClick={() => handleFilterToggle('province')}>
                    <CardTitle tag="h6">Province</CardTitle>  
                  </CardHeader>
                  <Collapse isOpen={filterBar.province}>
                    <CardBody>
                      {
                        provinces.map((province) => (
                          <FormCheckButtons 
                            key={province.id} 
                            type="checkbox" 
                            label={province.name} 
                            name="district" 
                            value={province.name} 
                            onClick={handleFilterDelivery} />
                        ))
                      }
                    </CardBody>
                  </Collapse>
                </Card>
                <Card>
                  <CardHeader onClick={() => handleFilterToggle('status')}>
                    <CardTitle tag="h6">Status</CardTitle>  
                  </CardHeader>
                  <Collapse isOpen={filterBar.status}>
                    <CardBody>
                      {
                        statuses.map((status) => (
                          <FormCheckButtons 
                            key={status.id} 
                            type="radio" 
                            name="delivery_status" 
                            label={status.name}
                            value={status.name} 
                            onClick={handleFilterDelivery} />
                        ))
                      }
                    </CardBody>
                  </Collapse>
                </Card>
              </CardBody>
            </Card>
          </Col>
          <Col md="9">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                      <CardTitle tag="h4">{deliveries && deliveries.length} Deliveries</CardTitle>
                      <Button color="primary" className="btn-inline" onClick={handleClick}>Add</Button>
                  </CardHeader>
                  <CardBody>
                      <Input type="search" onChange={handleSearch} value={search} placeholder="Search"/>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" className="btn-simple">Select All</Button>
                    <Button color="primary" className="btn-simple" disabled >Delete</Button>
                    <Button color="primary" className="btn-simple" disabled >Archive</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Deliveries</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Select</th>
                      <th>Status</th>
                      <th>Name</th>
                      <th>Delivery Date</th>
                      <th>Delivery Time</th>
                      <th>Phone Number</th>
                      <th>Street</th>
                      <th>District</th> 
                    </tr>
                  </thead>
                  <tbody>
                      {
                         localDeliveries && localDeliveries.map((node) => (
                              <tr key={node.id}>
                                  <td>
                                    <FormCheckButtons type="checkbox" name="check" label="" value={node.id} />
                                  </td>
                                  <td>{node.delivery_status && getStatusText(node.delivery_status)}</td>
                                  <td>{node.first_name} {node.last_name}</td>
                                  <td>{node.delivery_date.split('T')[0]}</td>
                                  <td>{node.delivery_time}</td>
                                  <td>{node.phone_number}</td>
                                  <td>{node.street}</td>
                                  <td>{node.district}</td>
                              </tr>
                          ))
                      }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

        </>
    )
}

const FormCheckButtons = (props) => (
  <div className={props.type ===  'radio' ? "form-check-radio" : ''}>
    <FormGroup check>
      <Label className="form-check-label">
        <Input name={props.name} value={props.value} type={props.type} {...props}/>{' '}
        {props.label}
        <span className="form-check-sign">
          <span className="check"></span>
        </span>
      </Label>
    </FormGroup>
  </div> 
  )
