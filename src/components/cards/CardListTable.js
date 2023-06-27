import React, { useContext } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  TbSquareRoundedCheckFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";
import { useSortableData } from "../../hooks/sortData";
import { formatDate, titleCase, formatCurrency } from "../../helpers";
import CardAddEditModal from "./CardAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";

export default function CardListTable({
  cards,
  showEditDelete,
  showUser,
  showCompactTable,
}) {
  const windowWidth = useContext(WindowWidthContext);
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
          {windowWidth > 1482 && (
            <th className="tableHeader">
              Credit Line{" "}
              <TiArrowUnsorted onClick={() => requestSort("creditLine")} />
            </th>
          )}
          {windowWidth > 1482 && <th className="tableHeader">Credit Pull</th>}
          <th className="tableHeader">
            Annual Fee{" "}
            <TiArrowUnsorted onClick={() => requestSort("annualFee")} />
          </th>
          <th className="tableHeader">Next Fee Date</th>
          {windowWidth > 1380 && !showCompactTable && (
            <th className="tableHeader">Spend Req</th>
          )}
          {windowWidth > 1380 && !showCompactTable && (
            <th className="tableHeader">Spend By</th>
          )}
          {windowWidth > 1044 && !showCompactTable && (
            <th className="tableHeader">Bonus</th>
          )}
          {windowWidth > 1280 && !showCompactTable && (
            <th className="tableHeader">Bonus Earn Date</th>
          )}
          <th className="tableHeader">
            Status <TiArrowUnsorted onClick={() => requestSort("status")} />
          </th>
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
            <tr
              key={card.id}
              className={
                card.status === "closed"
                  ? "table-danger"
                  : card.status === "downgraded"
                  ? "table-warning"
                  : null
              }
            >
              <td>{formatDate(card.appDate)}</td>
              {showUser && <td>{card.userName}</td>}
              <td>{`${card.issuer} ${card.card}`}</td>
              <td>{card.cardType}</td>
              {windowWidth > 1482 && <td>{formatCurrency(card.creditLine)}</td>}
              {windowWidth > 1482 && (
                <td className="creditPullColumn">
                  {handleInquiriesList(card.inquiries)}
                </td>
              )}
              <td>{formatCurrency(card.annualFee)}</td>
              <td>
                {card.nextFeeDate === "N/A"
                  ? "N/A"
                  : formatDate(card.nextFeeDate)}
              </td>
              {windowWidth > 1380 && !showCompactTable && (
                <td>{formatCurrency(card.spendReq)}</td>
              )}
              {windowWidth > 1380 && !showCompactTable && (
                <td>{formatDate(card.spendBy)}</td>
              )}
              {windowWidth > 1044 && !showCompactTable && (
                <td>
                  {card.bonusEarned ? (
                    <TbSquareRoundedCheckFilled style={{ color: "#198754" }} />
                  ) : (
                    <TbSquareRoundedChevronsRightFilled
                      style={{ color: "#0080FF" }}
                    />
                  )}{" "}
                  {card.signupBonus}
                </td>
              )}
              {windowWidth > 1280 && !showCompactTable && (
                <td>
                  {card.bonusEarnDate ? formatDate(card.bonusEarnDate) : "WIP"}
                </td>
              )}
              <td>{titleCase(card.status)}</td>

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
  showCompactTable: PropTypes.bool.isRequired,
};
