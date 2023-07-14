import React from "react";
import { TbAlertOctagonFilled } from "react-icons/tb";
import PropTypes from "prop-types";

export const CardReminder = ({ card }) => {
  return (
    <>
      <article style={{ display: "flex", alignItems: "center" }}>
        <TbAlertOctagonFilled
          style={{ color: "red", fontSize: "2rem", marginRight: "1rem" }}
        />
        <p style={{ marginBottom: 0 }}>Annual Fee Due within 90 days</p>
      </article>
      <hr style={{ color: "gray" }} />
    </>
  );
};

CardReminder.propTypes = {
  card: PropTypes.object.isRequired,
};
