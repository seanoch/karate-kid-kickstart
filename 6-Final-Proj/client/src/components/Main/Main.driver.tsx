import { Main } from "./Main";
import { render, fireEvent, within } from "@testing-library/react";
import { guid, TodoItem as TodoItemData } from "../../../../common/types";
import { MockTodoApi } from "./todo_api_mock";
import hooks from "../../dataHooks";
import { TodoItemDriver } from "../TodoItem/TodoItem.driver";
import { RenderApi } from "../../types";

export class MainDriver {
  private todoApi?: MockTodoApi;
  private todos: Array<TodoItemData> = [];
  protected wrapper?: RenderApi;

  private getAllElementsFromDataHook(hook: string) {
    if (!this.wrapper) {
      throw new Error("Component must be rendered before accessed!");
    }

    return this.wrapper.getAllByTestId(hook);
  }

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
    setAddInputText: (text: string) =>
      fireEvent.change(this.addInput(), { target: { value: text } }),
  };

  get = {
    item: (id: guid) => {
      if (!this.wrapper) {
        throw new Error("Component must be rendered before accessed!");
      }
  
      return new TodoItemDriver(within(this.wrapper.getByTestId(id)));
    },
    doesTextExist: (text: string) => {
      const elements = this.getAllElementsFromDataHook(hooks.label);
      return (
        elements.find((element) => element.innerHTML === text) !== undefined
      );
    },
    doesItemExist: (item: TodoItemData) => {
      if (this.wrapper?.queryByTestId(item.id)) {
        const itemDriver = this.get.item(item.id);
        const labelText = itemDriver.get.labelText();
        const isChecked = itemDriver.get.isChecked();

        return labelText === item.text && isChecked === item.check;
      }

      return false;
    },
  };
}
