import {
  CREATE_AUTHOR_SUCCESS,
  LOAD_AUTHORS_SUCCESS,
  LOAD_AUTHOR_CATEGORIES_SUCCESS,
  UPDATE_AUTHOR_SUCCESS,
} from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { apiCallError, beginApiCall } from "../actions/apiStatusActions";

function loadAuthorsSuccess(authors) {
  return { type: LOAD_AUTHORS_SUCCESS, authors };
}
function loadAuthorCategoriesSuccess(categories) {
  return { type: LOAD_AUTHOR_CATEGORIES_SUCCESS, categories };
}

function updateAuthorSuccess(author) {
  return { type: UPDATE_AUTHOR_SUCCESS, author };
}

function createAuthorSuccess(author) {
  return { type: CREATE_AUTHOR_SUCCESS, author };
}

export function loadAuthors() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadCategories() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return authorApi
      .getAuthorCategories()
      .then((categories) => {
        dispatch(loadAuthorCategoriesSuccess(categories));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveAuthor(author) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then((savedAuthor) => {
        author.id
          ? dispatch(updateAuthorSuccess(savedAuthor))
          : dispatch(createAuthorSuccess(savedAuthor));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
