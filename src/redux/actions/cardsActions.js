import { LOAD_CARDS_SUCCESS } from "./actionTypes";
import * as cardsApi from "../../api/cardsApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadCoursesSuccess(courses) {
  return { type: LOAD_CARDS_SUCCESS, courses };
}

export function loadCards() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return cardsApi
      .getCards()
      .then((cards) => {
        dispatch(loadCoursesSuccess(cards));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// export function saveCourse(course) {
//   return (dispatch) => {
//     dispatch(beginApiCall());
//     return cardsApi
//       .saveCourse(course)
//       .then((savedCourse) => {
//         course.id
//           ? dispatch(updateCourseSuccess(savedCourse))
//           : dispatch(createCourseSuccess(savedCourse));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

// export function deleteCourse(course) {
//   return (dispatch) => {
//     // This is optimistic delete because we are dispatching the action to delete course before actually calling deleteCourse on the API
//     dispatch(deleteCourseOptimistic(course));
//     return cardsApi.deleteCourse(course.id);
//   };
// }
