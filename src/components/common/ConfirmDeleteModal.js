import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCardFromFirebase } from "../../redux/actions/cardsActions";
import { deleteLoyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import { DeleteButton } from "./DeleteButton";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ConfirmDeleteModal({
  data,
  dataType,
  deleteCardFromFirebase,
  deleteLoyaltyDataFromFirebase,
  modalOpen,
  setModalOpen,
  redirect,
}) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const history = useHistory();

  function handleDelete(data) {
    if (dataType === "card") {
      deleteCardFromFirebase(data);
      toast.success("Card deleted");
      if (redirect) history.push("/cards");
    } else if (dataType === "loyaltyAcc") {
      deleteLoyaltyDataFromFirebase(data);
      toast.success("Loyalty Account Deleted");
    }

    toggleModal();
  }

  function handleDeleteButtonClick(e) {
    e.stopPropagation();
    toggleShow();
    setModalOpen(true);
  }

  function toggleModal() {
    toggleShow();
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <DeleteButton onClick={handleDeleteButtonClick} />
      <Modal show={show} onHide={toggleModal} centered>
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
  setModalOpen: PropTypes.func,
  modalOpen: PropTypes.bool,
  redirect: PropTypes.bool,
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
