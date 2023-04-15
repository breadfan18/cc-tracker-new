import {
  CREATE_AUTHOR_SUCCESS,
  LOAD_AUTHORS_SUCCESS,
  UPDATE_AUTHOR_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorsReducer(state = initialState.authors, action) {
  switch (action.type) {
    case LOAD_AUTHORS_SUCCESS:
      return action.authors;
    case UPDATE_AUTHOR_SUCCESS:
      return state.map((author) =>
        author.id === action.author.id ? action.author : author
      );
    case CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];
    default:
      return state;
  }
}
