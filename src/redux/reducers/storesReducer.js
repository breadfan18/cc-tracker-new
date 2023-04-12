import { LOAD_STORES_SUCCESS } from "../actions/actionTypes";
import initialState from "./initialState";

export default function storesReducer(state = initialState.bookStores, action) {
  switch (action.type) {
    case LOAD_STORES_SUCCESS:
      return action.stores;
    default:
      return state;
  }
}
