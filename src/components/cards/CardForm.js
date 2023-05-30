import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { ISSUERS, USERS } from "../../constants";

const CardForm = ({
  card,
  onSave,
  onChange,
  users,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{card.id ? "Edit" : "Add"} Card</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      {/* 
        CONFIRM THIS APPROACH OF ISSUER DROPDOWN..
        Maybe implement the same for users (using constants) instead of a network call
      */}

      <SelectInput
        name="issuer"
        label="Issuer"
        value={card.issuer}
        defaultOption="Select Issuer"
        options={ISSUERS.map((issuer) => ({
          value: issuer,
          text: issuer,
        }))}
        onChange={onChange}
        error={errors.author}
      />
      {/* <TextInput
        name="issuer"
        label="Issuer"
        value={card.issuer}
        onChange={onChange}
        error={errors.title}
      /> */}

      <TextInput
        name="card"
        label="Card"
        value={card.card}
        onChange={onChange}
        error={errors.title}
      />
      <SelectInput
        name="userId"
        label="User"
        value={card.userId || ""}
        defaultOption="Select User"
        options={USERS.map((user) => ({
          value: user.id,
          text: user.name,
        }))}
        onChange={onChange}
        error={errors.author}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

CardForm.propTypes = {
  card: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CardForm;
