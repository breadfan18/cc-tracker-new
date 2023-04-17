import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getAuthorCategories() {
  return fetch("http://localhost:3001/authors/categories")
    .then(handleResponse)
    .catch(handleError);
}

export function getStores() {
  return fetch(process.env.API_URL + "/stores/")
    .then(handleResponse)
    .catch(handleError);
}

export function saveAuthor(author) {
  return fetch(baseUrl + (author.id || ""), {
    method: author.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(author) {
  return fetch(baseUrl + author.id, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
