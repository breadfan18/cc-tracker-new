import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const RadioInput = ({ name, label, error, inquiriesStatus, onChange }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <Form.Check
          type="switch"
          name="inquiries"
          id="custom-switch"
          label="Experian"
          value="experian"
          checked={inquiriesStatus.experian}
          onChange={onChange}
        />
        <Form.Check
          type="switch"
          name="inquiries"
          id="custom-switch"
          label="Equifax"
          value="equifax"
          checked={inquiriesStatus.equifax}
          onChange={onChange}
        />
        <Form.Check
          type="switch"
          name="inquiries"
          id="custom-switch"
          label="Transunion"
          value="transunion"
          checked={inquiriesStatus.transunion}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inquiriesStatus: PropTypes.object.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default RadioInput;
