import { LOAD_CARDS_SUCCESS } from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.cards, action) {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      return action.cards;
    default:
      return state;
  }
}
