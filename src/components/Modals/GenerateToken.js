import React from "react";
import { Modal, Input, Button } from "reactstrap";

const GenerateToken = ({ toggleOpen, isOpen }) => (
  <Modal isOpen={isOpen} toggle={toggleOpen} modalClassName="modal-black">
    <div className="modal-header">
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
        onClick={toggleOpen}
      >
        <i className="tim-icons icon-simple-remove"></i>
      </button>
      <h5 className="modal-title">Your Token</h5>
    </div>
    <div className="modal-body">
      <div className="mb-2">
        <p>
          New token created !<strong> It will only be displayed now</strong>
        </p>
      </div>
      <div className="mb-2">
        <Input readOnly value="fdkjsldjfksd09d8fs" type="text" />
      </div>
      <div className="mb-2">
        <p className="text-muted">Please copy it and keep it somewhere safe</p>
      </div>
    </div>
    <div className="modal-footer p-3">
      <Button color="secondary" className="float-left" onClick={toggleOpen}>
        Close
      </Button>
    </div>
  </Modal>
);

export default GenerateToken;
