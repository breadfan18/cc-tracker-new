import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CustomAccordion({
  accordionBody,
  dataType,
  defaultKey,
  windowWidth,
  user,
}) {
  const [headerShowing, setHeaderShowing] = useState(
    defaultKey === "1" ? true : false
  );

  const accordionBodyPadding = windowWidth < 650 ? "7px 0" : "10px 20px";

  return (
    <Accordion
      defaultActiveKey={defaultKey}
      flush={windowWidth < 650}
      style={{
        borderRadius: "10px",
        boxShadow: user ? "0 0 10px gray" : "none",
      }}
    >
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setHeaderShowing(!headerShowing)}>
          {user
            ? user
            : headerShowing
            ? `Hide ${dataType}`
            : `Show ${dataType}`}
        </Accordion.Header>
        <Accordion.Body style={{ padding: accordionBodyPadding }}>
          {accordionBody}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

CustomAccordion.propTypes = {
  accordionBody: PropTypes.element.isRequired,
  dataType: PropTypes.string.isRequired,
  defaultKey: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
};
