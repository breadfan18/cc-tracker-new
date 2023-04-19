import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorsReducer";
import authorCategories from "./authorCategoriesReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  authorCategories,
  apiCallsInProgress,
});

export default rootReducer;
