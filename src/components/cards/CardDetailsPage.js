import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadCardsFromFirebase,
  saveCardToFirebase,
} from "../../redux/actions/cardsActions";
import { loadCardNotesFromFirebase } from "../../redux/actions/cardNotesActions";
import PropTypes from "prop-types";
import { Spinner } from "../common/Spinner";
import { USERS, NEW_CARD } from "../../constants";
import { Card, Table } from "react-bootstrap";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import {
  formatCurrency,
  handleInquiriesList,
  setColorForCardStatus,
  sortNotesByDate,
  sortCardsByDate,
} from "../../helpers";
import CardNotes from "./CardNotes";
import { WindowWidthContext } from "../App";

function CardDetailsPage({
  cards,
  loadCardsFromFirebase,
  loading,
  loadCardNotesFromFirebase,
  cardNotes,
  ...props
}) {
  const [card, setCard] = useState({ ...props.card });
  const [notesForThisCard, setNotesForThisCard] = useState(
    cardNotes.filter((note) => note.cardId === card.id)
  );
  const [cardholder, setCardholder] = useState("");
  const windowWidth = useContext(WindowWidthContext);

  useEffect(() => {
    if (cards.length === 0) {
      loadCardsFromFirebase();
    } else {
      // Need to understand this logic..
      setCard({ ...props.card });
      setCardholder(USERS.find((user) => user.id === props.card.userId));
    }
  }, [props.card]);

  useEffect(() => {
    if (cardNotes.length === 0) {
      loadCardNotesFromFirebase();
    } else {
      setNotesForThisCard(cardNotes.filter((note) => note.cardId === card.id));
    }
  }, [cardNotes]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Card Details</h2>
        <div className="editDeleteCard">
          <CardAddEditModal card={card} />
          <ConfirmDeleteModal data={card} dataType="card" />
        </div>
      </section>
      <div className="cardDetailsBody">
        <Card
          style={{
            width: windowWidth > 800 ? "30rem" : windowWidth,
            backgroundColor: setColorForCardStatus("cardCard", card.status),
            marginRight: windowWidth > 800 ? "15px" : null,
            marginBottom: windowWidth > 800 ? null : "15px",
          }}
        >
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
            <Table className={setColorForCardStatus("cardTable", card.status)}>
              <tbody className="align-middle">
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    App Date:
                  </td>
                  <td>{card.appDate}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Card Type:
                  </td>
                  <td>{card.cardType}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Annual Fee:
                  </td>
                  <td>{formatCurrency(card.annualFee)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Next Fee Date:
                  </td>
                  <td>{card.nextFeeDate}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Credit Line:
                  </td>
                  <td>{formatCurrency(card.creditLine)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Inquiries:
                  </td>
                  <td>{handleInquiriesList(card.inquiries)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Signup Bonus:
                  </td>
                  <td>{card.signupBonus}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Spend Requirement:
                  </td>
                  <td>{formatCurrency(card.spendReq)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Spend By:
                  </td>
                  <td>{card.spendBy}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: "#0080FF" }}
                    className="cardDetailsFieldHeaders"
                  >
                    Card Status:
                  </td>
                  <td>{card.status}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div id="cardDetailsSectionRight" style={{ flex: 1 }}>
          <CardNotes
            card={card}
            cardNotes={sortNotesByDate(notesForThisCard)}
          />
        </div>
      </div>
    </div>
  );
}

CardDetailsPage.propTypes = {
  card: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  cardNotes: PropTypes.array.isRequired,
  loadCardsFromFirebase: PropTypes.func.isRequired,
  loadCardNotesFromFirebase: PropTypes.func.isRequired,
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
    cardNotes: state.cardNotes,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCardsFromFirebase,
  saveCardToFirebase,
  loadCardNotesFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsPage);
