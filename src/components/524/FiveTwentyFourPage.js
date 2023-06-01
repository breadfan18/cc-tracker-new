import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import { loadCards } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import { FiveTwentyFourStatus } from "./FiveTwentyFourStatus";
import CardList from "../cards/CardList";
import { Accordion } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { wasCardOpenedWithinLast24Months } from "../../helpers";

export const FiveTwentyFourPage = ({
  cards,
  loadCards,
  loading,
  cardsByUser,
}) => {
  const [cardsShowing, setCardShowing] = useState(false);

  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
  }, []);

  const userCards = Object.keys(cardsByUser).map((user) => {
    const userName = USERS.find((u) => u.id === parseInt(user)).name;
    const cards524 = cardsByUser[user]
      .filter((card) => wasCardOpenedWithinLast24Months(card.appDate))
      .map((card) => {
        return { ...card, userName };
      });

    return (
      <>
        <Card className="text-center">
          <Card.Header style={{ fontWeight: "bold" }}>{userName}</Card.Header>
          <Card.Body>
            {/* <Card.Title>5/24 Status</Card.Title> */}
            <FiveTwentyFourStatus
              percent={(cards524.length / 5) * 100}
              label={`${cards524.length}/5`}
              key={user.id}
            />
            <br />
            <Accordion onClick={() => setCardShowing(!cardsShowing)}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {cardsShowing ? "Hide Cards" : "Show Cards"}
                </Accordion.Header>
                <Accordion.Body>
                  <CardList
                    cards={cards524}
                    onDeleteClick={() => {}}
                    deleteCard={{}}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text> */}
          </Card.Body>
          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
        <br />
      </>
    );
  });

  return (
    <>
      <h2>5/24 Status</h2>
      {loading ? <Spinner /> : <>{userCards}</>}
    </>
  );
};

FiveTwentyFourPage.propTypes = {
  cards: PropTypes.array.isRequired,
  cardsByUser: PropTypes.object.isRequired,
  loadCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const cards = state.cards.map((card) => {
    return {
      ...card,
      userName: USERS.find((user) => user.id === card.userId).name,
    };
  });
  return {
    cards,
    cardsByUser: state.cards.reduce((obj, card) => {
      obj[card.userId]
        ? obj[card.userId].push(card)
        : (obj[card.userId] = [card]);
      return obj;
    }, {}),
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiveTwentyFourPage);

/* 
What i want to do?
- User's Name
- 5/24 status progress bar
- Collapsible 'View Cards' bar that shows the cards that are in 5/24 range
*/
