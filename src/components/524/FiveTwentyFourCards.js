import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";

export default function FiveTwentyFourCards({ cards, windowWidth }) {
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const allCards = cards.map((card) => {
    return (
      <Card
        style={{ width: cardWidth, display: "flex", flexWrap: "wrap" }}
        key={card.id}
        className="cardCard"
      >
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {`${card.issuer} ${card.card}`}
          </Card.Subtitle>
          <Card.Text>
            <p style={{ margin: 0, color: "gray" }}>
              <small>{card.appDate}</small>
            </p>

            <p style={{ margin: 0, color: "gray" }}>
              <small>{card.cardType}</small>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });
  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCards}</div>
  );
}

FiveTwentyFourCards.propTypes = {
  cards: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  deletedCard: PropTypes.object.isRequired,
  isCardDeleted: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  showEditDelete: PropTypes.bool.isRequired,
};
