import { FC } from "react";
import { ITodoItemData } from "../types";

interface ITodoEditor {
  todo: ITodoItemData;
  onUpdate(todo: ITodoItemData, updateServer: boolean): void;
}

export const TodoEditor: FC<ITodoEditor> = ({ todo, onUpdate }) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    todo.text = e.target.value;
    onUpdate(todo, false);
  };

  const onInputEnter: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      if (todo.text.length > 0) {
        todo.inEditMode = false;
        onUpdate(todo, true);
      } else {
        alert("Invalid item name!");
      }
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
