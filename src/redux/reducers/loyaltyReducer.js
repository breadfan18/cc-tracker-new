import initialState from "./initialState";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
} from "../actions/actionTypes";

export default function loyaltyReducer(
  state = initialState.loyaltyData,
  action
) {
  switch (action.type) {
    case LOAD_LOYALTY_DATA_SUCCESS:
      return action.loyaltyData;
    case CREATE_LOYALTY_DATA_SUCCESS:
      return [...state, { ...action.loyalty }];
    default:
      return state;
  }
}
