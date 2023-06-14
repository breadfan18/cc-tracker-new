import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import { useSortableData } from "../../hooks/sortData";
import { titleCase } from "../../helpers";
import { DeleteButton } from "../common/DeleteButton";
import { EditButton } from "../common/EditButton";
import _ from "lodash";

const CardList = ({ cards, onDeleteClick, deletedCard, showEditDelete }) => {
  const { data, requestSort } = useSortableData(cards);

  function handleInquiriesList(inq) {
    return Object.keys(inq)
      .reduce((output, i) => {
        if (inq[i]) output.push(i);
        return output;
      }, [])
      .map((i) => <p key={i}>{titleCase(i)}</p>);
  }

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
          <th>Credit Pull</th>
          {showEditDelete && (
            <>
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
              <td className="creditPullColumn">
                {handleInquiriesList(card.inquiries)}
              </td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <Link to={"/card/" + card.id}>
                      <EditButton disabled={isCardDeleted} />
                    </Link>
                    <DeleteButton
                      disabled={isCardDeleted}
                      onDelete={onDeleteClick}
                      data={card}
                    />
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
