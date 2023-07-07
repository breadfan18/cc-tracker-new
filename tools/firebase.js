import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://cc-tracker-new-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

export function getFireBaseData(endpoint, dispatch, dispatchFunc) {
  onValue(ref(db, `${endpoint}/`), (snap) => {
    const allData = [];
    snap.forEach((data) => {
      const childData = data.val();
      allData.push(childData);
    });
    dispatch(dispatchFunc(allData));
  });
}

export function writeToFirebase(endpoint, data, id) {
  set(ref(db, `${endpoint}/${id}`), {
    ...data,
    id,
  });
}

export function deleteFromFirebase(endpoint, id) {
  remove(ref(db, `${endpoint}/${id}`));
}
