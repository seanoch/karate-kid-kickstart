import { FC, useState } from "react";
import { Button } from "./Button";
import { ITodoItemData } from "../types";
import { classes } from "../style_jss";
import { v4 as uuidv4 } from "uuid";

interface IAddTodoItem {
  addToDomAndServer(todo: ITodoItemData): void;
}

export const AddTodoItem: FC<IAddTodoItem> = ({ addToDomAndServer }) => {
  const [text, setText] = useState<string>("");

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const addItem = () => {
    if (text.length > 0) {
      const uniqueId: string = uuidv4();
      const todo: ITodoItemData = {
        id: uniqueId,
        text: text,
        check: false,
        inEditMode: false,
      };

      addToDomAndServer(todo);
      setText("");
    } else {
      alert("Invalid item name!");
    }
  };

  const onClick: React.MouseEventHandler = (e) => {
    addItem();
  };

  const onEnter: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="bar">
      <input
        type="text"
        id="new-item-name"
        placeholder="To-do Item"
        onChange={onInputChange}
        onKeyPress={onEnter}
        value={text}
      />
      <Button
        additionalClasses={[classes.addBtn]}
        icon="&#xe145;"
        onClick={onClick}
      ></Button>
    </div>
  );
};
