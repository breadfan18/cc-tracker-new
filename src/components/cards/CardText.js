import React from "react";
import PropTypes from "prop-types";
import { formatCurrency, formatDate } from "../../helpers";

function CardText({ card, dataType }) {
  const setCardDataType = (card, dataType) => {
    switch (dataType) {
      case "appDate":
        return {
          fieldName: "App Date",
          value: formatDate(card.appDate),
        };
      case "creditLine":
        return {
          fieldName: "Credit Line",
          value: formatCurrency(card.creditLine),
        };
      case "annualFee":
        return {
          fieldName: "Annual Fee",
          value: formatCurrency(card.annualFee),
        };
      case "nextFeeDate":
        return {
          fieldName: "Next Fee Date",
          value:
            card.nextFeeDate === "N/A" ? "N/A" : formatDate(card.nextFeeDate),
        };
      case "bonusEarnedDate":
        return {
          fieldName: "Bonus Earned Date",
          value:
            card.bonusEarnDate === null
              ? "N/A"
              : formatDate(card.bonusEarnDate),
        };
      case "cardType":
        return {
          fieldName: "Card Type",
          value: card.cardType,
        };
      default:
        break;
    }
  };

  const cardDataType = setCardDataType(card, dataType);
  return (
    <p className="mb-0 text-muted">
      <small>
        <b style={{ color: "black" }}>{cardDataType.fieldName}</b>
        {": "}
        {cardDataType.value}
      </small>
    </p>
  );
}

CardText.propTypes = {
  card: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default CardText;
