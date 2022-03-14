import {TodoItem, guid} from "../common/types"

export interface ITodoModel {
  getItems(userId: guid): Promise<Array<TodoItem>>;
  createItem(userId: guid, item: TodoItem): Promise<boolean|void>;
  editItem(userId: guid, item: TodoItem): Promise<boolean>;
  deleteItem(userId: guid, itemId: guid): Promise<boolean>;
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