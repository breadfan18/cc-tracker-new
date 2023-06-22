import React, { useState } from "react";
import SelectInput from "../common/SelectInput";
import CardListCards from "./CardListCards";
import { USERS } from "../../constants";
import PropTypes from "prop-types";

export default function CardsByUserDropDown({
  cards,
  windowWidth,
  onDelete,
  deletedCard,
}) {
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
        label="Select User"
        value={selectedUser}
        defaultOption="All Users"
        options={USERS.map((user) => ({
          value: user.id,
          text: user.name,
        }))}
        onChange={handleChange}
        // error={errors.author}
      />
      <hr />
      <label style={{ margin: "7px" }}>
        {showAllUsers
          ? "All Cards"
          : `${
              USERS.find((user) => user.id === selectedUser).name.split(" ")[0]
            }'s cards`}
      </label>
      <CardListCards
        cards={cardsForSelectedUser}
        onDeleteClick={onDelete}
        isCardDeleted={deletedCard}
        windowWidth={windowWidth}
        showUserName={showAllUsers}
      />
    </>
  );
}

CardsByUserDropDown.propTypes = {
  cards: PropTypes.array.isRequired,
  windowWidth: PropTypes.number.isRequired,
  deletedCard: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
