import axios from "axios";
import { BaseTodoItem as ServerTodoItem } from "../../common/types";
const TODOS_ENDPOINT = "todos";

function createItemData(item : ServerTodoItem) : Promise<void> {
  return axios
    .post(`/${TODOS_ENDPOINT}`, item);
}

function editItemData(item : ServerTodoItem) : Promise<void> {
  const urlWithId = `/${TODOS_ENDPOINT}/${item.id}`;

  return axios
    .put(urlWithId, item);
}

function removeItemData(id : string) : Promise<void> {
  const urlWithId = `/${TODOS_ENDPOINT}/${id}`;

  return axios
    .delete(urlWithId);
}

function getItems() : Promise<Array<ServerTodoItem>> {
  return axios
    .get(`/${TODOS_ENDPOINT}`)
    .then(response => response.data);
}

export { createItemData, editItemData, removeItemData, getItems };
