import { Testkit } from "./testkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { TodoItem } from "../../common/types";
import { getRandomItem, getRandomUserId, getRandomPartialItem } from "./utils";

const testkit = new Testkit();

describe("PUT /todos", () => {
  testkit.beforeAndAfterEach();

  it("When the item exists, \
    it should return 200 and the item should be updated", async () => {
    const userId = getRandomUserId();
    const todo1: TodoItem = getRandomItem();

    await testkit.dbDriver?.createItem(userId, todo1);

    todo1.check = !todo1.check;

    testkit.appDriver?.setUserId(userId);
    const response: AxiosResponse | undefined =
      await testkit.appDriver?.editItem(todo1);

    expect(response?.status).toBe(200);

    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems ? allItems[0].check : undefined).toBe(todo1.check);
  });

  it("When the item doesn't exist, \
    it should return 400 and the item shouldn't be added to the DB", async () => {
    const userId = getRandomUserId();
    const todo1: TodoItem = getRandomItem();
    let thrownError: AxiosError | undefined;

    testkit.appDriver?.setUserId(userId);

    try {
      const response: AxiosResponse | undefined =
        await testkit.appDriver?.editItem(todo1);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        thrownError = err;
      }
    }

    expect(thrownError?.response?.status).toBe(400);
    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems?.length).toBe(0);
  });

  it.todo(
    "When removing a property from the item, \
  should return 400 and the item should not be added to the DB"
  );
});
