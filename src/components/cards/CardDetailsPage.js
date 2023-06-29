import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCards, saveCard } from "../../redux/actions/cardsActions";
import PropTypes from "prop-types";
import CardForm from "./CardForm";
import { Spinner } from "../common/Spinner";
import { toast } from "react-toastify";
import { USERS } from "../../constants";

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

function CardDetailsPage({
  cards,
  loadCards,
  saveCard,
  history,
  loading,
  ...props
}) {
  const [card, setCard] = useState({ ...props.card });
  const [saving, setSaving] = useState(false);
  const [inquiries, setInquiries] = useState({ ...props.card.inquiries });
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cards.length === 0) {
      loadCards().catch((error) => alert("Loading Cards Failed" + error));
    } else {
      // Need to understand this logic..
      setCard({ ...props.card });
    }
  }, [props.card]);

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
      setCard((prevCard) => ({
        ...prevCard,
        [name]: name === "userId" ? parseInt(value, 10) : value,
      }));
    }
  }

  // function formIsValid() {
  //   const { issuer, card, user } = card;
  //   const errors = {};

  //   if (!issuer) errors.issuer = "Issuer is required";
  //   if (!card) errors.card = "Card is required";
  //   if (!user) errors.User = "User is required";

  //   setErrors(errors);
  //   // Form is valid if the errors objects has no properties
  //   return Object.keys(errors).length === 0;
  // }

  function handleSave(event) {
    event.preventDefault();

    for (let i in inquiries) {
      if (inquiries[i] === null) inquiries[i] = false;
    }
    const finalCard = { ...card, inquiries: inquiries };
    // if (!formIsValid()) return;
    setSaving(true);
    saveCard(finalCard)
      .then(() => {
        toast.success(card.id === null ? "Card Created" : "Card Updated");
        history.push("/cards");
      })
      .catch(() => {
        setSaving(false);
        // setErrors({
        //   onSave: error.message,
        // });
      });
  }

  return loading ? (
    <Spinner />
  ) : (
    <CardForm
      card={card}
      users={USERS}
      saving={saving}
      onSave={handleSave}
      onChange={handleChange}
      // errors={errors}
    />
  );
}

CardDetailsPage.propTypes = {
  card: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function getCardById(cards, id) {
  return cards.find((card) => card.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  const card =
    id && state.cards.length > 0 ? getCardById(state.cards, id) : newCard;
  return {
    card,
    cards: state.cards,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
  saveCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsPage);
