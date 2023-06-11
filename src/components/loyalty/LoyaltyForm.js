import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { ACCOUNT_TYPE, USERS } from "../../constants";

const LoyaltyForm = ({
  card,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{card.id ? "Edit" : "Add"} Loyalty Account</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
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
        // error={errors.author}
      />
      <SelectInput
        name="loyalty type"
        label="Account Type"
        value={""}
        defaultOption="Select Account Type"
        options={ACCOUNT_TYPE.map((type) => ({
          value: type,
          text: type,
        }))}
        onChange={onChange}
        // error={errors.author}
      />
      <TextInput
        name="memberId"
        label="Member ID"
        value={""}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name="loginId"
        label="User Name"
        value={""}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name="password"
        label="Password"
        value={""}
        onChange={onChange}
        // error={errors.title}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

LoyaltyForm.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default LoyaltyForm;
