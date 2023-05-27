import { combineReducers } from "redux";
import cards from "./cardsReducer";
import users from "./usersReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  cards,
  users,
  apiCallsInProgress,
});

export default rootReducer;
