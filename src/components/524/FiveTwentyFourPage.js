import React, { useEffect } from "react";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import { loadCards } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import { FiveTwentyFourStatus } from "./FiveTwentyFourStatus";
import Card from "react-bootstrap/Card";
import { wasCardOpenedWithinLast24Months } from "../../helpers";
import CustomAccordion from "../common/CustomAccordion";

export const FiveTwentyFourPage = ({
  cards,
  loadCards,
  loading,
  cardsByUser,
}) => {
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
        <Card
          className="text-center"
          style={{ border: "2px solid rgba(0,0,0,1)" }}
        >
          <Card.Header
            style={{
              fontWeight: "bold",
              backgroundColor: "rgba(0,0,0, 0.3)",
            }}
          >
            {userName}
          </Card.Header>
          <Card.Body>
            {cards524.length === 0 ? (
              <Card.Text>
                This user has opened 0 cards in the last 24 months
              </Card.Text>
            ) : (
              <>
                <FiveTwentyFourStatus
                  percent={(cards524.length / 5) * 100}
                  label={`${cards524.length}/5`}
                  key={user.id}
                />
                <br />
                <CustomAccordion cardList={cards524} />
              </>
            )}
          </Card.Body>
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
  return {
    cards: state.cards,
    cardsByUser: USERS.reduce((obj, user) => {
      obj[user.id] = state.cards.filter((card) => card.userId === user.id);
      return obj;
    }, {}),
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiveTwentyFourPage);
