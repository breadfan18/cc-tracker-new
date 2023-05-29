import {
  CREATE_CARDS_SUCCESS,
  DELETE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  UPDATE_CARDS_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function cardsReducer(state = initialState.cards, action) {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      return action.cards;
    case CREATE_CARDS_SUCCESS:
      return [...state, { ...action.card }];
    case UPDATE_CARDS_SUCCESS:
      return state.map((card) =>
        card.id === action.card.id ? action.card : card
      );
    case DELETE_CARD_SUCCESS:
      return state.filter((card) => card.id !== action.card.id);
    default:
      return state;
  }
}
