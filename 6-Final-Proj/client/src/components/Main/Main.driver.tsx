import { Main } from "./Main";
import { render, fireEvent } from "@testing-library/react";
import { guid, TodoItem as TodoItemData } from "../../../../common/types";
import { RenderResult } from "@testing-library/react";
import { MockTodoApi } from "./todo_api_mock";
import hooks from "../../dataHooks";

export class MainDriver {
  private todoApi?: MockTodoApi;
  private todos: Array<TodoItemData> = [];
  protected wrapper?: RenderResult;

  private getElementFromDataHookAndId(hook: string, id: guid) {
    if (!this.wrapper) {
      throw new Error("Component must be rendered before accessed!");
    }

    return this.wrapper
      .getByTestId(id)
      .querySelector(`[data-hook='${hook}']`) as Element;
  }

  private getAllElementsFromDataHook(hook: string) {
    if (!this.wrapper) {
      throw new Error("Component must be rendered before accessed!");
    }

    return this.wrapper.getAllByTestId(hook);
  }

  private editBtn = (id: guid) =>
    this.getElementFromDataHookAndId(hooks.editBtn, id);
  private removeBtn = (id: guid) =>
    this.getElementFromDataHookAndId(hooks.removeBtn, id);
  private checkBtn = (id: guid) =>
    this.getElementFromDataHookAndId(hooks.checkBtn, id);
  private confirmBtn = (id: guid) =>
    this.getElementFromDataHookAndId(hooks.confirmBtn, id);
  private label = (id: guid) =>
    this.getElementFromDataHookAndId(hooks.label, id);
  private editInput = (id: guid) =>
    this.getElementFromDataHookAndId(hooks.input, id) as HTMLInputElement;
  private addBtn = () => this.getAllElementsFromDataHook(hooks.addBtn)[0];
  private addInput = () => this.getAllElementsFromDataHook(hooks.addInput)[0];

  given = {
    todos: (todos: Array<TodoItemData>) => {
      this.todos = todos;
    },
  };

  when = {
    render: () => {
      this.todoApi = new MockTodoApi(this.todos);
      this.wrapper = render(<Main todoApi={this.todoApi}></Main>);

      return this;
    },
    addBtnClick: () => fireEvent.click(this.addBtn()),
    editBtnClick: (id: guid) => fireEvent.click(this.editBtn(id)),
    removeBtnClick: (id: guid) => fireEvent.click(this.removeBtn(id)),
    confirmBtnClick: (id: guid) => fireEvent.click(this.confirmBtn(id)),
    checkBtnClick: (id: guid) => fireEvent.click(this.checkBtn(id)),
    labelDblClick: (id: guid) => fireEvent.dblClick(this.label(id)),
    setEditInputText: (id: guid, text: string) =>
      fireEvent.change(this.editInput(id), { target: { value: text } }),
    setAddInputText: (text: string) =>
      fireEvent.change(this.addInput(), { target: { value: text } }),
  };

  get = {
    doesTextExist: (text: string) => {
      const elements = this.getAllElementsFromDataHook(hooks.label);
      return (
        elements.find((element) => element.innerHTML === text) !== undefined
      );
    },
    doesItemExist: (item: TodoItemData) => {
      if (this.wrapper?.queryByTestId(item.id)) {
        const label = this.label(item.id);
        const checkBtn = this.checkBtn(item.id);

        return (
          label.innerHTML === item.text &&
          checkBtn.classList.contains("checked") === item.check
        );
      }

      return false;
    },
  };
}
