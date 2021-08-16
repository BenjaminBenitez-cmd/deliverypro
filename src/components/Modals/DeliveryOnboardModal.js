import React, { useEffect } from "react";
import { Modal, ModalBody, Button, ModalFooter, Container } from "reactstrap";
import { useState } from "react";
import Map from "components/Maps/Map";
import { CompanyRequests } from "apis";

const DeliveryOnboardModal = ({ isOpen, toggleModal }) => {
  const [step, setStep] = useState(1);
  const [defaultLocation, setDefaultLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stepUp = () => setStep((prev) => prev + 1);
  const stepDown = () => setStep((prev) => prev - 1);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!defaultLocation) return;
    setIsLoading(true);
    try {
      await CompanyRequests.updateAddress(defaultLocation);
      setIsLoading(false);
      setStep(3);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setDefaultLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.error("Truck Location unavailable");
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      modalClassName="modal-black"
      size="lg"
    >
      <div className="modal-header mb-3">
        <h5 className="modal-title">Lets get started</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={toggleModal}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
      </div>
      <form onSubmit={onSubmit}>
        {step === 1 && (
          <>
            <ModalBody>
              <Container>
                <p className="h4">
                  Welcome, we need a little more information before you we get
                  started.
                </p>
                <p>Are you ready?</p>
              </Container>
            </ModalBody>
            <ModalFooter className="p-3">
              <Button
                className="btn-fill"
                color="info"
                type="btn"
                onClick={stepUp}
              >
                Start
              </Button>
            </ModalFooter>
          </>
        )}
        {step === 2 && (
          <>
            <ModalBody>
              <Container>
                <p className="h4">Is this your Warehouse's location?</p>
                <p>
                  Your location will be used as the starting point for our route
                  optimiser.
                </p>
                <p>
                  Latitude: {defaultLocation.latitude} Longitude:
                  {defaultLocation.longitude}
                </p>
                {defaultLocation && (
                  <Map
                    updateLocation={setDefaultLocation}
                    longitude={defaultLocation.longitude}
                    latitude={defaultLocation.latitude}
                    draggable={true}
                    mapStyle={"tall"}
                    search={true}
                  />
                )}
              </Container>
            </ModalBody>
            <ModalFooter className="p-3">
              <Button color="secondary" onClick={stepDown}>
                Back
              </Button>
              <Button className="btn-fill" color="info" type="submit">
                {isLoading ? "Saving" : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
        {step === 3 && (
          <>
            <ModalBody>
              <Container>
                <p className="h4">
                  Awesome, your details were saved, you are ready to start
                  delivering.
                </p>
              </Container>
              <ModalFooter>
                <Button color="secondary" onClick={toggleModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalBody>
          </>
        )}
      </form>
    </Modal>
  );
};

export default DeliveryOnboardModal;
