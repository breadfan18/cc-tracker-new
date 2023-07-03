import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/loyaltyData/";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://cc-tracker-new-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, "loyalty/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

export function getLoyaltyData() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function createLoyaltyData(loyaltyAcc) {
  const foo = set(ref(db, "loyaltyData/" + loyaltyAcc.id), {
    ...loyaltyAcc,
  });

  console.log(foo);
}
// export function createLoyaltyData(loyalty) {
//   return fetch(baseUrl + (loyalty.id || ""), {
//     method: loyalty.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(loyalty),
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }

export function deleteLoyaltyAcc(loyaltyAcc) {
  return fetch(baseUrl + loyaltyAcc.id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
