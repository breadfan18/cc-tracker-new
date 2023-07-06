import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as loyaltyApi from "../../api/loyaltyApi";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  DELETE_LOYALTY_ACC_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
  UPDATE_LOYALTY_DATA_SUCCESS,
} from "./actionTypes";
import { getFireBaseData } from "../../../tools/firebase";

function loadLoyaltyDataSuccess(loyaltyData) {
  return { type: LOAD_LOYALTY_DATA_SUCCESS, loyaltyData };
}
function createLoyaltyAccSuccess(loyalty) {
  return { type: CREATE_LOYALTY_DATA_SUCCESS, loyalty };
}
function updateLoyaltyAccountSuccess(loyalty) {
  return { type: UPDATE_LOYALTY_DATA_SUCCESS, loyalty };
}
function deleteLoyaltyAccSuccess(loyalty) {
  return { type: DELETE_LOYALTY_ACC_SUCCESS, loyalty };
}

// export function loadloyaltyData() {
//   return (dispatch) => {
//     dispatch(beginApiCall());
//     loyaltyApi
//       .getLoyaltyData()
//       .then((loyaltyData) => {
//         dispatch(loadLoyaltyDataSuccess(loyaltyData));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

export function loadloyaltyData() {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("loyaltyData", dispatch, loadLoyaltyDataSuccess);
  };
}

export function saveLoyaltyData(loyalty) {
  return async (dispatch) => {
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

// export function saveLoyaltyData(loyaltyAcc) {
//   return async (dispatch) => {
//     dispatch(beginApiCall());
//     const uuid = slugify(loyaltyAcc.program.name + loyaltyAcc.userId);
//     set(ref(db, `loyaltyData/${loyaltyAcc.id}`), {
//       ...loyaltyAcc,
//       id: uuid,
//     });
//     loyaltyAcc.id
//       ? dispatch(updateLoyaltyAccountSuccess(loyaltyAcc))
//       : dispatch(createLoyaltyAccSuccess(loyaltyAcc));
//   };
// }

export function deleteLoyaltyData(loyaltyAcc) {
  return (dispatch) => {
    return loyaltyApi
      .deleteLoyaltyAcc(loyaltyAcc)
      .then(() => {
        dispatch(deleteLoyaltyAccSuccess(loyaltyAcc));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
