import {
  CREATE_CARD_NOTES_SUCCESS,
  DELETE_CARD_NOTES_SUCCESS,
  LOAD_CARD_NOTES_SUCCESS,
  UPDATE_CARD_NOTES_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function cardsReducer(state = initialState.cardNotes, action) {
  switch (action.type) {
    case LOAD_CARD_NOTES_SUCCESS:
      return action.cardNotes;
    case CREATE_CARD_NOTES_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.card }]
        because Firebase real time database adds new data immediately..
        so it's already available in state */
      return state;
    case UPDATE_CARD_NOTES_SUCCESS:
      return state.map((cardNote) =>
        cardNote.id === action.cardNote.id ? action.cardNote : cardNote
      );
    case DELETE_CARD_NOTES_SUCCESS:
      return state.filter((cardNote) => cardNote.id !== action.cardNote.id);
    default:
      return state;
  }
}
