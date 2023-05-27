import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCards } from "../../redux/actions/cardsActions";
import { loadUsers } from "../../redux/actions/userActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import CardList from "./CardList";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const CardsPage = ({ cards, users, loadCards, loadUsers, loading }) => {
  const [redirectToAddCardPage, setRedirect] = useState(false);

  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
    if (users.length === 0) {
      loadUsers();
    }
  }, []);

  return (
    <>
      {redirectToAddCardPage && <Redirect to="/card" />}
      <h2>Wallet</h2>
      {loading ? (
        <Spinner />
      ) : (
        <CardList cards={cards} onDeleteClick={() => console.log("foo")} />
      )}
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
  users: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const cards =
    state.users.length > 0
      ? state.cards.map((card) => {
          return {
            ...card,
            userName: state.users.find((user) => user.userId === card.userId)
              .name,
          };
        })
      : state.cards;
  return {
    cards,
    users: state.users,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
