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
  Table,
  CardFooter,
  Button,
} from "reactstrap";
import { AddressRequests } from "apis";
import config from "../config";

mapboxgl.accessToken = config.MAPBOX_TOKEN;

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
                <Row>
                  <Col sm={3} className="pl-0">
                    {geoJSON && (
                      <MapDeliveryList
                        deliveries={geoJSON.features}
                        handleToggle={handleToggle}
                        activeID={toggle}
                      />
                    )}
                  </Col>
                  <Col sm={9}>
                    <InnerMap
                      geoJSON={geoJSON}
                      toggle={toggle}
                      handleToggle={handleToggle}
                    />
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

//Map with points

const InnerMap = ({ geoJSON, toggle, handleToggle }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-88.56177);
  const [lat, setLat] = useState(18.077686);
  const [zoom, setZoom] = useState(13);

  const flyToStore = (currentFeature) => {
    if (!map.current) return;
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
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
    <Card>
      <div>
        <div className="sidebarStyle">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div ref={mapContainer} className="mapContainer tall" />
    </Card>
  );
};

//The side map with list of deliveries

const MapDeliveryList = ({ deliveries, handleToggle, activeID }) => {
  const TableRow = ({ handleToggle, properties }) => (
    <tr key={properties.id} onClick={() => handleToggle(properties.id)}>
      <td>
        <h5 className="pl-0">{properties.name}</h5>
        <p className="text-muted">
          {properties.verified ? "Verified" : "Unverified"}
        </p>
      </td>
    </tr>
  );

  return (
    <Card className="card-plain">
      <CardBody>
        <Table className="table-sorter" striped>
          <tbody>
            {deliveries &&
              deliveries.map((delivery) => (
                <TableRow
                  key={delivery.id}
                  handleToggle={handleToggle}
                  {...delivery}
                />
              ))}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>
        <Button color="success">Generate</Button>
      </CardFooter>
    </Card>
  );
};

export default Map;
