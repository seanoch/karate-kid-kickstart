import { Testkit } from "./testkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TodoItem } from "../../common/types";
import { aRandomItem, aUserId, aRandomPartialItem } from "./utils";

const testkit = new Testkit();

describe("On POST /todos", () => {
  testkit.beforeAndAfterEach();

  it("should return 201 and the item should be added to the DB \
  when it's a new item", async () => {
    const userId = aUserId();
    const todo1: TodoItem = aRandomItem({});

    testkit.appDriver?.setUserId(userId);

    const response: AxiosResponse | undefined =
      await testkit.appDriver?.createItem(todo1);

    expect(response?.status).toBe(201);

    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems).toContainEqual(todo1);
  });

  it("should return 400 with a DuplicateKeyError \
  when item with such ID already exists for that user", async () => {
    const userId = aUserId();
    const todo1: TodoItem = aRandomItem({});
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

  it("should return 400 with a ValidationError \
  when creating an item with a missing property", async () => {
    const userId = aUserId();
    const todo1: Partial<TodoItem> = aRandomPartialItem();
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
    expect(thrownError?.response?.data?.name).toBe("ValidationError");
    const allItems = await testkit.dbDriver?.getItems(userId);
    expect(allItems?.length).toBe(0);
  });
});
