import { TodoItem as TodoItemData } from "../../../../common/types";
import { TodoApi } from "../../types";

export class MockTodoApi implements TodoApi {
  private createOnServerMock: jest.Mock<Promise<void>, []>;
  private editOnServerMock: jest.Mock<Promise<void>, []>;
  private removeFromServerMock: jest.Mock<Promise<void>, []>;
  private getFromServerMock: jest.Mock<Promise<Array<TodoItemData>>, []>;

  constructor(todos: Array<TodoItemData> = []) {
    this.createOnServerMock = jest.fn(() => Promise.resolve());
    this.editOnServerMock = jest.fn(() => Promise.resolve());
    this.removeFromServerMock = jest.fn(() => Promise.resolve());
    this.getFromServerMock = jest.fn(() => Promise.resolve(todos));
  }

  createItemData(item: TodoItemData): Promise<void> {
    return this.createOnServerMock();
  }

  editItemData(item: TodoItemData): Promise<void> {
    return this.editOnServerMock();
  }

  removeItemData(id: string): Promise<void> {
    return this.removeFromServerMock();
  }

  getItems(): Promise<Array<TodoItemData>> {
    return this.getFromServerMock();
  }

  mocks = {
    createOnServer: () => this.createOnServerMock,
    editOnServer: () => this.editOnServerMock,
    removeFromServer: () => this.removeFromServerMock,
    getFromServer: () => this.getFromServerMock,
  };
}
