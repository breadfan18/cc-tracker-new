import { combineReducers } from "redux";
import cards from "./cardsReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  cards,
  apiCallsInProgress,
});

export default rootReducer;
