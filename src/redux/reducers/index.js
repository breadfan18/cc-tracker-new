import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorsReducer";
import authorCategories from "./authorCategoriesReducer";
import apiCallsInProgress from "./apiStatusReducer";
import emptyLists from "./emptyListReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  authorCategories,
  apiCallsInProgress,
  emptyLists,
});

export default rootReducer;
