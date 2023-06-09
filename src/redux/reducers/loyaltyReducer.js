import initialState from "./initialState";
import { LOAD_LOYALTY_DATA_SUCCESS } from "../actions/actionTypes";

export default function loyaltyReducer(
  state = initialState.loyaltyData,
  action
) {
  switch (action.type) {
    case LOAD_LOYALTY_DATA_SUCCESS:
      return action.loyaltyData;
    default:
      return state;
  }
}
