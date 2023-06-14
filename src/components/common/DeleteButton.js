import React from "react";
import { Button } from "react-bootstrap";
import { BsTrash3 } from "react-icons/bs";
import PropTypes from "prop-types";

export function DeleteButton({ data, onDelete, disabled }) {
  return (
    <Button
      variant="danger"
      onClick={() => onDelete(data)}
      disabled={disabled}
      className="rounded-circle"
    >
      <BsTrash3 />
    </Button>
  );
}

DeleteButton.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
};
