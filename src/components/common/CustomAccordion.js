import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
export default function CustomAccordion({
  accordionBody,
  defaultKey,
  user,
  show524Status,
  fiveTwentyFourStatusElement,
}) {
  const [headerShowing, setHeaderShowing] = useState(
    defaultKey === "1" ? true : false
  );

  return (
    <Accordion
      defaultActiveKey={defaultKey}
      style={{
        borderRadius: "10px",
        boxShadow: user ? "0 0 10px gray" : "none",
      }}
    >
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setHeaderShowing(!headerShowing)}>
          {user}
        </Accordion.Header>
        <Accordion.Body>
          {show524Status && fiveTwentyFourStatusElement}
          {show524Status && <hr style={{ marginBottom: 0, color: "gray" }} />}
          {accordionBody}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

CustomAccordion.propTypes = {
  accordionBody: PropTypes.element || null,
  defaultKey: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  show524Status: PropTypes.bool,
  fiveTwentyFourStatusElement: PropTypes.object || PropTypes.string,
};
