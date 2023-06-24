import React from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { TiArrowUnsorted } from "react-icons/ti";
import { useSortableData } from "../../hooks/sortData";
import { formatDate, titleCase } from "../../helpers";
import { DeleteButton } from "../common/DeleteButton";
import AddEditCardModal from "./AddEditCardModal";

export default function CardListTable({
  cards,
  onDeleteClick,
  deletedCard,
  showEditDelete,
  showUser,
}) {
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
            Issuer <TiArrowUnsorted onClick={() => requestSort("issuer")} />
          </th>
          <th className="tableHeader">
            Card <TiArrowUnsorted onClick={() => requestSort("card")} />
          </th>
          <th className="tableHeader">
            Type <TiArrowUnsorted onClick={() => requestSort("cardType")} />
          </th>
          <th className="tableHeader">
            Annual Fee{" "}
            <TiArrowUnsorted onClick={() => requestSort("annualFee")} />
          </th>
          <th className="tableHeader">
            Next Fee Date{" "}
            <TiArrowUnsorted onClick={() => requestSort("nextFeeDate")} />
          </th>
          <th className="tableHeader">Credit Pull</th>
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
              <td>{formatDate(card.appDate)}</td>
              {showUser && <td>{card.userName}</td>}
              <td>{card.issuer}</td>
              <td>{card.card}</td>
              <td>{card.cardType}</td>
              <td>${card.annualFee}</td>
              <td>
                {card.nextFeeDate === "N/A"
                  ? "N/A"
                  : formatDate(card.nextFeeDate)}
              </td>
              <td className="creditPullColumn">
                {handleInquiriesList(card.inquiries)}
              </td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <AddEditCardModal card={card} />
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
}

CardListTable.propTypes = {
  cards: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
  history: PropTypes.object,
  deletedCard: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
  showUser: PropTypes.bool.isRequired,
};
