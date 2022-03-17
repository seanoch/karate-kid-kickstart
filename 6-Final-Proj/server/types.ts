import {TodoItem, guid, UserID} from "../common/types"

export interface ITodoDAO {
  getItems(userId: UserID): Promise<Array<TodoItem>>;
  createItem(userId: UserID, item: TodoItem): Promise<boolean>;
  editItem(userId: UserID, item: TodoItem): Promise<boolean>;
  deleteItem(userId: UserID, itemId: guid): Promise<boolean>;
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