import { AxiosResponse } from "axios";
import { TodoItem } from "../../common/types";
import { Testkit } from "./testkit";
import { getRandomItem, getRandomUserId } from "./utils";

const testkit = new Testkit();

describe("GET /todos", () => {
  testkit.beforeAndAfterEach();

  it("When user doesn't exist, \
  it should return an empty array", async () => {
    const userId = getRandomUserId();

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.getItems();
    expect(response?.data.length).toBe(0);
  });

  it("When user has todos, \
  it should return only that user's todos", async () => {
    const userId1 = getRandomUserId();
    const userId2 = getRandomUserId();

    const todo1: TodoItem = getRandomItem();
    const todo2: TodoItem = getRandomItem();
    const todo3: TodoItem = getRandomItem();

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
