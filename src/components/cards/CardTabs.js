import React, { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import CardListTable from "./CardListTable";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import CardListCards from "./CardListCards";
import { WindowWidthContext } from "../App";

function CardTabs({ cards }) {
  const windowWidth = useContext(WindowWidthContext);
  const userTabs = USERS.map((user) => {
    const cardsForThisUser = cards.filter((card) => card.userId === user.id);
    return (
      <Tab eventKey={user.id} title={user.name.split(" ")[0]} key={user.id}>
        {windowWidth > 1000 ? (
          <CardListTable
            cards={cardsForThisUser}
            showEditDelete={true}
            showUser={false}
          />
        ) : (
          <CardListCards cards={cardsForThisUser} showUserName={false} />
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
              showEditDelete={true}
              showUser={true}
            />
          ) : (
            <CardListCards
              cards={cards}
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
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardTabs);
