import { FC, useState } from "react";
import { Button } from "../Button";
import { TodoItem as TodoItemData, guid } from "../../../../common/types";
import { classes } from "../../style_jss";
import { TodoEditor } from "../TodoEditor";
import hooks from "../../dataHooks";
import classNames from "classnames";

interface TodoItemProps {
  todo: TodoItemData;
  onRemove(id: guid): Promise<boolean>;
  onUpdate(todo: TodoItemData): Promise<boolean>;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onRemove, onUpdate }) => {
  const [inputText, setInputText] = useState<string>(todo.text);
  const [editMode, setEditMode] = useState<boolean>(false);
  const checkBtnClasses = classNames(classes.checkBtn, { checked: todo.check });

  const onStartEditing = () => {
    setEditMode(true);
  };

  const onEditUpdate = (text: string) => {
    setInputText(text);
  };

  const onConfirmEdit = async () => {
    if (inputText.length > 0) {
      const updatedTodo = { ...todo, text: inputText };

      if (!(await onUpdate(updatedTodo))) {
        setInputText(todo.text);
      }

      setEditMode(false);
    }
  };

  const onRemoveBtnClick: React.MouseEventHandler = (e) => {
    onRemove(todo.id);
  };

  const onCheckBtnClick: React.MouseEventHandler = (e) => {
    const updatedTodo = { ...todo, check: !todo.check };
    onUpdate(updatedTodo);
  };

  const todoLabel = (
    <label
      className={classes.item}
      onDoubleClick={onStartEditing}
      data-hook={hooks.label}
    >
      {todo.text}
    </label>
  );

  const todoEditor = (
    <TodoEditor
      text={inputText}
      onUpdate={onEditUpdate}
      onConfirm={onConfirmEdit}
      dataHook={hooks.input}
    />
  );

  const editButton = (
    <Button
      icon="&#xe3c9;"
      className={classes.editBtn}
      onClick={onStartEditing}
      dataHook={hooks.editBtn}
    ></Button>
  );

  const removeButton = (
    <Button
      icon="&#xe14c;"
      className={classes.removeBtn}
      onClick={onRemoveBtnClick}
      dataHook={hooks.removeBtn}
    ></Button>
  );

  const checkButton = (
    <Button
      icon="&#xe876;"
      className={checkBtnClasses}
      onClick={onCheckBtnClick}
      dataHook={hooks.checkBtn}
    ></Button>
  );

  const confirmButton = (
    <Button
      icon="&#xe145;"
      className={classes.confirmBtn}
      onClick={onConfirmEdit}
      dataHook={hooks.confirmBtn}
    ></Button>
  );

  return (
    <div className="bar item-bar" data-hook={todo.id}>
      {checkButton}
      {editMode ? todoEditor : todoLabel}
      {editMode ? confirmButton : editButton}
      {removeButton}
    </div>
  );
};
