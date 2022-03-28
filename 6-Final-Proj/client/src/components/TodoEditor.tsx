import { FC } from "react";

interface TodoEditorProps {
  text: string;
  onUpdate(text: string): void;
  onConfirm(): Promise<void>;
  dataHook: string;
}

export const TodoEditor: FC<TodoEditorProps> = ({ text, onUpdate, onConfirm, dataHook }) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onUpdate(e.target.value);
  };

  const onInputEnter: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
        onConfirm();
      }
  };

  return (
    <input
      autoFocus
      type="text"
      className={"edit" + ( text.length == 0 ? " error" : "")}
      value={text}
      onChange={onInputChange}
      onKeyPress={onInputEnter}
      data-hook={dataHook}
    />
  );
};
