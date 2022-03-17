import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { TodoItem } from "../../../common/types";
import dotenv from "dotenv";

dotenv.config();

export class AppDriver {
  SERVER_URL: string = process.env.TODO_SERVER_URL || "http://localhost";
  TODOS_ENDPOINT = "todos";
  SERVER_PORT: string;
  fullUrl: string;
  userId: string | undefined;

  constructor(port: string) {
    this.SERVER_PORT = port;
    this.fullUrl = `${this.SERVER_URL}:${this.SERVER_PORT}/${this.TODOS_ENDPOINT}`;
  }

  private getRequestHeaders = () => {
    return this.userId
    ? {
        headers: {
          Cookie: `userId=${this.userId};`,
        },
      }
    : {};
  }

  setUserId = (userId: string) => {
    this.userId = userId;
  }

  createItem = (item: Partial<TodoItem>) => {
    return axios.post(
      this.fullUrl,
      item,
      this.getRequestHeaders()
    );
  };

  editItem = (item: Partial<TodoItem>) => {
    const urlWithId = `${this.fullUrl}/${item.id}`;

    return axios.put(
      urlWithId,
      item,
      this.getRequestHeaders()
    );
  };

  deleteItem = (id: string) => {
    const urlWithId = `${this.fullUrl}/${id}`;

    return axios.delete(
      urlWithId,
      this.getRequestHeaders()
    );
  };

  getItems = () => {
    return axios.get(
      this.fullUrl,
      this.getRequestHeaders()
    );
  };
}
