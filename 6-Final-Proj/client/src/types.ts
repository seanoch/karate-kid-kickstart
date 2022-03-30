import { TodoItem as ServerTodoItem } from "../../common/types";

export interface TodoApi {
  createItemData(item: ServerTodoItem): Promise<void>;
  editItemData(item: ServerTodoItem): Promise<void>;
  removeItemData(id: string): Promise<void>;
  getItems(): Promise<Array<ServerTodoItem>>;
}