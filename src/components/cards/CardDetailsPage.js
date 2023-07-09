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
import CardNotes from "./CardNotes";

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
        <div className="editDeleteCard">
          <CardAddEditModal card={props.card} />
          <ConfirmDeleteModal data={card} dataType="card" />
        </div>
      </section>
      <div className="cardDetailsBody">
        <Card style={{ width: "30rem" }}>
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
            <Card.Title style={{ fontSize: "1.5rem" }}>
              {card.issuer.name} {card.card}
            </Card.Title>
            <Card.Title style={{ fontSize: "1rem" }}>
              {cardholder.name}
            </Card.Title>
            <hr />
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                {" "}
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    App Date:
                  </strong>{" "}
                  {card.appDate}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Card Type:
                  </strong>{" "}
                  {card.cardType}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Annual Fee:
                  </strong>{" "}
                  {formatCurrency(card.annualFee)}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Next Fee Date:
                  </strong>{" "}
                  {card.nextFeeDate === "" ? "N/A" : card.nextFeeDate}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Credit Line:
                  </strong>{" "}
                  {formatCurrency(card.creditLine)}
                </Card.Text>
              </ListGroup.Item>

              <ListGroup.Item>
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Inquiries:
                  </strong>{" "}
                  {handleInquiriesList(card.inquiries)}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Signup Bonus:
                  </strong>{" "}
                  {card.signupBonus}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Spend Requirement:
                  </strong>{" "}
                  {formatCurrency(card.spendReq)}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Spend By Date:
                  </strong>{" "}
                  {card.spendBy}
                </Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>
                  {" "}
                  <strong style={{ color: "#0080FF", minWidth: "5rem" }}>
                    Card Status:
                  </strong>{" "}
                  {card.status}
                </Card.Text>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Body></Card.Body>
        </Card>
        <div id="cardDetailsSectionRight">
          <CardNotes />
          <CardNotes />
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
