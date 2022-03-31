import { TodoItem as TodoItemData } from "../../../../common/types";
import { aRandomItem } from "../../test/utils"; 
import { TodoItemDriver } from "./TodoItem.driver";

describe("TodoItem component", () => {
    let driver: TodoItemDriver;

    beforeEach(() => {
        driver = new TodoItemDriver();
      });

    it("should display the item's text in a label when rendered", () => {
        const todo: TodoItemData = aRandomItem();

        driver.given.todo(todo);
        driver.when.render();

        expect(driver.get.labelText()).toBe(todo.text);
    });

    it("should display the item's text in an input panel when edit button is clicked", () => {
        const todo: TodoItemData = aRandomItem();

        driver.given.todo(todo);
        driver.when.render();
        driver.when.editBtnClick();

        expect(driver.get.inputText()).toBe(todo.text);
    });

    it("should display the item's text in an input panel when label is double clicked", () => {
        const todo: TodoItemData = aRandomItem();

        driver.given.todo(todo);
        driver.when.render();
        driver.when.labelDblClick();

        expect(driver.get.inputText()).toBe(todo.text);
    });

    it("should call the update CB when remove button is clicked", () => {
        driver.when.render();
        driver.when.removeBtnClick();

        expect(driver.get.removeCallback()).toHaveBeenCalled();
    });

    it("should call the update CB when check button is clicked", () => {
        driver.when.render();
        driver.when.checkBtnClick();

        expect(driver.get.updateCallback()).toHaveBeenCalled();
    });

    it("should call the update CB when confirm button is clicked with non-empty input", () => {
        driver.when.render();
        
        driver.when.editBtnClick();
        driver.when.setInputText("Blabla");
        driver.when.confirmBtnClick();

        expect(driver.get.updateCallback()).toHaveBeenCalled();
        expect(driver.get.isBadInputDisplayed()).toBe(false);
    });

    it("should not call the update CB when confirm button is clicked with empty input", () => {
        driver.when.render();

        driver.when.editBtnClick();
        driver.when.setInputText("");
        driver.when.confirmBtnClick();

        expect(driver.get.updateCallback()).not.toHaveBeenCalled();
        expect(driver.get.isBadInputDisplayed()).toBe(true);
    });
})