import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
  bkgrdColor,
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}
        // style={{
        //   backgroundColor: "rgb(0,128,255)",
        //   color: "white",
        //   borderRadius: "10px 10px 0 0",
        //   padding: "8px 14px",
        // }}
      >
        {label}
      </label>
      <Form.Select
        aria-label={defaultOption}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        style={{
          backgroundColor: `${bkgrdColor}`,
          // borderRadius: "0 10px 10px 10px",
        }}
      >
        <option value="">{defaultOption}</option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </Form.Select>
      <div className="field">
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default SelectInput;
