import { LOAD_AUTHOR_CATEGORIES_SUCCESS } from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorCategoriesReducer(
  state = initialState.authorCategories,
  action
) {
  switch (action.type) {
    case LOAD_AUTHOR_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
}
