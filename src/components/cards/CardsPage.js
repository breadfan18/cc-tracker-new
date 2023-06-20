import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCards, deleteCard } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import CardTabs from "./CardTabs";
import { addUserNameToCard, sortCardsByDate } from "../../helpers";
import CardsByUserDropDown from "./CardsByUserDropDown";
import { toast } from "react-toastify";

const CardsPage = ({ cards, loadCards, loading, windowWidth, deleteCard }) => {
  const [redirectToAddCardPage, setRedirect] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});

  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
  }, []);

  function handleDeleteCard(card) {
    setDeletedCard({ ...card });
    deleteCard(card)
      .then(() => {
        toast.success("Card deleted");
      })
      .catch((error) => alert("Error deleteing card " + error));
  }

  return (
    <>
      {redirectToAddCardPage && <Redirect to="/card" />}
      <h2>Wallet</h2>
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-card"
        onClick={() => setRedirect(true)}
      >
        Add Card
      </button>
      {loading ? (
        <Spinner />
      ) : windowWidth < 600 ? (
        <CardsByUserDropDown
          cards={cards}
          windowWidth={windowWidth}
          deletedCard={deletedCard}
          onDelete={handleDeleteCard}
        />
      ) : (
        <CardTabs
          cards={cards}
          windowWidth={windowWidth}
          onDelete={handleDeleteCard}
          deletedCard={deletedCard}
        />
      )}
    </>
  );
};

CardsPage.propTypes = {
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  const cards = sortCardsByDate(state.cards).map((card) =>
    addUserNameToCard(card)
  );
  return {
    cards,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
  deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
