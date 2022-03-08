import { Testkit } from "./testkit";
import { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import { TodoItem } from "../../common/types";

const testkit = new Testkit();

describe("DELETE /todos", () => {
  testkit.beforeAndAfterEach();

  it("When the item exists, \
  it should return 200 and the item should be deleted", async () => {
    const todo1: TodoItem = {
      userId: "1",
      id: "1",
      text: "hi",
      check: false,
    };

    await testkit.dbDriver?.createItem(todo1);

    testkit.appDriver?.setUserId("1");
    const response: AxiosResponse | undefined =
      await testkit.appDriver?.deleteItem(todo1.id);

    expect(response?.status).toBe(200);

    const allItems = await testkit.dbDriver?.getItems("1");
    expect(allItems?.length).toBe(0);
  });

  it("When the item doesn't exist, \
  it should return 400 and the item shouldn't be added to the DB", async () => {
    const todo1: TodoItem = {
      userId: "1",
      id: "1",
      text: "hi",
      check: false,
    };

    let thrownError: AxiosError | undefined;

    testkit.appDriver?.setUserId("1");

    try {
      const response: AxiosResponse | undefined =
        await testkit.appDriver?.deleteItem(todo1.id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        thrownError = err;
      }
    }

    expect(thrownError?.response?.status).toBe(400);
    const allItems = await testkit.dbDriver?.getItems("1");
    expect(allItems?.length).toBe(0);
  });
});
