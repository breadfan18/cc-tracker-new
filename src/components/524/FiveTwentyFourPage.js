import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import { loadCards } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import PropTypes from "prop-types";
import { FiveTwentyFourStatus } from "./FiveTwentyFourStatus";
import Card from "react-bootstrap/Card";
import { wasCardOpenedWithinLast24Months } from "../../helpers";
import CustomAccordion from "../common/CustomAccordion";
import SelectInput from "../common/SelectInput";
import CardList from "../cards/CardList";

export const FiveTwentyFourPage = ({
  cards,
  loadCards,
  loading,
  cardsByUser,
}) => {
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    if (cards.length === 0) {
      loadCards();
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setSelectedUser(name === "id" ? parseInt(value, 10) : value);
  }

  const usersToDisplay = isNaN(selectedUser)
    ? USERS.map((user) => user.id)
    : [selectedUser];

  const users524Status = usersToDisplay.map((user) => {
    const userName = USERS.find((u) => u.id === parseInt(user)).name;
    const cards524 = cardsByUser[user]
      .filter((card) => wasCardOpenedWithinLast24Months(card.appDate))
      .map((card) => {
        return { ...card, userName };
      });

    const cardsListComponent = (
      <CardList cards={cards524} showEditDelete={false} />
    );

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
                <CustomAccordion
                  accordionBody={cardsListComponent}
                  dataType="Cards"
                />
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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SelectInput
            name="id"
            label="Select User to View"
            value={selectedUser}
            defaultOption="All Users"
            options={USERS.map((user) => ({
              value: user.id,
              text: user.name,
            }))}
            onChange={handleChange}
            bkgrdColor="rgba(0,0,0,0.3)"
            // error={errors.author}
          />
          <hr />
          {users524Status}
        </>
      )}
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
