import {
  CREATE_CARDS_SUCCESS,
  LOAD_CARDS_SUCCESS,
  UPDATE_CARDS_SUCCESS,
} from "./actionTypes";
import * as cardsApi from "../../api/cardsApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadCardsSuccess(cards) {
  return { type: LOAD_CARDS_SUCCESS, cards };
}

function createCardSuccess(card) {
  return { type: CREATE_CARDS_SUCCESS, card };
}

function updateCardSuccess(card) {
  return { type: UPDATE_CARDS_SUCCESS, card };
}

export function loadCards() {
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

export function saveCard(card) {
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

// export function deleteCourse(course) {
//   return (dispatch) => {
//     // This is optimistic delete because we are dispatching the action to delete course before actually calling deleteCourse on the API
//     dispatch(deleteCourseOptimistic(course));
//     return cardsApi.deleteCourse(course.id);
//   };
// }
