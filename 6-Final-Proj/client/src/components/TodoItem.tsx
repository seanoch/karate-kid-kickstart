import { FC } from "react";
import {
  EditButton,
  RemoveButton,
  ConfirmButton,
  CheckButton,
} from "./TodoButtons";
import { ITodoItemData } from "../types";
import { classes } from "../style_jss";
import { TodoEditor } from "./TodoEditor";

interface ITodoItem {
  todo: ITodoItemData;
  removeFromDomAndServer(todo: ITodoItemData, updateServer: boolean): void;
  updateDomAndServer(todo: ITodoItemData, updateServer: boolean): void;
}

export const TodoItem: FC<ITodoItem> = ({ todo, removeFromDomAndServer, updateDomAndServer }) => {
  const onDoubleClick: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    todo.inEditMode = true;
    updateDomAndServer(todo, false);
  };

  const editOrConfirmBtn = todo.inEditMode ? (
    <ConfirmButton todo={todo} onUpdate={updateDomAndServer} />
  ) : (
    <EditButton todo={todo} onUpdate={updateDomAndServer} />
  );

  const labelOrInput = todo.inEditMode ? (
    <TodoEditor todo={todo} onUpdate={updateDomAndServer} />
  ) : (
    <label className={classes.item} onDoubleClick={onDoubleClick}>
      {todo.text}
    </label>
  );

  return (
    <div className="bar item-bar">
      <CheckButton todo={todo} onUpdate={updateDomAndServer} />
      {labelOrInput}
      {editOrConfirmBtn}
      <RemoveButton todo={todo} onUpdate={removeFromDomAndServer} />
    </div>
  );
};
