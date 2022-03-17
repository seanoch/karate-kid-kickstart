import { FC } from "react";
import { Button } from "./Button";
import { classes } from "../style_jss";
import { ITodoItemData } from "../types";

interface ITodoButton {
  todo: ITodoItemData;
  onUpdate(todo: ITodoItemData, updateServer: boolean): void;
}

export const EditButton: FC<ITodoButton> = ({ todo, onUpdate }) => {
  const onEdit: React.MouseEventHandler = (e) => {
    todo.inEditMode = true;
    onUpdate(todo, false);
  };

  return (
    <Button
      icon="&#xe3c9;"
      additionalClasses={[classes.editBtn]}
      onClick={onEdit}
    ></Button>
  );
};

export const RemoveButton: FC<ITodoButton> = ({ todo, onUpdate }) => {
  const onRemove: React.MouseEventHandler = (e) => {
    onUpdate(todo, true);
  };

  return (
    <Button
      icon="&#xe14c;"
      additionalClasses={[classes.removeBtn]}
      onClick={onRemove}
    ></Button>
  );
};

export const CheckButton: FC<ITodoButton> = ({ todo, onUpdate }) => {
  const additionalClasses: Array<string> = [classes.checkBtn];
  const onCheck: React.MouseEventHandler = (e) => {
    todo.check = !todo.check;
    onUpdate(todo, true);
  };

  if (todo.check) {
    additionalClasses.push("checked");
  }

  return (
    <Button
      icon="&#xe876;"
      additionalClasses={additionalClasses}
      onClick={onCheck}
    ></Button>
  );
};

export const ConfirmButton: FC<ITodoButton> = ({ todo, onUpdate }) => {
  const onConfirm: React.MouseEventHandler = (e) => {
    todo.inEditMode = false;
    onUpdate(todo, true);
  };

  return (
    <Button
      icon="&#xe145;"
      additionalClasses={[classes.confirmBtn]}
      onClick={onConfirm}
    ></Button>
  );
};
