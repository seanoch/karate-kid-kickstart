import { FC, useState, useEffect } from "react";
import { ITodoItemData } from "../types";
import { TodoItem as ServerTodoItem } from "../../../common/types";
import { TodoItem } from "./TodoItem";
import { AddTodoItem } from "./AddTodoItem";
import { ErrorModal, ErrorMessage } from "./ErrorModal";
import {
  createItemData,
  editItemData,
  removeItemData,
  getItems,
} from "../todo_api";

export const Main: FC<{}> = () => {
  const [todos, setTodos] = useState<ITodoItemData[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const SERVER_ERROR_TITLE = "Server Error";
  const INVALID_INPUT_ERROR_TITLE = "Invalid Input";

  const confirmError: React.MouseEventHandler = (e) => {
    setError(null);
  };

  const onError = (title: string, message: string) => {
    setError({ message, title });
  };

  const getTodosFromServer = async () => {
    const fixedTodos: Array<ITodoItemData> = [];

    try {
      const todos: Array<ServerTodoItem> = await getItems();
      todos.forEach((item) =>
        fixedTodos.push({
          id: item.id,
          text: item.text,
          check: item.check,
          inEditMode: false,
        })
      );
    } catch (e) {
      console.log(`error loading items from the server`, e);
      onError(
        SERVER_ERROR_TITLE,
        "Ooops, could not load items from the server :("
      );
    }

    return fixedTodos;
  };

  const updateTodoOnServer = async (todo: ITodoItemData) => {
    let success = false;

    const fixedTodo: ServerTodoItem = {
      id: todo.id,
      text: todo.text,
      check: todo.check,
    };

    try {
      await editItemData(fixedTodo);
      success = true;
    } catch (e) {
      console.log(`error updating item on the server`, e);
      onError(
        SERVER_ERROR_TITLE,
        "Ooops, could not update the item on the server :("
      );
    }

    return success;
  };

  const createTodoOnServer = async (todo: ITodoItemData) => {
    let success = false;

    const fixedTodo: ServerTodoItem = {
      id: todo.id,
      text: todo.text,
      check: todo.check,
    };

    try {
      await createItemData(fixedTodo);
      success = true;
    } catch (e) {
      console.log(`error creating item on the server`, e);
      onError(
        SERVER_ERROR_TITLE,
        "Ooops, could not add the item on the server :("
      );
    }

    return success;
  };

  const removeTodoFromServer = async (id: string) => {
    let success = false;

    try {
      await removeItemData(id);
      success = true;
    } catch (e) {
      console.log(`error removing item on the server`, e);
      onError(
        SERVER_ERROR_TITLE,
        "Ooops, could not remove the item on the server :("
      );
    }

    return success;
  };

  useEffect(() => {
    const initTodos = async () => {
      const items = await getTodosFromServer();
      setTodos(items);
    };

    initTodos();
  }, []);

  const addToDomAndServer = async (todo: ITodoItemData): Promise<boolean> => {
    let success = false;

    if (todo.text.length > 0) {
      success = await createTodoOnServer(todo);
    } else {
      onError(INVALID_INPUT_ERROR_TITLE, "Todo text cannot be empty.");
    }

    if (success) {
      setTodos((prevTodos) => [...prevTodos, todo]);
    }

    return success;
  };

  const removeFromDomAndServer = async (
    removedTodo: ITodoItemData,
    updateServer: boolean
  ): Promise<boolean> => {
    let success = false;

    if (updateServer) {
      success = await removeTodoFromServer(removedTodo.id);
    }

    if (success || !updateServer) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== removedTodo.id)
      );
    }

    return success;
  };

  const updateDomAndServer = async (
    updatedTodo: ITodoItemData,
    updateServer: boolean
  ): Promise<boolean> => {
    let success = false;

    if (updateServer) {
      if (updatedTodo.text.length > 0) {
        success = await updateTodoOnServer(updatedTodo);
      } else {
        onError(INVALID_INPUT_ERROR_TITLE, "Todo text cannot be empty.");
      }
    }

    if (success || !updateServer) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    }

    return success;
  };

  return (
    <>
      {error && <ErrorModal error={error} onConfirm={confirmError} />}
      <div className="main" id="main-container">
        <AddTodoItem addToDomAndServer={addToDomAndServer} />
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            removeFromDomAndServer={removeFromDomAndServer}
            updateDomAndServer={updateDomAndServer}
          />
        ))}
      </div>
    </>
  );
};
