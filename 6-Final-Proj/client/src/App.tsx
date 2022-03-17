import { FC } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import "../styles/style.css";

export const App : FC = () => {
  return (
    <div>
      <Header title="My Todos" />
      <Main />
    </div>
  );
}
