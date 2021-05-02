import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const FormCheckButton = (props) => (
    <div className={props.type ===  'radio' ? "form-check-radio" : ''}>
      <FormGroup check>
        <Label className="form-check-label">
          <Input name={props.name} value={props.value} type={props.type} {...props}/>{' '}
          {props.label}
          <span className="form-check-sign">
            <span className="check"></span>
          </span>
        </Label>
      </FormGroup>
    </div> 
)

export default FormCheckButton;