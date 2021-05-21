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

// reactstrap components
import { Card } from "reactstrap";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function Map({ longitude, latitude }) {
  if (!longitude || latitude) {
    latitude = 18.0819307;
    longitude = -88.5591642;
  }

  // const [lng, setLng] = useState(-88.57103);
  // const [lat, setLat] = useState(18.084248);
  const zoom = 12;

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("load", function () {
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
    });
  });
  return (
    <Card>
      <div ref={mapContainer} className="mapContainer short" />
    </Card>
  );
}

export default Map;
