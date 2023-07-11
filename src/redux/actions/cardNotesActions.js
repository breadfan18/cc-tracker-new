import {
  CREATE_CARD_NOTES_SUCCESS,
  DELETE_CARD_NOTES_SUCCESS,
  LOAD_CARD_NOTES_SUCCESS,
  UPDATE_CARD_NOTES_SUCCESS,
} from "./actionTypes";
import { beginApiCall } from "./apiStatusActions";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../../tools/firebase";
import { uid } from "uid";

function loadCardNotesSuccess(cardNotes) {
  return { type: LOAD_CARD_NOTES_SUCCESS, cardNotes };
}

function createCardNotesSuccess(cardNote) {
  return { type: CREATE_CARD_NOTES_SUCCESS, cardNote };
}

function updateCardNotesSuccess(cardNote) {
  return { type: UPDATE_CARD_NOTES_SUCCESS, cardNote };
}

function deleteCardNotesSuccess(cardNote) {
  return { type: DELETE_CARD_NOTES_SUCCESS, cardNote };
}

export function loadCardNotesFromFirebase() {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("cardNotes", dispatch, loadCardNotesSuccess);
  };
}

export function saveCardNoteToFirebase(note) {
  return (dispatch) => {
    dispatch(beginApiCall());
    const uuid = note.id === null || note.id === undefined ? uid() : note.id;
    writeToFirebase("cardNotes", note, uuid);
    dispatch(createCardNotesSuccess(note));
  };
}

export function deleteCardNoteFromFirebase(note) {
  return (dispatch) => {
    deleteFromFirebase("cardNotes", note.id);
    dispatch(deleteCardNotesSuccess(note));
  };
}
