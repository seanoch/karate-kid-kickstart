import { Testkit } from "./testkit";
import { AxiosResponse } from "axios";
import { TodoItem } from "../../common/types"

const testkit = new Testkit();

describe("POST /todos", () => {
  testkit.beforeAndAfterEach();
  describe("When creating a new item", () => {
    it("should return 201 and the item should be added to the DB", async () => {
      const todo1: TodoItem = { userId: "1", id: "1", text: "hi", check: true };

      testkit.appDriver?.setUserId("1");      
      const response: AxiosResponse|undefined = await testkit.appDriver?.createItem(
        todo1
      );

      expect(response?.status).toBe(201);

      const allItems = await testkit.dbDriver?.getItems("1");
      expect(allItems).toContainEqual(todo1);
    });
  });

  describe("When creating an item with an ID that already exists for that user", () => {
    it("should return 400 and the item should not be added to the DB", async () => {
      const todo1: TodoItem = { userId: "1", id: "1", text: "hi", check: true };

      await testkit.dbDriver?.createItem(todo1);

      testkit.appDriver?.setUserId("1");

      try {
        const response: AxiosResponse|undefined = await testkit.appDriver?.createItem(
          todo1
        );
        expect(true).toBe(false);
      } catch (err: any) {
        expect(err.response.status).toBe(400);
      }

    });
  });

  describe("When creating an item with a missing property", () => {
    it("should return 400 and the item should not be added to the DB", async () => {
      const todo1 = { userId: "1", id: "1", text: "hi" };

      testkit.appDriver?.setUserId("1");

      try {
        const response: AxiosResponse|undefined = await testkit.appDriver?.createItem(
          todo1
        );
        expect(true).toBe(false);
      } catch (err: any) {
        expect(err.response.status).toBe(400);
      }

    });
  });
});
