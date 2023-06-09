import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as loyaltyApi from "../../api/loyaltyApi";
import { LOAD_LOYALTY_DATA_SUCCESS } from "./actionTypes";

function loadLoyaltyDataSuccess(loyaltyData) {
  return { type: LOAD_LOYALTY_DATA_SUCCESS, loyaltyData };
}

export function loadloyaltyData() {
  return (dispatch) => {
    dispatch(beginApiCall());
    loyaltyApi
      .getLoyaltyData()
      .then((loyaltyData) => {
        dispatch(loadLoyaltyDataSuccess(loyaltyData));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
