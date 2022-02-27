import axios from "axios";
const TODOS_ENDPOINT = "todos";

function createItemData(item) {
  return axios
    .post(`/${TODOS_ENDPOINT}`, item)
    .catch(error => error);
}

function editItemData(item) {
  const urlWithId = `/${TODOS_ENDPOINT}/${item.id}`;

  return axios
    .put(urlWithId, item)
    .catch(error => error);
}

function removeItemData(id) {
  const urlWithId = `/${TODOS_ENDPOINT}/${id}`;

  return axios
    .delete(urlWithId)
    .catch(error => error);
}

function getItems() {
  return axios
    .get(`/${TODOS_ENDPOINT}`)
    .then(response => response.data)
    .catch(error => error);
}

export { createItemData, editItemData, removeItemData, getItems };
