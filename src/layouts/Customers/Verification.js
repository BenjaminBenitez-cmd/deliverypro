import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { Col, Container, Row, Button, Input, Card, CardBody } from "reactstrap";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import config from "../../config";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const Verification = ({ match: { url } }) => {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (token.length < 11) return;
    const fetchDelivery = async () => {
      try {
        const response = await axios.get(config.URL + "/verifydelivery", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data.delivery);
        setAuthToken(token);
      } catch (e) {
        setError(true);
      }
    };
    fetchDelivery();
  }, [token]);

  if (error) {
    return (
      <div className="wrapper d-flex justify-content-center align-items-center">
        <h1 className="h3 text-white">
          We are sorry, this link has expired or has been used.
        </h1>
      </div>
    );
  } else if (!data) {
    return (
      <div className="wrapper d-flex justify-content-center align-items-center">
        <h1 className="h3 text-white">
          We are sorry, this link has expired or has been used.
        </h1>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Container className="h-100" fluid={token === "address" ? true : false}>
        <Router>
          <Switch>
            <>
              <Route
                exact={true}
                path={`/verifyaddress/details`}
                render={() => <ReviewDetails {...data} />}
              />
              <Route
                exact={true}
                path={`/verifyaddress/address`}
                render={() => <ConfirmLocation token={authToken} {...data} />}
              />
              <Route
                exact={true}
                path={`/verifyaddress/completion`}
                render={() => <CompletionScreen />}
              />
              <Route
                exact={true}
                path={`/verifyaddress/report`}
                render={() => <ReportScreen />}
              />
              <Route
                exact={true}
                path={"/verifyaddress/" + token}
                render={() => <LandingScreen {...data} />}
              />
            </>
          </Switch>
        </Router>
      </Container>
    </div>
  );
};

const LandingScreen = ({
  customer_name,
  phone,
  items,
  company_name,
  estimated,
  destination,
}) => {
  return (
    <Row className="h-100 align-items-center">
      <Col sm={6}>
        <h1 className="display-3">
          Hi {customer_name}, {company_name} is requesting a delivery
          confirmation
        </h1>
        <ul className="list-unstyled">
          <li>
            Destination: <p>{destination}</p>
          </li>
          <li>
            Phone: <p>{phone}</p>
          </li>
          <li>
            Estimate: <p>{estimated}</p>
          </li>
          <li>
            Items: <p>{items}</p>
          </li>
        </ul>
        <Link to="/verifyaddress/details">
          <Button type="button" color="info">
            Confirm
          </Button>
        </Link>
        <p className="mt-5">
          **** If you believe this delivery is not intended for you, report{" "}
          <Link to="/verifyaddress/report" className="text-primary">
            here.
          </Link>
        </p>
      </Col>
      <Col sm={6}></Col>
    </Row>
  );
};

const ReviewDetails = ({ customer_name, phone, items }) => {
  const [correct, setCorrect] = useState(true);

  const toggleCorrect = () => setCorrect((prev) => !prev);

  return (
    <Row className="h-100 align-items-center">
      <Col sm={6}>
        <h1 className="display-3">Awesome! are these details correct?</h1>
        {correct ? (
          <ul className="list-unstyled">
            <li>
              Name:<p>{customer_name}</p>{" "}
            </li>
            <li>
              Phone: <p>{phone}</p>
            </li>
            <li>
              Items: <p>{items}</p>
            </li>
          </ul>
        ) : (
          <ul className="list-unstyled pr-5">
            <li>
              Name:
              <Input type="text" />
            </li>
            <li>
              Phone:
              <Input type="text" />
            </li>
            <li>
              Items:
              <Input type="text" />
            </li>
          </ul>
        )}
        <Link to="/verifyaddress/address">
          <Button type="button" className="mr-3" color="info">
            Yes
          </Button>
        </Link>
        <Button type="button" color="info" onClick={toggleCorrect}>
          No
        </Button>
        <p className="mt-5">
          **** If you believe this delivery is not intended for you, report{" "}
          <Link to="/verifyaddress/report" className="text-info">
            here.
          </Link>
        </p>
      </Col>
      <Col sm={6}></Col>
    </Row>
  );
};

const ConfirmLocation = ({ token }) => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const zoom = 18;

  const handleSubmitVerification = async () => {
    if (!longitude || !latitude) return;
    try {
      await axios.post(
        config.URL + "/verifydelivery",
        {
          longitude: longitude,
          latitude: latitude,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!longitude || !latitude) return;
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/benjaminbenitez/ckoz72adp0il517o69jxikbt7",
      center: [longitude, latitude],
      zoom: zoom,
    });
  }, [longitude, latitude, zoom]);

  useEffect(() => {
    if (!map.current) return;

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Search for places in Orange Walk",
      mapboxgl: mapboxgl,
      marker: false,
      proximity: {
        longitude: longitude,
        latitude: latitude,
      },
    });

    map.current.on("load", () => {
      let marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      map.current.addControl(geocoder);

      geocoder.on("result", function (e) {
        const temp = e.result;
        marker.setLngLat([temp.center[0], temp.center[1]]).addTo(map.current);
        setLongitude(temp.center[0]);
        setLatitude(temp.center[1]);
      });

      function onDragEnd() {
        var lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      }

      marker.on("dragend", onDragEnd);
    });
  }, [longitude, latitude]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (err) => console.error(err)
      );
    } else {
      console.error("Not available");
    }
  }, []);

  return (
    <div className="h-100">
      <div
        ref={mapContainer}
        style={{
          position: "relative",
          top: 0,
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
        }}
      >
        <Card>
          <CardBody>
            <h1 className="display-3">Confirm The Delivery Location</h1>
            <p>
              We collect your GPS location to ensure the precise delivery of
              your package
            </p>
            <Link to="/verifyaddress/completion">
              <Button
                type="button"
                className="mt-4"
                color="info"
                onClick={handleSubmitVerification}
              >
                Confirm
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const CompletionScreen = () => {
  return (
    <Row className="h-100 align-items-center">
      <Col sm={6}>
        <h1 className="display-3">
          Thank you, your delivery should be on its way!
        </h1>
        <p>
          An email with more details has been sent to your email account. If you
          would like to receive email updates on each step of your package’s
          journey subscribe below.
        </p>
        <Button type="button" className="btn btn-link pl-0" color="info">
          Send me updates
        </Button>
        <p className="mt-5">
          **** If you believe this delivery is not intended for you, report{" "}
          <Link to="/verifyaddress/report" className="text-info">
            here.
          </Link>
        </p>
      </Col>
      <Col sm={6}></Col>
    </Row>
  );
};

const ReportScreen = () => {
  return (
    <Row className="h-100 align-items-center">
      <Col sm={6} className="pr-5">
        <h1 className="display-3">Your report has been made</h1>
        <p>Thank you, the mistake will be reported.</p>
      </Col>
      <Col sm={6}></Col>
    </Row>
  );
};

export default Verification;
