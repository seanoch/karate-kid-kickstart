import { AxiosResponse } from "axios";
import { TodoItem } from "../../common/types";
import { Testkit } from "./testkit";
import { aRandomItem, aUserId } from "./utils";

const testkit = new Testkit();

describe("On GET /todos", () => {
  testkit.beforeAndAfterEach();

  it("should return an empty array when the user doesn't exist", async () => {
    const userId = aUserId();

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.getItems();
    expect(response?.data.length).toBe(0);
  });

  it("should return only user's todos when such exist", async () => {
    const userId1 = aUserId();
    const userId2 = aUserId();

    const todo1: TodoItem = aRandomItem({});
    const todo2: TodoItem = aRandomItem({});
    const todo3: TodoItem = aRandomItem({});

    await testkit.dbDriver?.createItem(userId1, todo1);
    await testkit.dbDriver?.createItem(userId1, todo2);
    await testkit.dbDriver?.createItem(userId2, todo3);

    testkit.appDriver?.setUserId(userId1);

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.getItems();

    expect(response?.data).toContainEqual(todo1);
    expect(response?.data).toContainEqual(todo2);
    expect(response?.data).not.toContainEqual(todo3);
  });
});
