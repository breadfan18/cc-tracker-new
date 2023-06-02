import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCards } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import CardTabs from "./CardTabs";
import { addUserNameToCard } from "../../helpers";

const CardsPage = ({ cards, loadCards, loading }) => {
  const [redirectToAddCardPage, setRedirect] = useState(false);

  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
  }, []);

  return (
    <>
      {redirectToAddCardPage && <Redirect to="/card" />}
      <h2>Wallet</h2>
      {loading ? <Spinner /> : <CardTabs cards={cards} />}
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        onClick={() => setRedirect(true)}
      >
        Add Card
      </button>
    </>
  );
};

CardsPage.propTypes = {
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const cards = state.cards.map((card) => addUserNameToCard(card));
  return {
    cards,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
