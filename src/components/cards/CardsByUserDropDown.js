import React, { useState } from "react";
import SelectInput from "../common/SelectInput";
import CardListCards from "./CardListCards";
import { USERS } from "../../constants";
import PropTypes from "prop-types";

export default function CardsByUserDropDown({ cards, windowWidth }) {
  const [selectedUser, setSelectedUser] = useState();
  const showAllUsers = isNaN(selectedUser) || selectedUser === undefined;

  function handleChange(event) {
    const { name, value } = event.target;
    setSelectedUser(name === "id" ? parseInt(value, 10) : value);
  }

  const cardsForSelectedUser = showAllUsers
    ? cards
    : cards.filter((card) => card.userId === selectedUser);

  return (
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
        bkgrdColor="rgba(217,215,215)"
        // error={errors.author}
      />
      <hr />
      <CardListCards
        key={1}
        cards={cardsForSelectedUser}
        onDeleteClick={() => {}}
        isCardDeleted={false}
        windowWidth={windowWidth}
        showUserName={showAllUsers}
      />
    </>
  );
}

CardsByUserDropDown.propTypes = {
  cards: PropTypes.array.isRequired,
  windowWidth: PropTypes.number.isRequired,
};
