import React, { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// reactstrap components
import { Card } from "reactstrap";
import classNames from "classnames";
import config from "config";

function Map({
  updateLocation,
  longitude,
  latitude,
  draggable,
  mapStyle,
  search,
}) {
  mapboxgl.accessToken = config.MAPBOX_TOKEN;
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

    let marker = new mapboxgl.Marker({ draggable: draggable })
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      updateLocation({ longitude: lngLat.lng, latitude: lngLat.lat });
    }

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

    map.current.addControl(geocoder);

    map.current.on("load", function () {
      // Listen for the `result` event from the Geocoder
      // `result` event is triggered when a user makes a selection
      //  Add a marker at the result's coordinates
      marker.on("dragend", onDragEnd);

      geocoder.on("result", function (e) {
        const temp = e.result;
        updateLocation({
          longitude: temp.center[0],
          latitude: temp.center[1],
          street: temp.place_name.split(", ")[0],
          district: temp.context[0].text,
        });
        marker.setLngLat([temp.center[0], temp.center[1]]);
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
