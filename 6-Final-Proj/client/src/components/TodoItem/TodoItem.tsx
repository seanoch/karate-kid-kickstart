import { FC, useState } from "react";
import { Button } from "../Button";
import { TodoItem as TodoItemData, guid } from "../../../../common/types";
import { classes } from "../../style_jss";
import { TodoEditor } from "../TodoEditor";
import hooks from "../../dataHooks";

interface ITodoItem {
  todo: TodoItemData;
  removeFromDomAndServer(id: guid): Promise<boolean>;
  updateDomAndServer(todo: TodoItemData): Promise<boolean>;
}

export const TodoItem: FC<ITodoItem> = ({
  todo,
  removeFromDomAndServer,
  updateDomAndServer,
}) => {
  const [inputText, setInputText] = useState<string>(todo.text);
  const [editMode, setEditMode] = useState<boolean>(false);

  const checkBtnClasses = [classes.checkBtn];

  if (todo.check) {
    checkBtnClasses.push("checked");
  }

  const onStartEditing = () => {
    setEditMode(true);
    setInputText(todo.text);
  };

  const onEditUpdate = (text: string) => {
    setInputText(text);
  };

  const onConfirmEdit = async () => {
    if (inputText.length > 0) {
      const updatedTodo = { ...todo, text: inputText };
      await updateDomAndServer(updatedTodo);
      console.log("status changes");
      setEditMode(false);
    }
  };

  const onRemoveBtnClick: React.MouseEventHandler = (e) => {
    removeFromDomAndServer(todo.id);
  };

  const onCheckBtnClick: React.MouseEventHandler = (e) => {
    const updatedTodo = { ...todo, check: !todo.check };
    updateDomAndServer(updatedTodo);
  };

  const todoLabel = (
    <label className={classes.item} onDoubleClick={onStartEditing} data-hook={hooks.label}>
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
      additionalClasses={[classes.editBtn]}
      onClick={onStartEditing}
      dataHook={hooks.editBtn}
    ></Button>
  );

  const removeButton = (
    <Button
      icon="&#xe14c;"
      additionalClasses={[classes.removeBtn]}
      onClick={onRemoveBtnClick}
      dataHook={hooks.removeBtn}
    ></Button>
  );

  const checkButton = (
    <Button
      icon="&#xe876;"
      additionalClasses={checkBtnClasses}
      onClick={onCheckBtnClick}
      dataHook={hooks.checkBtn}
    ></Button>
  );

  const confirmButton = (
    <Button
      icon="&#xe145;"
      additionalClasses={[classes.confirmBtn]}
      onClick={onConfirmEdit}
      dataHook={hooks.confirmBtn}
    ></Button>
  );

  return (
    <div className="bar item-bar">
      {checkButton}
      {editMode ? todoEditor : todoLabel}
      {editMode ? confirmButton : editButton}
      {removeButton}
    </div>
  );
};
