import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const CardForm = ({ card, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{card.id ? "Edit" : "Add"} Card</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="issuer"
        label="Issuer"
        value={card.issuer}
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        name="card"
        label="Card"
        value={card.card}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        name="user"
        label="User"
        value={card.user || ""}
        defaultOption="Select User"
        options={[
          { value: 1, text: "Swaroop Uprety" },
          { value: 2, text: "Anshu Thapa" },
          { value: 3, text: "Astha Thapa" },
        ]}
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
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CardForm;