import React, { useState } from "react";
import CardList from "../cards/CardList";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CustomAccordion({ cardList }) {
  const [cardsShowing, setCardShowing] = useState(false);

  return (
    <Accordion onClick={() => setCardShowing(!cardsShowing)}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {cardsShowing ? "Hide Cards" : "Show Cards"}
        </Accordion.Header>
        <Accordion.Body>
          <CardList cards={cardList} onDeleteClick={() => {}} deleteCard={{}} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

CustomAccordion.propTypes = {
  cardList: PropTypes.array.isRequired,
};
