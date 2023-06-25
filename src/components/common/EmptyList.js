import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmptyList = ({ dataType }) => {
  const route = dataType === "card" ? "card" : "loyalty";
  return (
    <div className="alert alert-danger" role="alert">
      <p style={{ marginBottom: "0" }}>
        No {`${dataType}s`} to display. Click{" "}
        <Link to={`/${route}/`} style={{ textDecoration: "none" }}>
          here
        </Link>{" "}
        to add a new {dataType}.
      </p>
      <AiOutlineUserAdd
        className="closeIcon"
        onClick={() => console.log("modalHeader")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

EmptyList.propTypes = {
  dataType: PropTypes.string.isRequired,
};

export default EmptyList;
