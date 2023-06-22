import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { CARD_TYPE, ISSUERS, USERS } from "../../constants";
import DateInput from "../common/DateInput";
import RadioInput from "../common/RadioInput";

const CardForm = ({ card, onSave, onChange, saving, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>{card.id ? "Edit" : "Add"} Card</h2>
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary addButton"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </section>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <DateInput
        name="appDate"
        label="Application Date"
        onChange={onChange}
        value={card.appDate}
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
      <TextInput
        name="card"
        label="Card"
        value={card.card}
        onChange={onChange}
        error={errors.title}
      />
      <SelectInput
        name="cardType"
        label="Card Type"
        value={card.cardType}
        defaultOption="Select Card Type"
        options={CARD_TYPE.map((type) => ({
          value: type,
          text: type,
        }))}
        onChange={onChange}
        error={errors.author}
      />
      <TextInput
        name="annualFee"
        label="Annual Fee"
        value={card.annualFee}
        onChange={onChange}
        error={errors.title}
      />
      <DateInput
        name="nextFeeDate"
        label="Next Annual Fee Due"
        onChange={onChange}
        value={card.nextFeeDate}
      />
      <RadioInput
        name="inquiries"
        label="Inquiries"
        inquiriesStatus={card.inquiries}
        onChange={onChange}
      />
    </form>
  );
};

CardForm.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CardForm;
