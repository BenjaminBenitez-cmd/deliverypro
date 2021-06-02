/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardTitle,
  Table,
  CardFooter,
  Button,
} from "reactstrap";
import { AddressRequests } from "apis";
import classNames from "classnames";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

function Map() {
  const [lng, setLng] = useState(-88.56177);
  const [lat, setLat] = useState(18.077686);
  const [zoom, setZoom] = useState(13);
  const [toggle, setToggle] = useState(undefined);
  const [geoJSON, setGeoJSON] = useState(null);

  const mapContainer = useRef(null);
  const map = useRef(null);

  const handleToggle = (num) => setToggle(num);

  const flyToStore = (currentFeature) => {
    if (!map.current) return;
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  };

  const fetchGeoJSON = async () => {
    try {
      const response = await AddressRequests.getAddressesRequest();
      setGeoJSON(response.data.data.addresses);
    } catch (error) {
      console.error(error);
    }
  };

  function createPopUp(currentFeature) {
    if (!map.current) return;
    var popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${
          currentFeature.properties.verified ? "Verified" : "Unverified"
        } </h3><h4>${currentFeature.properties.name}</h4>`
      )
      .addTo(map.current);
  }

  useEffect(() => {
    fetchGeoJSON();
  }, []);

  useEffect(() => {
    if (!toggle) return;
    if (!geoJSON) return;
    const isFound = geoJSON.features.find(
      (node) => node.properties.id === toggle
    );
    if (!isFound) return;
    flyToStore(isFound);
    createPopUp(isFound);
  }, [toggle, geoJSON]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/benjaminbenitez/ckoz72adp0il517o69jxikbt7",
      center: [lng, lat],
      zoom: zoom,
    });
    fetchGeoJSON();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current) return;
    if (!geoJSON) return;
    if (map.current.getLayer("locations") !== undefined) return;
    map.current.on("load", () => {
      map.current.addLayer({
        id: "locations",
        type: "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: "geojson",
          data: geoJSON,
        },
      });
    });
  }, [geoJSON]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Delivery Map</CardHeader>
              <CardBody>
                <Row>
                  <Col sm={3}>
                    {geoJSON && (
                      <MapDeliveryList
                        deliveries={geoJSON.features}
                        handleToggle={handleToggle}
                        activeID={toggle}
                      />
                    )}
                  </Col>
                  <Col sm={9}>
                    <Card>
                      <div>
                        <div className="sidebarStyle">
                          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                        </div>
                      </div>
                      <div ref={mapContainer} className="mapContainer tall" />
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

const MapDeliveryList = ({ deliveries, handleToggle, activeID }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">Deliveries</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="table-full-width table-repsonsive">
          <Table>
            <tbody>
              {deliveries &&
                deliveries.map((delivery) => {
                  const rowClass = classNames("title", {
                    "text-primary": activeID === delivery.id,
                  });
                  return (
                    <tr
                      key={delivery.properties.id}
                      onClick={() => handleToggle(delivery.properties.id)}
                    >
                      <td>
                        <p className={rowClass}>{delivery.properties.name}</p>
                        <p className="text-muted">
                          {delivery.properties.verified
                            ? "Verified"
                            : "Unverified"}
                        </p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </CardBody>
      <CardFooter>
        <Button color="primary">Generate</Button>
      </CardFooter>
    </Card>
  );
};

export default Map;
