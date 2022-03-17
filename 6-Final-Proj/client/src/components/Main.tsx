import { FC, useState, useEffect } from "react";
import { ITodoItemData } from "../types";
import { BaseTodoItem as ServerTodoItem } from "../../../common/types";
import { TodoItem } from "./TodoItem";
import { AddTodoItem } from "./AddTodoItem";
import {
  createItemData,
  editItemData,
  removeItemData,
  getItems,
} from "../todo_api";

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
    alert("Ooops, could not load items from the server :(");
  }

  return fixedTodos;
};

const updateTodoOnServer = async (todo: ITodoItemData) => {
  const fixedTodo: ServerTodoItem = {
    id: todo.id,
    text: todo.text,
    check: todo.check,
  };

  try {
    await editItemData(fixedTodo);
  } catch (e) {
    console.log(`error updating item on the server`, e);
    alert("Ooops, could not update the item on the server :(");
  }
};

const createTodoOnServer = async (todo: ITodoItemData) => {
  const fixedTodo: ServerTodoItem = {
    id: todo.id,
    text: todo.text,
    check: todo.check,
  };

  try {
    await createItemData(fixedTodo);
  } catch (e) {
    console.log(`error creating item on the server`, e);
    alert("Ooops, could not add the item on the server :(");
  }
};

const removeTodoFromServer = async (id: string) => {
  try {
    await removeItemData(id);
  } catch (e) {
    console.log(`error removing item on the server`, e);
    alert("Ooops, could not remove the item on the server :(");
  }
};

export const Main: FC<{}> = () => {
  const [todos, setTodos] = useState<ITodoItemData[]>([]);

  useEffect(() => {
    const initTodos = async () => {
      const items = await getTodosFromServer();
      setTodos(items);
    };

    initTodos();
  }, []);

  const addToDomAndServer = (todo: ITodoItemData): void => {
    const newTodos: Array<ITodoItemData> = [...todos, todo];
    setTodos(newTodos);
    createTodoOnServer(todo);
  };

  const removeFromDomAndServer = (
    removedTodo: ITodoItemData,
    updateServer: boolean
  ): void => {
    setTodos(todos.filter((todo) => todo.id !== removedTodo.id));

    if (updateServer) {
      removeTodoFromServer(removedTodo.id);
    }
  };

  const updateDomAndServer = (
    updatedTodo: ITodoItemData,
    updateServer: boolean
  ): void => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );

    if (updateServer) {
      updateTodoOnServer(updatedTodo);
    }
  };

  return (
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
  );
};
