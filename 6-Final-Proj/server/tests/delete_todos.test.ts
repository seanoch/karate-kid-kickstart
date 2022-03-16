import { Testkit } from "./testkit";
import { AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import { TodoItem } from "../../common/types";
import { aRandomItem, aUserId } from "./utils";

const testkit = new Testkit();

describe("On DELETE /todos", () => {
  testkit.beforeAndAfterEach();

  it("should return 200 and the item should be deleted\
   when the item exists", async () => {
    const userId = aUserId();
    const todo1: TodoItem = aRandomItem();

    await testkit.dbDriver?.createItem(userId, todo1);

    testkit.appDriver?.setUserId(userId);

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.deleteItem(todo1.id);

    expect(response?.status).toBe(200);

    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems?.length).toBe(0);
  });

  it("should return 400 when the item doesn't exist", async () => {
    const userId = aUserId();
    const todo1: TodoItem = aRandomItem();

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
