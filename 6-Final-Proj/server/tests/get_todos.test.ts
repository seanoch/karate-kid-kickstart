import { AxiosResponse } from "axios";
import { TodoItem } from "../../common/types";
import { Testkit } from "./testkit";

const testkit = new Testkit();

describe("GET /todos", () => {
  testkit.beforeAndAfterEach();
  
  it("When user doesn't exist, \
  it should return an empty array", async () => {
    testkit.appDriver?.setUserId("1");

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.getItems();
    expect(response?.data.length).toBe(0);
  });

  it("When user has todos, \
  it should return only that user's todos", async () => {
    const todo1: TodoItem = { userId: "1", id: "1", text: "hi", check: true };
    const todo2: TodoItem = { userId: "1", id: "2", text: "hi", check: true };
    const todo3: TodoItem = {
      userId: "2",
      id: "3",
      text: "bye",
      check: true,
    };

    await testkit.dbDriver?.createItem(todo1);
    await testkit.dbDriver?.createItem(todo2);
    await testkit.dbDriver?.createItem(todo3);

    testkit.appDriver?.setUserId("1");
    const response: AxiosResponse | undefined =
      await testkit.appDriver?.getItems();

    expect(response?.data).toContainEqual(todo1);
    expect(response?.data).toContainEqual(todo2);
    expect(response?.data).not.toContainEqual(todo3);
  });
});
