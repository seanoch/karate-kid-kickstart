import { FC } from "react";
import { ITodoItemData } from "../types";

interface ITodoEditor {
  todo: ITodoItemData;
  onUpdate(todo: ITodoItemData, updateServer: boolean): void;
}

export const TodoEditor: FC<ITodoEditor> = ({ todo, onUpdate }) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedTodo = { ...todo, text: e.target.value };
    onUpdate(updatedTodo, false);
  };

  const onInputEnter: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
        const updatedTodo = { ...todo, inEditMode: false };
        onUpdate(updatedTodo, true);
      }
  };

  return (
    <input
      autoFocus
      type="text"
      className="edit"
      value={todo.text}
      onChange={onInputChange}
      onKeyPress={onInputEnter}
    />
  );
};
