import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadCardsFromFirebase,
  saveCardToFirebase,
} from "../../redux/actions/cardsActions";
import PropTypes from "prop-types";
import { Spinner } from "../common/Spinner";
import { USERS, NEW_CARD } from "../../constants";
import { Card, ListGroup } from "react-bootstrap";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { formatCurrency, formatDate, handleInquiriesList } from "../../helpers";

function CardDetailsPage({ cards, loadCardsFromFirebase, loading, ...props }) {
  const [card, setCard] = useState({ ...props.card });
  const [cardholder, setCardholder] = useState("");

  useEffect(() => {
    if (cards.length === 0) {
      loadCardsFromFirebase();
    } else {
      // Need to understand this logic..
      setCard({ ...props.card });
      setCardholder(USERS.find((user) => user.id === props.card.userId));
    }
  }, [props.card]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Card Details</h2>
      </section>
      <div className="cardDetailsBody">
        <Card style={{ width: "40rem" }}>
          <Card.Img
            variant="top"
            src={card.issuer.img}
            style={{
              padding: "2rem",
              backgroundColor: "#D9D7D7",
              maxHeight: "10rem",
              objectFit: "contain",
            }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "2.2rem" }}>
              {card.issuer.name} {card.card}
            </Card.Title>
            <Card.Title style={{ fontSize: "1.5rem" }}>
              {cardholder.name}
            </Card.Title>
            <hr />
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                {" "}
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>App Date:</strong>{" "}
                  {card.appDate}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>Card Type:</strong>{" "}
                  {card.cardType}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>Annual Fee:</strong>{" "}
                  {formatCurrency(card.annualFee)}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>
                    Next Fee Date:
                  </strong>{" "}
                  {card.nextFeeDate === "" ? "N/A" : card.nextFeeDate}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>
                    Credit Line:
                  </strong>{" "}
                  {formatCurrency(card.creditLine)}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>Inquiries:</strong>{" "}
                  {handleInquiriesList(card.inquiries)}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>
                    Signup Bonus:
                  </strong>{" "}
                  {card.signupBonus}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>
                    Spend Requirement:
                  </strong>{" "}
                  {formatCurrency(card.spendReq)}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>
                    Spend By Date:
                  </strong>{" "}
                  {card.spendBy}
                </Card.Title>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title>
                  {" "}
                  <strong style={{ color: "#0080FF" }}>
                    Card Status:
                  </strong>{" "}
                  {card.status}
                </Card.Title>
              </ListGroup.Item>
            </ListGroup>
            <hr />
          </Card.Body>
          <Card.Body>
            <div
              className="editDeleteCard editDeleteOnCards"
              style={{ backgroundColor: "white" }}
            >
              <CardAddEditModal card={props.card} />
              <ConfirmDeleteModal data={card} dataType="card" />
            </div>
          </Card.Body>
        </Card>
        <div style={{ height: "100%", border: "2px solid black" }}>
          Comments
        </div>
      </div>
    </div>
  );
}

CardDetailsPage.propTypes = {
  card: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  loadCardsFromFirebase: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function getCardById(cards, id) {
  return cards.find((card) => card.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const card =
    id && state.cards.length > 0 ? getCardById(state.cards, id) : NEW_CARD;
  return {
    card,
    cards: state.cards,
    loading: state.apiCallsInProgress > 0 || state.cards.length === 0,
  };
}

const mapDispatchToProps = {
  loadCardsFromFirebase,
  saveCardToFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsPage);
