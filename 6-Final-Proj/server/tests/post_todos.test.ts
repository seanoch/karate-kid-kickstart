import { Testkit } from "./testkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TodoItem } from "../../common/types";
import { getRandomItem, getRandomUserId, getRandomPartialItem } from "./utils";

const testkit = new Testkit();

describe("POST /todos", () => {
  testkit.beforeAndAfterEach();

  it("When creating a new item, \
    it should return 201 and the item should be added to the DB", async () => {
    const userId = getRandomUserId();
    const todo1: TodoItem = getRandomItem();

    testkit.appDriver?.setUserId(userId);

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.createItem(todo1);

    expect(response?.status).toBe(201);

    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems).toContainEqual(todo1);
  });

  it("When creating an item with an ID that already exists for that user, \
    it should return 400 with a DuplicateKeyError", async () => {
    const userId = getRandomUserId();
    const todo1: TodoItem = getRandomItem();
    let thrownError: AxiosError | undefined;

    await testkit.dbDriver?.createItem(userId, todo1);

    testkit.appDriver?.setUserId(userId);

    try {
      const response: AxiosResponse | undefined =
        await testkit.appDriver?.createItem(todo1);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        thrownError = err;
      }
    }

    expect(thrownError?.response?.status).toBe(400);
    expect(thrownError?.response?.data?.name).toBe("DuplicateKeyError");
    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems?.length).toBe(1);
  });

  it("When creating an item with a missing property, \
    it should return 400 with a ValidationError", async () => {
    const userId = getRandomUserId();
    const todo1: Partial<TodoItem> = getRandomPartialItem();
    let thrownError: AxiosError | undefined;

    testkit.appDriver?.setUserId(userId);

    try {
      const response: AxiosResponse | undefined =
        await testkit.appDriver?.createItem(todo1);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        thrownError = err;
      }
    }

    expect(thrownError?.response?.status).toBe(400);
    console.log(thrownError?.response?.data);
    expect(thrownError?.response?.data?.name).toBe("ValidationError");
    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems?.length).toBe(0);
  });
});
