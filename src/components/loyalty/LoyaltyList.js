import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import { useSortableData } from "../../hooks/sortData";
import { DeleteButton } from "../common/DeleteButton";
import LoyaltyAddEditModal from "./LoyaltyAddEditModal";

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
        {data.map((loyalty) => {
          const isAccDeleted = loyalty.id === deletedAcc?.id;
          return (
            <tr key={loyalty.id}>
              <td>
                <img
                  src={loyalty.program.img}
                  alt="AA"
                  style={{ height: "2.5rem", width: "3.5rem" }}
                />
              </td>
              <td>{loyalty.program.name}</td>
              <td>{loyalty.memberId}</td>
              <td>{loyalty.loginId}</td>
              <td>{loyalty.password}</td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <LoyaltyAddEditModal loyaltyAcc={loyalty} />
                    <DeleteButton
                      data={loyalty}
                      onDelete={onDeleteClick}
                      disabled={isAccDeleted}
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

LoyaltyList.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
  history: PropTypes.object,
  deletedAcc: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(LoyaltyList);
