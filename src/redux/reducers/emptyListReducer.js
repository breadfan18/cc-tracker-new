import { LOAD_EMPTYLISTS_SUCCESS } from "../actions/actionTypes";
import initialState from "./initialState";

export default function emptyListReducer(
  state = initialState.emptyList,
  action
) {
  switch (action.type) {
    case LOAD_EMPTYLISTS_SUCCESS:
      return action.list;
    // case UPDATE_AUTHOR_SUCCESS:
    //   return "foo";
    default:
      return state;
  }
}
