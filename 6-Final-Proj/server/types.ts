import {TodoItem} from "../common/types"
export interface ITodoModel {
  getItems(userId: string): Promise<Array<TodoItem>>;
  createItem(item: TodoItem): Promise<boolean>;
  editItem(item: TodoItem): Promise<boolean>;
  deleteItem(userId: string, itemId: string): Promise<boolean>;
}

export interface IDBConnection {
  setup(): Promise<void>;
  teardown(): Promise<void>;
  clearDatabase(): Promise<void>;
}