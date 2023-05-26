import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";

const CardList = ({ cards, onDeleteClick }) => {
  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th>Visit</th>
          <th>Issuer</th>
          <th>Card</th>
          <th>User</th>
          <th>Delete?</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card) => {
          return (
            <tr key={card.id}>
              <td>{card.issuer}</td>
              <td>
                <Link to={"/card/" + card.id}>{`${card.issuer}`}</Link>
              </td>
              <td>{card.card}</td>
              <td>{card.user}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(card)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    state,
    ownProps,
  };
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CardList);
