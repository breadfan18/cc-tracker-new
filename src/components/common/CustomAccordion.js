import React, { useState } from "react";
import CardList from "../cards/CardList";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CustomAccordion({ accordionBody, dataType }) {
  const [headerShowing, setHeaderShowing] = useState(false);

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
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
