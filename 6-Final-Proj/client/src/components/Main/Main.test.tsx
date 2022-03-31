import { aRandomItem, aRandomItemText } from "../../test/utils";
import { MainDriver } from "./Main.driver";
import { waitFor } from "@testing-library/react";

describe("Main component", () => {
  let driver: MainDriver;

  beforeEach(() => {
    driver = new MainDriver();
  });

  it("should show pre-existing items when such exist", async () => {
    const existingTodos = [aRandomItem(), aRandomItem(), aRandomItem()];

    driver.given.todos(existingTodos);
    driver.when.render();

    await waitFor(() => {
      expect(driver.get.doesItemExist(existingTodos[0])).toBe(true);
      expect(driver.get.doesItemExist(existingTodos[1])).toBe(true);
      expect(driver.get.doesItemExist(existingTodos[2])).toBe(true);
    });
  });

  it("should remove an item when its remove button is clicked", async () => {
    const item1 = aRandomItem();
    const item2 = aRandomItem();
    const item3 = aRandomItem();
    const existingTodos = [item1, item2, item3];

    driver.given.todos(existingTodos);
    driver.when.render();

    await waitFor(() => {
      expect(driver.get.doesItemExist(item1)).toBe(true);
      expect(driver.get.doesItemExist(item2)).toBe(true);
      expect(driver.get.doesItemExist(item3)).toBe(true);
    });

    const itemDriver = driver.get.item(item1.id);
    itemDriver.when.removeBtnClick();

    await waitFor(() => {
      expect(driver.get.doesItemExist(item1)).toBe(false);
      expect(driver.get.doesItemExist(item2)).toBe(true);
      expect(driver.get.doesItemExist(item3)).toBe(true);
    });
  });

  it("should update the item's text upon editing confirmation with non-empty input", async () => {
    const item = aRandomItem();
    const existingTodos = [item];

    driver.given.todos(existingTodos);
    driver.when.render();

    await waitFor(() => {
      expect(driver.get.doesItemExist(item)).toBe(true);
    });

    item.text = aRandomItemText();

    const itemDriver = driver.get.item(item.id);
    itemDriver.when.editBtnClick();
    itemDriver.when.setInputText(item.text);
    itemDriver.when.confirmBtnClick();

    await waitFor(() => {
      expect(driver.get.doesItemExist(item)).toBe(true);
    });
  });

  it("should update the item's check sign when clicking check", async () => {
    const item = aRandomItem();
    const existingTodos = [item];

    driver.given.todos(existingTodos);
    driver.when.render();

    await waitFor(() => {
      expect(driver.get.doesItemExist(item)).toBe(true);
    });

    const itemDriver = driver.get.item(item.id);
    itemDriver.when.checkBtnClick();

    item.check = !item.check;

    await waitFor(() => {
      expect(driver.get.doesItemExist(item)).toBe(true);
    });
  });

  it("should add a new todo item to dom when creating a new item", async () => {
    const todoText: string = aRandomItemText();

    driver.when.render();
    driver.when.setAddInputText(todoText);
    driver.when.addBtnClick();

    await waitFor(() => expect(driver.get.doesTextExist(todoText)).toBe(true));
  });
});
