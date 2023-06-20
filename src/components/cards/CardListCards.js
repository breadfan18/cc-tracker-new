import React from "react";
import { Card } from "react-bootstrap";
import { USERS } from "../../constants";
import { EditButton } from "../common/EditButton";
import { DeleteButton } from "../common/DeleteButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import { formatDate } from "../../helpers";

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
      <Card style={{ width: cardWidth }} key={card.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            {showUserName && (
              <Card.Title style={{ padding: "10px 0 0 10px" }}>
                {USERS.find((user) => user.id === card.userId).name}
              </Card.Title>
            )}
            <Card.Subtitle
              className="mb-1 text-muted"
              style={{
                padding: "10px 0 10px 10px",
                borderRadius: "10px",
                margin: "0",
              }}
            >
              {`${card.issuer} ${card.card}`}
            </Card.Subtitle>
          </div>
          <Card.Text style={{ padding: "0 0 0 10px" }}>
            <p className="mb-0 text-muted">
              <small>{formatDate(card.appDate)}</small>
            </p>

            <p className="text-muted">
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
  deletedCard: PropTypes.object,
  windowWidth: PropTypes.number.isRequired,
  showEditDelete: PropTypes.bool,
  showUserName: PropTypes.bool,
};
