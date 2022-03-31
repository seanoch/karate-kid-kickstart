import { FC } from "react";
import "../style_jss";

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="header">
      <label className="logo">{title}</label>
    </div>
  );
};
