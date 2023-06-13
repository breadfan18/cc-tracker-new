import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const RadioInput = ({ name, label, error, inquiriesStatus }) => {
  const [selected, setSelected] = useState({
    experian: true,
    equifax: false,
    transunion: false,
  });
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
          name="experian"
          id="custom-switch"
          label="Experian"
          // value={selected.experian}
          checked={inquiriesStatus.experian}
          onChange={() =>
            setSelected((prevValue) => ({
              ...prevValue,
              experian: !prevValue.experian,
            }))
          }
        />
        <Form.Check
          type="switch"
          name="equifax"
          id="custom-switch"
          label="Equifax"
          // value={selected.equifax}
          checked={inquiriesStatus.equifax}
          onChange={() =>
            setSelected((prevValue) => ({
              ...prevValue,
              equifax: !prevValue.equifax,
            }))
          }
        />
        <Form.Check
          type="switch"
          name="transunion"
          id="custom-switch"
          label="Transunion"
          // value={selected.transunion}
          checked={inquiriesStatus.transunion}
          onChange={() =>
            setSelected((prevValue) => ({
              ...prevValue,
              transunion: !prevValue.transunion,
            }))
          }
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
