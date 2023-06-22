import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { ACCOUNT_TYPE, PROGRAM, USERS } from "../../constants";
import { titleCase } from "../../helpers";

const LoyaltyForm = ({
  loyaltyAcc,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>
          {loyaltyAcc.id ? "Edit" : "Add"} Account
        </h2>
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
      <SelectInput
        name="userId"
        label="User"
        value={loyaltyAcc.userId || ""}
        defaultOption="Select User"
        options={USERS.map((user) => ({
          value: user.id,
          text: user.name,
        }))}
        onChange={onChange}
        // error={errors.author}
      />
      <SelectInput
        name="loyaltyType"
        label="Account Type"
        value={loyaltyAcc.loyaltyType || ""}
        defaultOption="Select Account Type"
        options={ACCOUNT_TYPE.map((type) => ({
          value: type,
          text: titleCase(type),
        }))}
        onChange={onChange}
        // error={errors.author}
      />
      <SelectInput
        name="program"
        label="Loyalty Program"
        value={loyaltyAcc.program || ""}
        defaultOption="Select Program"
        options={PROGRAM.map((program) => ({
          value: program.id,
          text: program.name,
        }))}
        onChange={onChange}
        // error={errors.author}
      />
      <TextInput
        name="memberId"
        label="Member ID"
        value={loyaltyAcc.memberId}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name="loginId"
        label="User Name"
        value={loyaltyAcc.loginId}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name="password"
        label="Password"
        value={loyaltyAcc.password}
        onChange={onChange}
        // error={errors.title}
      />
    </form>
  );
};

LoyaltyForm.propTypes = {
  loyaltyAcc: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default LoyaltyForm;
