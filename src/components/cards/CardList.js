import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";

const CardList = ({ cards, onDeleteClick, deletedCard, showEditDelete }) => {
  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th>App Date</th>
          <th>User</th>
          <th>Issuer</th>
          <th>Card</th>
          <th>Type</th>
          {showEditDelete && (
            <>
              <th>Delete?</th>
              <th>Modify?</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {cards.map((card) => {
          const isCardDeleted = card.id === deletedCard?.id;
          return (
            <tr key={card.id}>
              <td>{card.appDate}</td>
              <td>{card.userName}</td>
              <td>{card.issuer}</td>
              <td>{card.card}</td>
              <td>{card.cardType}</td>
              {showEditDelete && (
                <>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      style={{ minWidth: "110px" }}
                      onClick={() => onDeleteClick(card)}
                      disabled={isCardDeleted}
                    >
                      {isCardDeleted ? "Deleting.." : "Delete"}
                    </button>
                  </td>
                  <td>
                    <Link to={"/card/" + card.id}>
                      <button
                        className="btn btn-outline-info"
                        style={{ minWidth: "110px" }}
                      >
                        Modify
                      </button>
                    </Link>
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
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
  onDeleteClick: PropTypes.func,
  history: PropTypes.object,
  deletedCard: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(CardList);
