import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CustomAccordion({
  accordionBody,
  dataType,
  defaultKey,
}) {
  const [headerShowing, setHeaderShowing] = useState(
    defaultKey === "1" ? true : false
  );

  return (
    <Accordion defaultActiveKey={defaultKey}>
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setHeaderShowing(!headerShowing)}>
          {headerShowing ? `Hide ${dataType}` : `Show ${dataType}`}
        </Accordion.Header>
        <Accordion.Body>{accordionBody}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

CustomAccordion.propTypes = {
  accordionBody: PropTypes.element.isRequired,
  dataType: PropTypes.string.isRequired,
  defaultKey: PropTypes.string.isRequired,
};
