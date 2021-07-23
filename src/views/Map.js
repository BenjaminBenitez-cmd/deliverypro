import React, { useEffect, useRef, useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { AddressRequests } from "apis";
import MapDeliveryList from "components/Tables/DeliveryList";
import InnerMap from "components/Maps/InnerMap";

const data = {
  isEnabled: true,
  districts: ["Orange Walk Town"],
};

function Map() {
  const [geoJSON, setGeoJSON] = useState(null);
  const [toggle, setToggle] = useState(undefined);
  const handleToggle = (num) => setToggle(num);

  const fetchGeoJSON = async () => {
    try {
      const response = await AddressRequests.getOne();
      setGeoJSON(response.data.data.addresses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGeoJSON();
  }, []);

  if (geoJSON?.features === null) {
    return (
      <div className="content d-flex justify-content-center align-items-center">
        <p className="h5 text-white">No deliveries found add some :)</p>
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Delivery Map</CardHeader>
              <CardBody>
                {geoJSON && (
                  <Row>
                    <Col sm={3} className="pl-0">
                      <MapDeliveryList
                        deliveries={geoJSON.features}
                        handleToggle={handleToggle}
                        activeID={toggle}
                      />
                    </Col>
                    <Col sm={9}>
                      <InnerMap
                        geoJSON={geoJSON}
                        toggle={toggle}
                        handleToggle={handleToggle}
                      />
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
