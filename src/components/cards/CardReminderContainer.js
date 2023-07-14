import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Spinner } from "../common/Spinner";
import { CardReminder } from "./CardReminder";
import { isAnnualFeeDateApproaching } from "../../helpers";

export function CardReminderContainer({ card, loading }) {
  const isAnnyualFeeClose = isAnnualFeeDateApproaching(card.nextFeeDate);
  return loading ? (
    <Spinner />
  ) : (
    <Card className="text-center" style={{ boxShadow: `2px 0 10px gray` }}>
      <Card.Header id="notesCardHeader">Card Reminders</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        {isAnnyualFeeClose && <CardReminder card={card} />}
        <CardReminder card={card} />
      </Card.Body>
      <Card.Footer
        className="text-muted notesFooter"
        style={{ padding: "10px" }}
      ></Card.Footer>
    </Card>
  );
}

CardReminderContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  card: PropTypes.object.isRequired,
};
