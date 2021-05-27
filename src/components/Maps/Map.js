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

import React, { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// reactstrap components
import { Card } from "reactstrap";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

function Map({ longitude, latitude, draggable, search }) {
  console.log(longitude, latitude);

  const zoom = 12;

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/benjaminbenitez/ckoz72adp0il517o69jxikbt7",
      center: [longitude, latitude],
      zoom: zoom,
    });

    new mapboxgl.Marker({ draggable: draggable })
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    if (!search) return;

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Search for places in Orange Walk",
      mapboxgl: mapboxgl,
      marker: false,
    });

    map.current.on("load", function () {});

    map.current.addControl(geocoder);
  });

  return (
    <Card>
      <div ref={mapContainer} className="mapContainer short" />
    </Card>
  );
}

export default Map;
