import axios from "axios";
import {TodoItem} from "../../../common/types";
import dotenv from "dotenv";

dotenv.config();

export class AppDriver {
  SERVER_URL: string = process.env.TODO_SERVER_URL || "";
  TODOS_ENDPOINT = "todos";
  SERVER_PORT: string = "";
  userId: string|undefined;

  constructor(port: string) { this.SERVER_PORT = port; }

  setUserId(userId: string) { this.userId = userId; }

  createItem = (item: Partial<TodoItem>) => {
    return axios
      .post(`${this.SERVER_URL}:${this.SERVER_PORT}/${this.TODOS_ENDPOINT}`, item, 
      this.userId ?
      {
        headers: {
            Cookie: `userId=${this.userId};`
        }} : {});
  };

  editItem = (item: Partial<TodoItem>) => {
    const urlWithId = `${this.SERVER_URL}:${this.SERVER_PORT}/${this.TODOS_ENDPOINT}/${item.id}`;

    return axios
      .put(urlWithId, item, 
        this.userId ?
        {
          headers: {
              Cookie: `userId=${this.userId};`
          }} : {});
  };

  deleteItem = (id: string) => {
    const urlWithId = `${this.SERVER_URL}:${this.SERVER_PORT}/${this.TODOS_ENDPOINT}/${id}`;

    return axios
      .delete(urlWithId, 
        this.userId ?
        {
          headers: {
              Cookie: `userId=${this.userId};`
          }} : {});
  };

  getItems = () => {
    return axios
      .get(`${this.SERVER_URL}:${this.SERVER_PORT}/${this.TODOS_ENDPOINT}`, 
      this.userId ?
      {
        headers: {
            Cookie: `userId=${this.userId};`
        }} : {});
  };
}
