import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import { formatDate } from "../../helpers";
import { WindowWidthContext } from "../App";

export default function FiveTwentyFourCards({ cards }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const allCards = cards.map((card) => {
    return (
      <Card
        style={{ width: cardWidth, display: "flex", flexWrap: "wrap" }}
        key={card.id}
        className="cardCard"
      >
        <Card.Body style={{ padding: "0" }}>
          <Card.Subtitle
            className="mb-1 text-muted"
            style={{
              padding: "10px 0 10px 10px",
              margin: "0",
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            {`${card.issuer} ${card.card}`}
          </Card.Subtitle>
          <Card.Text style={{ padding: "0 0 0 10px" }}>
            <p style={{ margin: 0, color: "gray" }}>
              <small>{formatDate(card.appDate)}</small>
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
};
