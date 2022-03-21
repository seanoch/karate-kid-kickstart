import { FC, useState } from "react";
import { Button } from "./Button";
import { TodoItem as TodoItemData } from "../../../common/types";
import { classes } from "../style_jss";
import { v4 as uuidv4 } from "uuid";

interface IAddTodoItem {
  addToDomAndServer(todo: TodoItemData): Promise<boolean>;
}

export const AddTodoItem: FC<IAddTodoItem> = ({ addToDomAndServer }) => {
  const [text, setText] = useState<string>("");

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const addItem = async () => {
    if (text.length > 0) {
      const uniqueId: string = uuidv4();
      const todo: TodoItemData = {
        id: uniqueId,
        text: text,
        check: false,
      };

      let success = await addToDomAndServer(todo);

      if (success) {
        setText("");
      }
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
