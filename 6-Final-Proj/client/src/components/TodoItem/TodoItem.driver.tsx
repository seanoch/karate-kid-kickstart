import { TodoItem } from "./TodoItem";
import { render, fireEvent } from "@testing-library/react";
import { TodoItem as TodoItemData } from "../../../../common/types";
import { aRandomItem } from "../../test/utils"; 
import { BaseDriver } from "../../test/baseDriver";
import hooks from "../../dataHooks";

export class TodoItemDriver extends BaseDriver {
    private removeCallback: jest.Mock = jest.fn();
    private updateCallback: jest.Mock = jest.fn();
    private todo: TodoItemData = aRandomItem();

    private editBtn = () => (this.withWrapper(hooks.editBtn));
    private removeBtn = () => (this.withWrapper(hooks.removeBtn));
    private checkBtn = () => (this.withWrapper(hooks.checkBtn));
    private confirmBtn = () => (this.withWrapper(hooks.confirmBtn));
    private label = () => (this.withWrapper(hooks.label));
    private input = () => (this.withWrapper(hooks.input));

    given = {
        setTodo: (todo: Partial<TodoItemData>) => {
            this.todo = {
                ...this.todo,
                ...todo
            };
        }
    };

    when = { 
        render: () => {
            this.wrapper = render(<TodoItem todo={this.todo} removeFromDomAndServer={this.removeCallback} updateDomAndServer={this.updateCallback}></TodoItem>);
        },
        editBtnClick: () => fireEvent.click(this.editBtn()),
        removeBtnClick: () => fireEvent.click(this.removeBtn()),
        confirmBtnClick: () => fireEvent.click(this.confirmBtn()),
        checkBtnClick: () => fireEvent.click(this.checkBtn()),
        labelDblClick: () => fireEvent.dblClick(this.label()),
        setInputText: (text: string) => fireEvent.change(this.input(), {target: {value: text}})
    }

    get = {
        removeCallback: () => this.removeCallback,
        updateCallback: () => this.updateCallback,
        labelText: () => this.label().textContent,
        inputText: () => (this.input() as HTMLInputElement).value,
        isBadInputDisplayed: () => this.input().classList.contains("error"),
    }

}