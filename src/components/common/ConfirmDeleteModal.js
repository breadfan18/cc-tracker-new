import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCard } from "../../redux/actions/cardsActions";
import { toast } from "react-toastify";
import { DeleteButton } from "./DeleteButton";
import PropTypes from "prop-types";

function ConfirmDeleteModal({ card, deleteCard }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDeleteCard(card) {
    deleteCard(card)
      .then(() => {
        toast.success("Card deleted");
      })
      .catch((error) => alert("Error deleteing card " + error));
  }

  return (
    <>
      <DeleteButton onClick={handleShow} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete this card?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteCard(card)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmDeleteModal.propTypes = {
  card: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state: state,
  };
}

const mapDispatchToProps = {
  deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteModal);
