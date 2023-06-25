import React from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import { useSortableData } from "../../hooks/sortData";
import { formatDate, titleCase, formatCurrency } from "../../helpers";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";

export default function CardListTable({ cards, showEditDelete, showUser }) {
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
          {showUser && (
            <th className="tableHeader">
              User
              <TiArrowUnsorted onClick={() => requestSort("userName")} />
            </th>
          )}
          <th className="tableHeader">
            Card <TiArrowUnsorted onClick={() => requestSort("issuer")} />
          </th>
          <th className="tableHeader">
            Type <TiArrowUnsorted onClick={() => requestSort("cardType")} />
          </th>
          <th className="tableHeader">
            Credit Line{" "}
            <TiArrowUnsorted onClick={() => requestSort("creditLine")} />
          </th>
          <th className="tableHeader">Credit Pull</th>
          <th className="tableHeader">
            Annual Fee{" "}
            <TiArrowUnsorted onClick={() => requestSort("annualFee")} />
          </th>
          <th className="tableHeader">Next Fee Date</th>
          <th className="tableHeader">Spend Req</th>
          <th className="tableHeader">Spend By</th>
          <th className="tableHeader">Bonus</th>
          <th className="tableHeader">Bonus Earn Date</th>
          {showEditDelete && (
            <>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="align-middle">
        {data.map((card) => {
          return (
            <tr key={card.id}>
              <td>{formatDate(card.appDate)}</td>
              {showUser && <td>{card.userName}</td>}
              <td>{`${card.issuer} ${card.card}`}</td>
              <td>{card.cardType}</td>
              <td>{formatCurrency(card.creditLine)}</td>
              <td className="creditPullColumn">
                {handleInquiriesList(card.inquiries)}
              </td>
              <td>{formatCurrency(card.annualFee)}</td>
              <td>
                {card.nextFeeDate === "N/A"
                  ? "N/A"
                  : formatDate(card.nextFeeDate)}
              </td>
              <td>{formatCurrency(card.spendReq)}</td>
              <td>{formatDate(card.spendBy)}</td>
              <td>{card.signupBonus}</td>
              <td>
                {card.bonusEarnDate ? formatDate(card.bonusEarnDate) : "WIP"}
              </td>

              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <CardAddEditModal card={card} />
                    <ConfirmDeleteModal data={card} dataType="card" />
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

CardListTable.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
  showUser: PropTypes.bool.isRequired,
};
