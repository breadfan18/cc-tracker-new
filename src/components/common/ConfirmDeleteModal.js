import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCardFromFirebase } from "../../redux/actions/cardsActions";
import { deleteLoyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import { DeleteButton } from "./DeleteButton";
import PropTypes from "prop-types";

function ConfirmDeleteModal({
  data,
  dataType,
  deleteCardFromFirebase,
  deleteLoyaltyDataFromFirebase,
}) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  function handleDelete(data) {
    if (dataType === "card") {
      deleteCardFromFirebase(data);
      toast.success("Card deleted");
    } else if (dataType === "loyaltyAcc") {
      deleteLoyaltyDataFromFirebase(data);
      toast.success("Loyalty Account Deleted");
    }
  }

  return (
    <>
      <DeleteButton onClick={toggleShow} />
      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete this{" "}
          {dataType === "card" ? "card" : "loyalty account"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(data)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmDeleteModal.propTypes = {
  data: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
  deleteCardFromFirebase: PropTypes.func.isRequired,
  deleteLoyaltyDataFromFirebase: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state: state,
  };
}

const mapDispatchToProps = {
  deleteCardFromFirebase,
  deleteLoyaltyDataFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteModal);
