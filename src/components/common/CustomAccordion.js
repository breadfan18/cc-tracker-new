import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CustomAccordion({ accordionBody, dataType }) {
  const [headerShowing, setHeaderShowing] = useState(true);

  return (
    <Accordion defaultActiveKey="1">
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
};
