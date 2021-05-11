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
import { useSelector } from "react-redux";
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
} from "reactstrap";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function Map() {
  const deliveries = useSelector((state) => state.deliveries.deliveries);
  const [lng, setLng] = useState(-96);
  const [lat, setLat] = useState(37.8);
  const [zoom, setZoom] = useState(2);

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("load", function () {
      // Add an image to use as a custom marker
      map.current.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.current.addImage("custom-marker", image);
          // Add a GeoJSON source with 2 points
          map.current.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  // feature for Mapbox DC
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-77.03238901390978, 38.913188059745586],
                  },
                  properties: {
                    title: "Mapbox DC",
                  },
                },
                {
                  // feature for Mapbox SF
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-122.414, 37.776],
                  },
                  properties: {
                    title: "Mapbox SF",
                  },
                },
              ],
            },
          });

          // Add a symbol layer
          map.current.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const filterPending = (array) => {
    console.log(deliveries);
    return array.filter((item) => item.delivery_status === false);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Delivery Map</CardHeader>
              <CardBody>
                <Row>
                  <Col sm={4}>
                    <MapDeliveryList deliveries={filterPending(deliveries)} />
                  </Col>
                  <Col sm={8}>
                    <Card>
                      <div>
                        <div className="sidebarStyle">
                          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                        </div>
                      </div>
                      <div ref={mapContainer} className="mapContainer" />
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

const MapDeliveryList = ({ deliveries }) => {
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
                deliveries.map((delivery) => (
                  <tr key={delivery.id} className="card-plain">
                    <td>
                      <p className="title">
                        {delivery.first_name + " " + delivery.last_name}
                      </p>
                      <p className="text-muted">
                        {delivery.street + ", " + delivery.district}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default Map;
