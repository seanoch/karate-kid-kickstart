import axios from "axios";
import { TodoItem as TodoItemData } from "../../common/types";
import { TodoApi } from "./types"
const TODOS_ENDPOINT = "todos";

export class AxiosTodoApi implements TodoApi {
  createItemData(item: TodoItemData): Promise<void> {
    return axios.post(`/${TODOS_ENDPOINT}`, item);
  }

  editItemData(item: TodoItemData): Promise<void> {
    const urlWithId = `/${TODOS_ENDPOINT}/${item.id}`;

    return axios.put(urlWithId, item);
  }

  removeItemData(id: string): Promise<void> {
    const urlWithId = `/${TODOS_ENDPOINT}/${id}`;

    return axios.delete(urlWithId);
  }

  getItems(): Promise<Array<TodoItemData>> {
    return axios.get(`/${TODOS_ENDPOINT}`).then((response) => response.data);
  }
}
