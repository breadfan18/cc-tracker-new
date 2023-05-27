import { LOAD_USERS_SUCCESS } from "./actionTypes";
import * as usersApi from "../../api/usersApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadUsersSuccess(users) {
  return { type: LOAD_USERS_SUCCESS, users };
}

export function loadUsers() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return usersApi
      .getUsers()
      .then((users) => {
        dispatch(loadUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
