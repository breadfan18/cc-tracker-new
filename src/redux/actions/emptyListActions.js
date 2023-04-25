import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as courseApi from "../../api/courseApi";
import { LOAD_EMPTYLISTS_SUCCESS } from "./actionTypes";

function loadListsSuccess(list) {
  return { type: LOAD_EMPTYLISTS_SUCCESS, list };
}

export function loadEmptyLists() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return courseApi
      .getEmptyListStatus()
      .then((lists) => {
        dispatch(loadListsSuccess(lists));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// export function saveAuthor(author) {
//   return (dispatch) => {
//     dispatch(beginApiCall());
//     return authorApi
//       .saveAuthor(author)
//       .then((savedAuthor) => {
//         author.id
//           ? dispatch(updateAuthorSuccess(savedAuthor))
//           : dispatch(createAuthorSuccess(savedAuthor));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }
