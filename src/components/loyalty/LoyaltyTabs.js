import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import LoyaltyList from "./LoyaltyList";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { USERS } from "../../constants";
import { deleteCard } from "../../redux/actions/cardsActions";

function LoyaltyTabs({ loyaltyData }) {
  // const [deletedCard, setDeletedCard] = useState({});

  // function handleDeleteCard(card) {
  //   setDeletedCard({ ...card });
  //   deleteCard(card)
  //     .then(() => {
  //       toast.success("Card deleted");
  //     })
  //     .catch((error) => alert("Error deleteing card " + error));
  // }

  const userTabs = USERS.map((user) => {
    const loyaltyDataForThisUser = loyaltyData.filter(
      (l) => l.userId === user.id
    );
    return (
      <Tab eventKey={user.id} title={user.name.split(" ")[0]} key={user.id}>
        <LoyaltyList
          loyaltyData={loyaltyDataForThisUser}
          // onDeleteClick={handleDeleteCard}
          // deletedCard={deletedCard}
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
      <Tab eventKey="home" title="All Users">
        <LoyaltyList
          loyaltyData={loyaltyData}
          // onDeleteClick={handleDeleteCard}
          // deletedCard={deletedCard}
          showEditDelete={true}
        />
      </Tab>
      {userTabs}
    </Tabs>
  );
}

LoyaltyTabs.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
  deletedCard: PropTypes.object,
  deleteCard: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyTabs);
