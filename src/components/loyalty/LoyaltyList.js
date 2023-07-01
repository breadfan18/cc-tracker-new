import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import { useSortableData } from "../../hooks/sortData";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";

const LoyaltyList = ({ loyaltyData, showEditDelete }) => {
  const { data, requestSort } = useSortableData(loyaltyData);

  return loyaltyData.length === 0 ? (
    <EmptyList dataType={"loyalty account"} />
  ) : (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th className="tableHeader">
            Program
            <TiArrowUnsorted onClick={() => requestSort("program")} />
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
        {data.map((acc) => {
          return (
            <tr key={acc.id}>
              <td>
                <img className="loyaltyLogos" src={acc.program.img} alt="AA" />
              </td>
              <td>{acc.program.name}</td>
              <td>{acc.memberId}</td>
              <td>{acc.loginId}</td>
              <td>{acc.password}</td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <LoyaltyAddEditModal loyaltyAcc={acc} />
                    <ConfirmDeleteModal data={acc} dataType="loyaltyAcc" />
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
  history: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(LoyaltyList);
