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

const LoyaltyList = ({
  loyaltyData,
  onDeleteClick,
  deletedAcc,
  showEditDelete,
}) => {
  const { data, requestSort } = useSortableData(loyaltyData);

  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"loyalty account"} />
  ) : (
    <Table>
      <thead>
        <tr>
          <th className="tableHeader">
            Program
            <TiArrowUnsorted onClick={() => requestSort("company")} />
          </th>
          <th className="tableHeader">
            Member ID{" "}
            <TiArrowUnsorted onClick={() => requestSort("memberId")} />
          </th>
          <th className="tableHeader">
            User Name <TiArrowUnsorted onClick={() => requestSort("loginId")} />
          </th>
          <th className="tableHeader">
            Password <TiArrowUnsorted onClick={() => requestSort("password")} />
          </th>
          {showEditDelete && (
            <>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="align-middle">
        {data.map((loyalty) => {
          const isAccDeleted = loyalty.id === deletedAcc?.id;
          return (
            <tr key={loyalty.id}>
              <td>{loyalty.company}</td>
              <td>{loyalty.memberId}</td>
              <td>{loyalty.loginId}</td>
              <td>{loyalty.password}</td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <Link to={"/loyalty/" + loyalty.id}>
                      <Button
                        variant="outline-success"
                        className="rounded-circle"
                        disabled={isAccDeleted}
                      >
                        <MdModeEditOutline />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteClick(loyalty)}
                      disabled={isAccDeleted}
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

LoyaltyList.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
  history: PropTypes.object,
  deletedAcc: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(LoyaltyList);
