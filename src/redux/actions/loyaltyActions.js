import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as loyaltyApi from "../../api/loyaltyApi";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
  UPDATE_LOYALTY_DATA_SUCCESS,
} from "./actionTypes";

function loadLoyaltyDataSuccess(loyaltyData) {
  return { type: LOAD_LOYALTY_DATA_SUCCESS, loyaltyData };
}
function createLoyaltyAccSuccess(loyalty) {
  return { type: CREATE_LOYALTY_DATA_SUCCESS, loyalty };
}
function updateLoyaltyAccountSuccess(loyalty) {
  return { type: UPDATE_LOYALTY_DATA_SUCCESS, loyalty };
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

export function saveLoyaltyData(loyalty) {
  return async (dispatch) => {
    dispatch(beginApiCall);
    const loyaltyData = await loyaltyApi.createLoyaltyData(loyalty);
    dispatch(createLoyaltyAccSuccess(loyaltyData));
  };
}

export function saveCard(loyalty) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return loyaltyApi
      .createLoyaltyData(loyalty)
      .then((savedAcc) => {
        loyalty.id
          ? dispatch(updateLoyaltyAccountSuccess(savedAcc))
          : dispatch(createLoyaltyAccSuccess(savedAcc));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
