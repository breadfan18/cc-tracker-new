import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";

const CardList = ({ cards, onDeleteClick, deletedCard, showEditDelete }) => {
  let sortedCards = [...cards];
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  if (sortConfig.key !== null) {
    sortedCards.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader">
            App Date
            <TiArrowUnsorted onClick={() => requestSort("appDate")} />
          </th>
          <th className="tableHeader">
            User
            <TiArrowUnsorted onClick={() => requestSort("userName")} />
          </th>
          <th className="tableHeader">
            Issuer <TiArrowUnsorted onClick={() => requestSort("issuer")} />
          </th>
          <th className="tableHeader">
            Card <TiArrowUnsorted onClick={() => requestSort("card")} />
          </th>
          <th className="tableHeader">
            Type <TiArrowUnsorted onClick={() => requestSort("cardType")} />
          </th>
          {showEditDelete && (
            <>
              <th></th>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedCards.map((card) => {
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
