import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorsReducer";
import stores from "./storesReducer";
import authorCategories from "./authorCategoriesReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  stores,
  authorCategories,
  apiCallsInProgress,
});

export default rootReducer;
