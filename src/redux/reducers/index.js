import { combineReducers } from "redux";
import cards from "./cardsReducer";
import loyaltyData from "./loyaltyReducer";
import apiCallsInProgress from "./apiStatusReducer";
import cardNotes from "./cardNotesReducer";

const rootReducer = combineReducers({
  cards,
  loyaltyData,
  apiCallsInProgress,
  cardNotes,
});

export default rootReducer;
