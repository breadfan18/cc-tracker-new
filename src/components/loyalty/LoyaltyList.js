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

const CardList = ({
  loyaltyData,
  onDeleteClick,
  deletedCard,
  showEditDelete,
}) => {
  const { data, requestSort } = useSortableData(loyaltyData);

  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table>
      <thead>
        <tr>
          <th className="tableHeader">
            User
            <TiArrowUnsorted onClick={() => requestSort("userName")} />
          </th>
          <th className="tableHeader">
            Airline
            <TiArrowUnsorted onClick={() => requestSort("airline")} />
          </th>
          <th className="tableHeader">
            Member ID{" "}
            <TiArrowUnsorted onClick={() => requestSort("memberId")} />
          </th>
          <th className="tableHeader">
            User Name{" "}
            <TiArrowUnsorted onClick={() => requestSort("userName")} />
          </th>
          <th className="tableHeader">
            Password <TiArrowUnsorted onClick={() => requestSort("password")} />
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
        {data.map((loyalty) => {
          const isCardDeleted = loyalty.id === deletedCard?.id;
          return (
            <tr key={loyalty.id}>
              <td>{loyalty.userName}</td>
              <td>{loyalty.airline}</td>
              <td>{loyalty.memberId}</td>
              <td>{loyalty.loginId}</td>
              <td>{loyalty.password}</td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <Link to={"/card/" + loyalty.id}>
                      <Button
                        variant="outline-success"
                        className="rounded-circle"
                      >
                        <MdModeEditOutline />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteClick(loyalty)}
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
  loyaltyData: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
  history: PropTypes.object,
  deletedCard: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(CardList);
