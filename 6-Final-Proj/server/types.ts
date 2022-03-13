import {TodoItem} from "../common/types"

export interface ITodoModel {
  getItems(userId: string): Promise<Array<TodoItem>>;
  createItem(userId: string, item: TodoItem): Promise<boolean|void>;
  editItem(userId: string, item: TodoItem): Promise<boolean>;
  deleteItem(userId: string, itemId: string): Promise<boolean>;
}

export interface IDBConnection {
  setup(): Promise<void>;
  teardown(): Promise<void>;
  clearDatabase(): Promise<void>;
}


export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class DuplicateKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateKeyError";
  }
}