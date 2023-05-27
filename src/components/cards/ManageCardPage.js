import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCards } from "../../redux/actions/cardsActions";
import PropTypes from "prop-types";
import CardForm from "./CardForm";
import { Spinner } from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({ cards, loadCards, history, loading, ...props }) {
  const [card, setCard] = useState({ ...props.card });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cards.length === 0) {
      loadCards().catch((error) => alert("Loading Cards Failed" + error));
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { issuer, card, user } = card;
    const errors = {};

    if (!issuer) errors.issuer = "Issuer is required";
    if (!card) errors.card = "Card is required";
    if (!user) errors.User = "User is required";

    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    // event.preventDefault();
    // if (!formIsValid()) return;
    // setSaving(true);
    // saveCourse(course)
    //   .then(() => {
    //     toast.success("Course Saved!");
    //     history.push("/courses");
    //   })
    //   .catch((error) => {
    //     setSaving(false);
    //     setErrors({
    //       onSave: error.message,
    //     });
    //   });
  }

  return loading ? (
    <Spinner />
  ) : (
    <CardForm
      card={card}
      errors={errors}
      saving={saving}
      onSave={handleSave}
      onChange={handleChange}
    />
  );
}

ManageCoursePage.propTypes = {
  card: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function getCardById(cards, id) {
  return cards.find((card) => card.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  const card =
    id && state.cards.length > 0
      ? getCardById(state.cards, id)
      : { id: 1, issuer: "", card: "", uesr: "" };
  return {
    card,
    cards: state.cards,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
