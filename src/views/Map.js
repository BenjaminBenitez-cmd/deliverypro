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
import * as turf from "@turf/turf";

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
import axios from "axios";
import { AddressRequests } from "apis";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function Map() {
  const deliveries = useSelector((state) => state.deliveries.deliveries);
  const [addresses, setAddresses] = useState(null);
  const [lng, setLng] = useState(-88.666375);
  const [lat, setLat] = useState(18.040019);
  const [zoom, setZoom] = useState(12);
  var truckLocation = [-88.666375, 18.040019];
  var warehouseLocation = [-88.666375, 18.040019];
  var testLocation = [-88.5609709, 18.0812688];
  // var lastQueryTime = 0;
  var lastAtRestaurant = 0;
  var keepTrack = [];
  // var currentSchedule = [];
  // var currentRoute = null;
  var pointHopper = {};
  // var pause = true;
  // var speedFactor = 50;

  const mapContainer = useRef(null);
  const map = useRef(null);

  var warehouse = turf.featureCollection([turf.point(warehouseLocation)]);

  // Create an empty GeoJSON feature collection for drop off locations
  let dropoffs = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-88.5609709, 18.0812688],
        },
        properties: {
          id: 30,
          street: "San Lazaro street",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-88.570498, 18.0880828],
        },
        properties: {
          id: 31,
          street: "Spider lily street",
        },
      },
    ],
  };
  // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
  var nothing = turf.featureCollection([]);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await AddressRequests.getAddressesRequest();
        setAddresses(response.data.data.addresses);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGeoJSON();
  }, []);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("load", async function () {
      var marker = document.createElement("div");
      marker.classList = "truck";

      // Create a new marker
      new mapboxgl.Marker(marker).setLngLat(truckLocation).addTo(map.current);

      console.log(dropoffs);
      // Create a circle layer
      map.current.addLayer({
        id: "warehouse",
        type: "circle",
        source: {
          data: warehouse,
          type: "geojson",
        },
        paint: {
          "circle-radius": 20,
          "circle-color": "white",
          "circle-stroke-color": "#3887be",
          "circle-stroke-width": 3,
        },
      });

      // Create a symbol layer on top of circle layer
      map.current.addLayer({
        id: "warehouse-symbol",
        type: "symbol",
        source: {
          data: warehouse,
          type: "geojson",
        },
        layout: {
          "icon-image": "grocery-15",
          "icon-size": 1,
        },
        paint: {
          "text-color": "#3887be",
        },
      });

      map.current.addLayer({
        id: "dropoffs-symbol",
        type: "symbol",
        source: {
          data: dropoffs,
          type: "geojson",
        },
        layout: {
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-image": "marker-15",
        },
      });

      map.current.addSource("route", {
        type: "geojson",
        data: nothing,
      });

      map.current.addLayer(
        {
          id: "routeline-active",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12],
          },
        },
        "waterway-label"
      );

      map.current.addLayer(
        {
          id: "routearrows",
          type: "symbol",
          source: "route",
          layout: {
            "symbol-placement": "line",
            "text-field": "▶",
            "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
            "symbol-spacing": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              30,
              22,
              160,
            ],
            "text-keep-upright": false,
          },
          paint: {
            "text-color": "#3887be",
            "text-halo-color": "hsl(55, 11%, 96%)",
            "text-halo-width": 3,
          },
        },
        "waterway-label"
      );

      // Listen for a click on the map.current
      map.current.on("click", function (e) {
        // When the map is clicked, add a new drop off point
        // and update the `dropoffs-symbol` layer
        newDropoff(map.current.unproject(e.point));
        updateDropoffs(dropoffs);
      });
    });
  }, []);

  // function OptimizedGenerator = () => {

  // }

  function newDropoff(coords) {
    // Store the clicked point as a new GeoJSON feature with
    // two properties: `orderTime` and `key`
    var pt = turf.point([coords.lng, coords.lat], {
      orderTime: Date.now(),
      key: Math.random(),
    });
    dropoffs.features.push(pt);
    pointHopper[pt.properties.key] = pt;
    console.log(pt);

    // Make a request to the Optimization API
    axios.get(assembleQueryURL()).then(function (response) {
      const data = response.data;
      // Create a GeoJSON feature collection
      var routeGeoJSON = turf.featureCollection([
        turf.feature(data.trips[0].geometry),
      ]);

      // If there is no route provided, reset
      if (!data.trips[0]) {
        routeGeoJSON = nothing;
      } else {
        // Update the `route` source by getting the route source
        // and setting the data equal to routeGeoJSON
        map.current.getSource("route").setData(routeGeoJSON);
      }

      //
      if (data.waypoints.length === 12) {
        window.alert(
          "Maximum number of points reached. Read more at docs.mapbox.com/api/navigation/#optimization."
        );
      }
    });
  }

  function updateDropoffs(geojson) {
    map.current.getSource("dropoffs-symbol").setData(geojson);
  }

  // Here you'll specify all the parameters necessary for requesting a response from the Optimization API
  function assembleQueryURL() {
    // Store the location of the truck in a variable called coordinates
    var coordinates = [truckLocation];
    var distributions = [];
    keepTrack = [truckLocation];

    // Create an array of GeoJSON feature collections for each point
    var restJobs = objectToArray(pointHopper);

    // If there are actually orders from this restaurant
    if (restJobs.length > 0) {
      // Check to see if the request was made after visiting the restaurant
      var needToPickUp =
        restJobs.filter(function (d, i) {
          return d.properties.orderTime > lastAtRestaurant;
        }).length > 0;

      // If the request was made after picking up from the restaurant,
      // Add the restaurant as an additional stop
      if (needToPickUp) {
        var restaurantIndex = coordinates.length;
        // Add the restaurant as a coordinate
        coordinates.push(warehouseLocation);
        // push the restaurant itself into the array
        keepTrack.push(pointHopper.warehouse);
      }

      restJobs.forEach(function (d, i) {
        // Add dropoff to list
        keepTrack.push(d);
        coordinates.push(d.geometry.coordinates);
        // if order not yet picked up, add a reroute
        if (needToPickUp && d.properties.orderTime > lastAtRestaurant) {
          distributions.push(restaurantIndex + "," + (coordinates.length - 1));
        }
      });
    }

    // Set the profile to `driving`
    // Coordinates will include the current location of the truck,
    return (
      "https://api.mapbox.com/optimized-trips/v1/mapbox/driving/" +
      coordinates.join(";") +
      "?distributions=" +
      distributions.join(";") +
      "&overview=full&steps=true&geometries=geojson&source=first&access_token=" +
      mapboxgl.accessToken
    );
  }

  function objectToArray(obj) {
    var keys = Object.keys(obj);
    var routeGeoJSON = keys.map(function (key) {
      return obj[key];
    });
    return routeGeoJSON;
  }

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
      <CardFooter>
        <Button color="primary">Generate</Button>
      </CardFooter>
    </Card>
  );
};

export default Map;
