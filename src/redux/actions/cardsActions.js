import {
  CREATE_CARDS_SUCCESS,
  DELETE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  UPDATE_CARDS_SUCCESS,
} from "./actionTypes";
import * as cardsApi from "../../api/cardsApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import { getFireBaseData, writeToFirebase } from "../../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";

function loadCardsSuccess(cards) {
  return { type: LOAD_CARDS_SUCCESS, cards };
}

function createCardSuccess(card) {
  return { type: CREATE_CARDS_SUCCESS, card };
}

function updateCardSuccess(card) {
  return { type: UPDATE_CARDS_SUCCESS, card };
}

function deleteCardSuccess(card) {
  return { type: DELETE_CARD_SUCCESS, card };
}

export function loadCardsFromFirebase() {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("cards", dispatch, loadCardsSuccess);
  };
}

export function saveCardToFirebase(card) {
  return (dispatch) => {
    dispatch(beginApiCall());
    const uuid =
      card.id === null
        ? slugify(
            card.issuer.name + " " + card.card + " " + card.userId + " " + uid()
          )
        : card.id;

    writeToFirebase("cards", card, uuid);
    dispatch(createCardSuccess(card));
  };
}

export function deleteCard(card) {
  return (dispatch) => {
    return cardsApi
      .deleteCard(card)
      .then(() => {
        dispatch(deleteCardSuccess(card));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// JSON Server Functions for testing
export function loadCardsFromJsonServer() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return cardsApi
      .getCards()
      .then((cards) => {
        dispatch(loadCardsSuccess(cards));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCardToJsonServer(card) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return cardsApi
      .saveCard(card)
      .then((savedCard) => {
        card.id
          ? dispatch(updateCardSuccess(savedCard))
          : dispatch(createCardSuccess(savedCard));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
