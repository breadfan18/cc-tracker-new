import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import CardListTable from "./CardListTable";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import CardListCards from "./CardListCards";

function CardTabs({ cards, windowWidth, onDelete, deletedCard }) {
  const userTabs = USERS.map((user) => {
    const cardsForThisUser = cards.filter((card) => card.userId === user.id);
    return (
      <Tab eventKey={user.id} title={user.name.split(" ")[0]} key={user.id}>
        {windowWidth > 1000 ? (
          <CardListTable
            cards={cardsForThisUser}
            onDeleteClick={onDelete}
            deletedCard={deletedCard}
            showEditDelete={true}
            showUser={false}
          />
        ) : (
          <CardListCards
            cards={cardsForThisUser}
            onDeleteClick={onDelete}
            isCardDeleted={deletedCard}
            windowWidth={windowWidth}
            showUserName={false}
          />
        )}
      </Tab>
    );
  });
  return (
    <>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="All Cards">
          {windowWidth > 1000 ? (
            <CardListTable
              cards={cards}
              onDeleteClick={onDelete}
              deletedCard={deletedCard}
              showEditDelete={true}
              showUser={true}
            />
          ) : (
            <CardListCards
              cards={cards}
              onDeleteClick={onDelete}
              isCardDeleted={deletedCard}
              windowWidth={windowWidth}
              showUserName={true}
            />
          )}
        </Tab>
        {userTabs}
      </Tabs>
    </>
  );
}

CardTabs.propTypes = {
  cards: PropTypes.array.isRequired,
  deletedCard: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardTabs);
