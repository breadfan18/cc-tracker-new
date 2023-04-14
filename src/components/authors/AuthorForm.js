import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AuthorForm = ({
  author,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{author.id ? "Edit" : "Add"} Course</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={author.name}
        onChange={onChange}
        error={errors.name}
      />

      {/* <TextInput
        name="lastName"
        label="Last Name"
        value={author.name.split(" ")[1]}
        onChange={onChange}
        error={errors.category}
      /> */}

      <TextInput
        name="age"
        label="Age"
        value={author.age}
        onChange={onChange}
        error={errors.age}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  // errors: PropTypes.object,
  // onSave: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AuthorForm;
