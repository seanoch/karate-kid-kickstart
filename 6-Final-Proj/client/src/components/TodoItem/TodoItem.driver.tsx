import { TodoItem } from "./TodoItem";
import { render, fireEvent } from "@testing-library/react";
import { TodoItem as TodoItemData } from "../../../../common/types";
import { aRandomItem } from "../../test/utils";
import { RenderApi } from "../../types";
import hooks from "../../dataHooks";

export class TodoItemDriver {
  private removeCallback: jest.Mock = jest.fn();
  private updateCallback: jest.Mock = jest.fn();
  private todo: TodoItemData = aRandomItem();
  protected wrapper?: RenderApi;

  constructor(wrapper?: RenderApi) {
    this.wrapper = wrapper;
  }

  private getElementFromDataHook(hook: string) {
    if (!this.wrapper) {
      throw new Error("Component must be rendered before accessed!");
    }

    return this.wrapper.getByTestId(hook);
  }

  private editBtn = () => this.getElementFromDataHook(hooks.editBtn);
  private removeBtn = () => this.getElementFromDataHook(hooks.removeBtn);
  private checkBtn = () => this.getElementFromDataHook(hooks.checkBtn);
  private confirmBtn = () => this.getElementFromDataHook(hooks.confirmBtn);
  private label = () => this.getElementFromDataHook(hooks.label);
  private input = () =>
    this.getElementFromDataHook(hooks.input) as HTMLInputElement;

  given = {
    todo: (todo: Partial<TodoItemData>) => {
      this.todo = {
        ...this.todo,
        ...todo,
      };
    },
  };

  when = {
    render: () => {
      this.wrapper = render(
        <TodoItem
          todo={this.todo}
          onRemove={this.removeCallback}
          onUpdate={this.updateCallback}
        ></TodoItem>
      );

      return this;
    },
    editBtnClick: () => fireEvent.click(this.editBtn()),
    removeBtnClick: () => fireEvent.click(this.removeBtn()),
    confirmBtnClick: () => fireEvent.click(this.confirmBtn()),
    checkBtnClick: () => fireEvent.click(this.checkBtn()),
    labelDblClick: () => fireEvent.dblClick(this.label()),
    setInputText: (text: string) =>
      fireEvent.change(this.input(), { target: { value: text } }),
  };

  get = {
    removeCallback: () => this.removeCallback,
    updateCallback: () => this.updateCallback,
    labelText: () => this.label().textContent,
    inputText: () => this.input().value,
    isChecked: () => this.checkBtn().classList.contains("checked"),
    isBadInputDisplayed: () => this.input().classList.contains("error"),
  };
}
