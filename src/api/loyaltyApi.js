import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/loyaltyData/";

export function getLoyaltyData() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
