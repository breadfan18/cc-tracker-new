import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCard } from "../../redux/actions/cardsActions";
import { deleteLoyaltyData } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import { DeleteButton } from "./DeleteButton";
import PropTypes from "prop-types";

function ConfirmDeleteModal({ data, dataType, deleteCard, deleteLoyaltyData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDelete(data) {
    if (dataType === "card") {
      deleteCard(data)
        .then(() => {
          toast.success("Card deleted");
        })
        .catch((error) => alert("Error deleteing card " + error));
    } else if (dataType === "loyaltyAcc") {
      deleteLoyaltyData(data).then(() => {
        toast.success("Loyalty Account Deleted");
      });
    }
  }

  return (
    <>
      <DeleteButton onClick={handleShow} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete this{" "}
          {dataType === "card" ? "card" : "loyalty account"}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
  deleteCard: PropTypes.func.isRequired,
  deleteLoyaltyData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state: state,
  };
}

const mapDispatchToProps = {
  deleteCard,
  deleteLoyaltyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteModal);
