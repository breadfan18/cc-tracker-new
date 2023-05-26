import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCards } from "../../redux/actions/cardsActions";
import PropTypes from "prop-types";
import CardList from "./CardList";

const CardsPage = ({ cards, loadCards }) => {
  useEffect(() => {
    if (cards.length === 0) loadCards();
  }, []);

  return (
    <>
      <CardList cards={cards} onDeleteClick={() => console.log("foo")} />
    </>
  );
};

CardsPage.propTypes = {
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
  };
}

const mapDispatchToProps = {
  loadCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
