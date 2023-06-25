import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveCard } from "../../redux/actions/cardsActions";
import CardForm from "./CardForm";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";

const newCard = {
  id: null,
  issuer: "",
  card: "",
  userId: null,
  inquiries: {
    experian: null,
    equifax: null,
    transunion: null,
  },
  annualFee: 0,
  nextFeeDate: null,
};

function CardAddEditModal({ card, saveCard }) {
  const [cardForModal, setCardForModal] = useState(
    card ? { ...card } : newCard
  );
  const [inquiries, setInquiries] = useState({ ...cardForModal.inquiries });
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  function handleChange(event) {
    const { name, value, checked } = event.target;

    if (name === "inquiries") {
      value === "experian"
        ? setInquiries((prev) => ({ ...prev, [value]: checked }))
        : value === "equifax"
        ? setInquiries((prev) => ({ ...prev, [value]: checked }))
        : value === "transunion"
        ? setInquiries((prev) => ({ ...prev, [value]: checked }))
        : null;
    } else {
      setCardForModal((prevCard) => ({
        ...prevCard,
        [name]: name === "userId" ? parseInt(value, 10) : value,
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();

    for (let i in inquiries) {
      if (inquiries[i] === null) inquiries[i] = false;
    }
    const finalCard = { ...cardForModal, inquiries: inquiries };
    // if (!formIsValid()) return;
    setSaving(true);
    saveCard(finalCard)
      .then(() => {
        toast.success(
          cardForModal.id === null ? "Card Created" : "Card Updated"
        );
        history.push("/cards");
      })
      .catch(() => {
        setSaving(false);
        // setErrors({
        //   onSave: error.message,
        // });
      });

    toggleShow();
    setCardForModal(newCard);
  }
  return (
    <>
      {cardForModal.id !== null ? (
        <Button
          variant="success"
          onClick={toggleShow}
          className="rounded-circle"
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button variant="primary" onClick={toggleShow} className="addButton">
          Add Card
        </Button>
      )}

      <Modal
        show={show}
        onHide={toggleShow}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{cardForModal.id ? "Edit" : "Add"} Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardForm
            card={cardForModal}
            saving={saving}
            onSave={handleSave}
            onChange={handleChange}
            // toggle={toggle}
            // errors={errors}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

CardAddEditModal.propTypes = {
  card: PropTypes.object.isRequired,
  saveCard: PropTypes.func.isRequired,
};

function mapStateToProps() {}

const mapDispatchToProps = {
  saveCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardAddEditModal);
