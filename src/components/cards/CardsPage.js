import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCards } from "../../redux/actions/cardsActions";
import PropTypes from "prop-types";

const CardsPage = ({ cards, loadCards }) => {
  useEffect(() => {
    if (cards.length === 0) loadCards();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Issuer</th>
          <th>Card</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card) => {
          return (
            <tr key={card.id}>
              <td>{card.issuer}</td>
              <td>{card.card}</td>
              <td>{card.user}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
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
