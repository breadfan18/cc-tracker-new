import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/loyaltyData/";

export function getLoyaltyData() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function createLoyaltyData(loyalty) {
  return fetch(baseUrl + (loyalty.id || ""), {
    method: loyalty.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(loyalty),
  })
    .then(handleResponse)
    .catch(handleError);
}
