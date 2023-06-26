import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";

export default function LoyaltyCards({ loyaltyData }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const allCards = loyaltyData.map((acc) => {
    return (
      <Card style={{ width: cardWidth }} key={acc.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Subtitle
              className="mb-1 text-muted"
              style={{
                padding: "10px 0 10px 10px",
                borderRadius: "10px",
                margin: "0",
              }}
            >
              {acc.program.name}
            </Card.Subtitle>
          </div>
          <Card.Text style={{ padding: "0 0 0 10px" }}>
            <p className="mb-0 text-muted">
              <small>
                {" "}
                <label>Member ID:</label> {acc.memberId}
              </small>
            </p>
            <p className="mb-0 text-muted">
              <small>
                {" "}
                <label>User Name:</label> {acc.loginId}
              </small>
            </p>
            <p className="mb-0 text-muted">
              <small>
                {" "}
                <label>Password:</label> {acc.password}
              </small>
            </p>
          </Card.Text>
          <div className="editDeleteCard editDeleteOnCards">
            <LoyaltyAddEditModal loyaltyAcc={acc} />
            <ConfirmDeleteModal data={acc} dataType="loyaltyAcc" />
          </div>
        </Card.Body>
      </Card>
    );
  });
  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCards}</div>
  );
}

LoyaltyCards.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
};
