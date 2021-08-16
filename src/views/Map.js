import React, { useEffect, useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { AddressRequests } from "apis";
import MapDeliveryList from "components/Tables/DeliveryList";
import InnerMap from "components/Maps/InnerMap";
import { CompanyRequests } from "apis";

function Map() {
  const [geoJSON, setGeoJSON] = useState(null);
  const [warehouseGeoJSON, setWareHouse] = useState(null);
  const [toggle, setToggle] = useState(undefined);
  //state to be drilled down into innermap and deliverylist components
  const [generate, setGenerate] = useState(false);
  const handleToggle = (num) => setToggle(num);

  const fetchGeoJSON = async () => {
    try {
      const response = await AddressRequests.getOne();
      setGeoJSON(response.data.data.addresses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWarehouse = async () => {
    try {
      const response = await CompanyRequests.getOne();
      setWareHouse(response.data.data.company.geolocation);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchGeoJSON();
    fetchWarehouse();
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
                {geoJSON && warehouseGeoJSON && (
                  <Row>
                    <Col sm={3} className="pl-0">
                      <MapDeliveryList
                        deliveries={geoJSON.features}
                        handleToggle={handleToggle}
                        activeID={toggle}
                        setGenerate={setGenerate}
                        generate={generate}
                      />
                    </Col>
                    <Col sm={9}>
                      <InnerMap
                        warehouseGeoJSON={warehouseGeoJSON}
                        geoJSON={geoJSON}
                        toggle={toggle}
                        handleToggle={handleToggle}
                        setGenerate={setGenerate}
                        generate={generate}
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
