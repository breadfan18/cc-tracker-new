import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const RadioInput = ({ name, label, error, inquiriesStatus, onChange }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  const bureauNames = Object.keys(inquiriesStatus);

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <Form.Check
          type="switch"
          name="experian"
          id="custom-switch"
          label="Experian"
          value={bureauNames[0]}
          checked={inquiriesStatus.experian}
          onChange={onChange}
        />
        <Form.Check
          type="switch"
          name="equifax"
          id="custom-switch"
          label="Equifax"
          value={bureauNames[1]}
          checked={inquiriesStatus.equifax}
          onChange={onChange}
        />
        <Form.Check
          type="switch"
          name="transunion"
          id="custom-switch"
          label="Transunion"
          value={bureauNames[2]}
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
