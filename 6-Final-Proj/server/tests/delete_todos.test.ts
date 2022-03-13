import { Testkit } from "./testkit";
import { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import { TodoItem } from "../../common/types";
import { getRandomItem, getRandomUserId } from "./utils";

const testkit = new Testkit();

describe("DELETE /todos", () => {
  testkit.beforeAndAfterEach();

  it("When the item exists, \
  it should return 200 and the item should be deleted", async () => {
    const userId = getRandomUserId();
    const todo1: TodoItem = getRandomItem();

    await testkit.dbDriver?.createItem(userId, todo1);

    testkit.appDriver?.setUserId(userId);

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.deleteItem(todo1.id);

    expect(response?.status).toBe(200);

    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems?.length).toBe(0);
  });

  it("When the item doesn't exist, \
  it should return 400 and the item shouldn't be added to the DB", async () => {
    const userId = getRandomUserId();
    const todo1: TodoItem = getRandomItem();

    let thrownError: AxiosError | undefined;

    testkit.appDriver?.setUserId(userId);

    try {
      const response: AxiosResponse | undefined =
        await testkit.appDriver?.deleteItem(todo1.id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        thrownError = err;
      }
    }

    expect(thrownError?.response?.status).toBe(400);
    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems?.length).toBe(0);
  });
});
