import React, { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// reactstrap components
import { Card } from "reactstrap";
import classNames from "classnames";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

function Map({
  updateLocation,
  longitude,
  latitude,
  draggable,
  mapStyle,
  search,
}) {
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
      proximity: {
        longitude: -88.66270829999999,
        latitude: 18.0315726,
      },
    });

    map.current.on("load", function () {});

    map.current.addControl(geocoder);

    map.current.on("load", function () {
      map.current.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "point",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#448ee4",
        },
      });

      // Listen for the `result` event from the Geocoder
      // `result` event is triggered when a user makes a selection
      //  Add a marker at the result's coordinates
      geocoder.on("result", function (e) {
        map.current.getSource("single-point").setData(e.result.geometry);
        const temp = e.result;
        updateLocation({
          longitude: temp.center[0],
          latitude: temp.center[1],
          street: temp.place_name.split(", ")[0],
          district: temp.context[0].text,
        });
      });
    });
  });

  return (
    <Card>
      <div
        ref={mapContainer}
        className={classNames("mapContainer", mapStyle)}
      />
    </Card>
  );
}

export default Map;
