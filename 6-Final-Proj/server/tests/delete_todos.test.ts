import { Testkit } from "./testkit";
import { AxiosResponse } from "axios";
import { TodoItem } from "../../common/types";

const testkit = new Testkit();

describe("DELETE /todos", () => {
  testkit.beforeAndAfterEach();
  describe("When the item exists", () => {
    it("should return 200 and the item should be delted", async () => {
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
      expect(allItems).not.toContainEqual(todo1);
    });
  });

  describe("When the item doesn't exist", () => {
    it("should return 404 and the item shouldn't be added to the DB", async () => {
      const todo1: TodoItem = {
        userId: "1",
        id: "1",
        text: "hi",
        check: false,
      };

      testkit.appDriver?.setUserId("1");

      try {
        const response: AxiosResponse | undefined =
          await testkit.appDriver?.deleteItem(todo1.id);
        expect(true).toBe(false);
      } catch (err: any) {
        expect(err.response.status).toBe(404);
        const allItems = await testkit.dbDriver?.getItems("1");
        expect(allItems).not.toContainEqual(todo1);
      }
    });
  });
});
