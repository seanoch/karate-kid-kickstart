import { FC } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main/Main";
import { AxiosTodoApi } from "./todo_api";
import "../styles/style.css";

export const App: FC = () => {
  const todoApi = new AxiosTodoApi();

  return (
    <div>
      <Header title="My Todos" />
      <Main todoApi={todoApi} />
    </div>
  );
};
