import { getStores } from "../../api/authorApi";
import { LOAD_STORES_SUCCESS } from "./actionTypes";
import { apiCallError } from "./apiStatusActions";

function loadStoresSuccess(stores) {
  return { type: LOAD_STORES_SUCCESS, stores };
}

export function loadStores() {
  return (dispatch) => {
    return getStores()
      .then((stores) => {
        dispatch(loadStoresSuccess(stores));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw "Problem loading book stores" + error;
      });
  };
}
