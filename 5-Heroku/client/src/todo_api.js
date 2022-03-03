import axios from "axios";
const TODOS_ENDPOINT = "todos";

function createItemData(item) {
  return axios
    .post(`/${TODOS_ENDPOINT}`, item);
}

function editItemData(item) {
  const urlWithId = `/${TODOS_ENDPOINT}/${item.id}`;

  return axios
    .put(urlWithId, item);
}

function removeItemData(id) {
  const urlWithId = `/${TODOS_ENDPOINT}/${id}`;

  return axios
    .delete(urlWithId);
}

function getItems() {
  return axios
    .get(`/${TODOS_ENDPOINT}`)
    .then(response => response.data);
}

export { createItemData, editItemData, removeItemData, getItems };
