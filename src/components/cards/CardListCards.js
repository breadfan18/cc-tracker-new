import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { USERS } from "../../constants";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import {
  TbSquareRoundedCheckFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";
import CardText from "./CardText";
export default function CardListCards({ cards, showEditDelete, showUserName }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";

  const allCards = cards.map((card) => {
    const cardTitleColor =
      card.status === "closed"
        ? "rgb(248,215,218)"
        : card.status === "downgraded"
        ? "rgb(255,243,205)"
        : null;
    return (
      <Card style={{ width: cardWidth }} key={card.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            {showUserName && (
              <Card.Title
                style={{
                  padding: "10px 0 0 10px",
                  marginBottom: 0,
                  backgroundColor: cardTitleColor,
                  borderRadius: "5px 5px 0 0 ",
                }}
              >
                {USERS.find((user) => user.id === card.userId).name}
              </Card.Title>
            )}
            <Card.Subtitle
              className="mb-1 text-muted"
              style={{
                padding: "10px",
                margin: "0",
                backgroundColor: cardTitleColor,
                borderRadius: showUserName ? null : "5px 5px 0 0 ",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <p style={{ margin: 0 }}>{`${card.issuer} ${card.card}`}</p>
                <p style={{ margin: 0 }}>
                  {card.signupBonus}{" "}
                  {card.bonusEarned ? (
                    <TbSquareRoundedCheckFilled style={{ color: "#198754" }} />
                  ) : (
                    <TbSquareRoundedChevronsRightFilled
                      style={{ color: "#0080FF" }}
                    />
                  )}
                </p>
              </div>
            </Card.Subtitle>
          </div>
          <div style={{ padding: "0 0 0 10px" }}>
            <CardText card={card} dataType={"appDate"} />
            <CardText card={card} dataType={"creditLine"} />
            <CardText card={card} dataType={"annualFee"} />
            <CardText card={card} dataType={"nextFeeDate"} />
            <CardText card={card} dataType={"bonusEarnedDate"} />
            <CardText card={card} dataType={"cardType"} />
            {showEditDelete ?? (
              <div className="editDeleteCard editDeleteOnCards">
                <CardAddEditModal card={card} />
                <ConfirmDeleteModal data={card} dataType="card" />
              </div>
            )}
          </div>
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
  showEditDelete: PropTypes.bool,
  showUserName: PropTypes.bool,
};
