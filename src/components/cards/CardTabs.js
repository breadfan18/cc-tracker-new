import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import CardList from "./CardList";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { USERS } from "../../constants";
import { deleteCard } from "../../redux/actions/cardsActions";

function CardTabs({ cards, deleteCard }) {
  const [deletedCard, setDeletedCard] = useState({});

  function handleDeleteCard(card) {
    setDeletedCard({ ...card });
    deleteCard(card)
      .then(() => {
        toast.success("Card deleted");
      })
      .catch((error) => alert("Error deleteing card " + error));
  }

  const userTabs = USERS.map((user) => {
    const cardsForThisUser = cards.filter((card) => card.userId === user.id);
    return (
      <Tab eventKey={user.id} title={user.name.split(" ")[0]} key={user.id}>
        <CardList
          cards={cardsForThisUser}
          onDeleteClick={handleDeleteCard}
          deletedCard={deletedCard}
          showEditDelete={true}
        />
      </Tab>
    );
  });
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="All Cards">
        <CardList
          cards={cards}
          onDeleteClick={handleDeleteCard}
          deletedCard={deletedCard}
          showEditDelete={true}
        />
      </Tab>
      {userTabs}
    </Tabs>
  );
}

CardTabs.propTypes = {
  cards: PropTypes.array.isRequired,
  deletedCard: PropTypes.object,
  deleteCard: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {
  deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardTabs);
