import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorsReducer";
import stores from "./storesReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  stores,
  apiCallsInProgress,
});

export default rootReducer;
