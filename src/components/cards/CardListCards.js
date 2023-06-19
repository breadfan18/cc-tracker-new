import React from "react";
import { Card } from "react-bootstrap";
import { USERS } from "../../constants";
import { EditButton } from "../common/EditButton";
import { DeleteButton } from "../common/DeleteButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";

export default function CardListCards({
  cards,
  onDeleteClick,
  deletedCard,
  windowWidth,
  showEditDelete,
  showUserName,
}) {
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const allCards = cards.map((card) => {
    const isCardDeleted = card.id === deletedCard?.id;
    return (
      <Card
        style={{ width: cardWidth, display: "flex", flexWrap: "wrap" }}
        key={card.id}
        className="cardCard"
      >
        <Card.Body>
          {showUserName && (
            <Card.Title>
              {USERS.find((user) => user.id === card.userId).name}
            </Card.Title>
          )}
          <Card.Subtitle className="mb-2 text-muted">
            {`${card.issuer} ${card.card}`}
          </Card.Subtitle>
          <hr />
          <Card.Text>
            <p style={{ margin: 0, color: "gray" }}>
              <small>{card.appDate}</small>
            </p>

            <p style={{ margin: 0, color: "gray" }}>
              <small>{card.cardType}</small>
            </p>
          </Card.Text>
          {showEditDelete ?? (
            <div className="editDeleteCard editDeleteOnCards">
              <Link to={"/card/" + card.id}>
                <EditButton disabled={isCardDeleted} />
              </Link>
              <DeleteButton
                disabled={isCardDeleted}
                onDelete={onDeleteClick}
                data={card}
              />
            </div>
          )}
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

CardListCards.propTypes = {
  cards: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  deletedCard: PropTypes.object.isRequired,
  isCardDeleted: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  showEditDelete: PropTypes.bool,
  showUserName: PropTypes.bool,
};
