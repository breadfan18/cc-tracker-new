import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCards } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import CardList from "./CardList";

const CardsPage = ({ cards, loadCards, loading }) => {
  useEffect(() => {
    if (cards.length === 0) loadCards();
  }, []);

  return (
    <>
      <h2>Wallet</h2>
      {loading ? (
        <Spinner />
      ) : (
        <CardList cards={cards} onDeleteClick={() => console.log("foo")} />
      )}
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        onClick={() => console.log("Add an Author")}
      >
        Add Card
      </button>
    </>
  );
};

CardsPage.propTypes = {
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
