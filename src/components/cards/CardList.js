import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import { BsTrash3 } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "react-bootstrap";
import { useSortableData } from "../../hooks/sortData";

const CardList = ({ cards, onDeleteClick, deletedCard, showEditDelete }) => {
  const { data, requestSort } = useSortableData(cards);

  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table>
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
        {data.map((card) => {
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
                    <Link to={"/card/" + card.id}>
                      <Button
                        variant="outline-success"
                        className="rounded-circle"
                      >
                        <MdModeEditOutline />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteClick(card)}
                      disabled={isCardDeleted}
                      className="rounded-circle"
                    >
                      <BsTrash3 />
                    </Button>
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
