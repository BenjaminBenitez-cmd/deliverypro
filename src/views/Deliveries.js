import React from 'react';

import {
  Row,
  Col,
} from "reactstrap";

import SearchFilter from 'components/Fields/SearchFilter';
import DeliveryTable from 'components/Tables.js/DeliveryTable';
import FilterSideBar from 'components/Sidebar/FilterSideBar';



export default function Deliveries() {

  return (
    <>
      <div className="content">
        <Row>
          <Col md="3">
            <Row>
              <Col>
               <SearchFilter />
              </Col>
            </Row>
            <Row>
              <Col> 
                <FilterSideBar/>
              </Col>
            </Row>
          </Col>
          <Col md="9">
            <DeliveryTable />
          </Col>
        </Row>
      </div>
    </>
  )
}


