import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import { BsTrash3 } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "react-bootstrap";

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
      <tbody className="align-middle">
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
                  <td className="editDeleteCard">
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteClick(card)}
                      disabled={isCardDeleted}
                      className="rounded-circle"
                    >
                      <BsTrash3 />
                    </Button>
                    <Link to={"/card/" + card.id}>
                      <Button
                        variant="outline-success"
                        className="rounded-circle"
                      >
                        <MdModeEditOutline />
                      </Button>
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
