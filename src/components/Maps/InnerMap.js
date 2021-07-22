// eslint-disable-next-line import/no-webpack-loader-syntax
import config from "../../config";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useState, useRef } from "react";
import * as turf from "@turf/turf";
import { Card } from "reactstrap";

mapboxgl.accessToken = config.MAPBOX_TOKEN;

const InnerMap = ({ geoJSON, toggle, handleToggle }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-88.56177);
  const [lat, setLat] = useState(18.077686);
  const [zoom, setZoom] = useState(13);

  //truck location
  let truckLocation = [-88.6665, 18.0401];
  //warehouse location
  let warehouseLocation = [-88.6665, 18.0401];
  //last query time
  let lastQueryTime = 0;
  let lastAtRestaurant = 0;
  let keepTrack = [];
  let currentSchedule = [];
  let currentRoute = null;
  let pontHopper = {};
  let pause = true;
  let speedFactor = 50;

  //create feature array for warehouse
  let warehouse = turf.featureCollection([turf.point(warehouseLocation)]);

  //create an empty GeoJSON feature collection for drop off
  let dropoffs = null;

  //create an empty GeoJSON feature collection, which
  //will be used as the data source for the route before
  //users add any new data

  var nothing = turf.featureCollection([]);

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

  function assembleQueryURL() {
    // Set the profile to `driving`
    // Coordinates will include the current location of the truck,
    if (dropoffs.length <= 0) {
      return;
    }

    let coordinates = [truckLocation];

    dropoffs.features.forEach((dropoff) => {
      if (dropoff.properties.delivered !== true) {
        coordinates.push(dropoff.geometry.coordinates);
      }
    });

    return (
      "https://api.mapbox.com/optimized-trips/v1/mapbox/driving/" +
      coordinates.join(";") +
      "?overview=full&steps=true&geometries=geojson&source=first&access_token=" +
      mapboxgl.accessToken
    );
  }

  //listen for a click on the map
  async function getOptimizedRoutes(routeGeoJSON) {
    const optimisedResponse = await fetch(assembleQueryURL());
    const data = await optimisedResponse.json();

    routeGeoJSON = turf.featureCollection([
      turf.feature(data.trips[0].geometry),
    ]);

    if (!data.trips[0]) {
      routeGeoJSON = null;
    } else {
      //update the `route` source by getting the route source
      //and setting the data eequal to routeGeoJSON
      map.getSource("route").setData(routeGeoJSON);
    }

    if (data.waypoint.length === 12) {
      window.alert("Maximum number of points reached.");
    }
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
      center: truckLocation,
      zoom: zoom,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current) return;
    if (!geoJSON) return;
    if (map.current.getLayer("locations") !== undefined) return;
    map.current.on("load", () => {
      let marker = document.createElement("div");
      marker.classList = "truck";

      //create a new marker
      let truckMarker = new mapboxgl.Marker(marker)
        .setLngLat(truckLocation)
        .addTo(map);

      //create circle layer
      map.current.addLayer({
        id: "warehouse",
        type: "circle",
        source: {
          data: warehouse,
          type: "geojson",
        },
        piant: {
          "circle-radius": 20,
          "circle-color": "white",
          "circle-stroke-color": "#3887be",
          "circle-stroke-width": 3,
        },
      });

      //create a symbol layer on top of circle layer
      map.current.addLayer({
        id: "warehouse-symbol",
        type: "symbol",
        souce: {
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
            "line-width": ["interplate", ["linear"], ["zoom"], 12, 3, 22, 12],
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

    getOptimizedRoutes(geoJSON);
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

export default InnerMap;
