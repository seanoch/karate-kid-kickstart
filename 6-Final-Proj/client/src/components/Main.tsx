import { FC, useState, useEffect } from "react";
import { TodoItem as TodoItemData, guid } from "../../../common/types";
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
  const [todos, setTodos] = useState<TodoItemData[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const SERVER_ERROR_TITLE = "Server Error";

  const confirmError: React.MouseEventHandler = (e) => {
    setError(null);
  };

  const onError = (title: string, message: string) => {
    setError({ message, title });
  };

  const getTodosFromServer = async () => {
    let todos: Array<TodoItemData> = [];

    try {
      todos = await getItems();
    } catch (e) {
      console.log(`error loading items from the server`, e);
      onError(
        SERVER_ERROR_TITLE,
        "Ooops, could not load items from the server :("
      );
    }

    return todos;
  };

  const updateTodoOnServer = async (todo: TodoItemData) => {
    let success = false;

    try {
      await editItemData(todo);
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

  const createTodoOnServer = async (todo: TodoItemData) => {
    let success = false;

    try {
      await createItemData(todo);
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

  const removeTodoFromServer = async (id: guid) => {
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

  const addToDomAndServer = async (todo: TodoItemData): Promise<boolean> => {
    let success = await createTodoOnServer(todo);

    if (success) {
      setTodos((prevTodos) => [...prevTodos, todo]);
    }

    return success;
  };

  const removeFromDomAndServer = async (
    id: guid
  ): Promise<boolean> => {
    let success = await removeTodoFromServer(id);

    if (success) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    }

    return success;
  };

  const updateDomAndServer = async (
    updatedTodo: TodoItemData
  ): Promise<boolean> => {
    let success = await updateTodoOnServer(updatedTodo);

    if (success) {
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
