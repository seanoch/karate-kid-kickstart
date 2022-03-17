import { FC } from "react";
import "../style_jss";

interface IHeader {
  title: string;
}

export const Header: FC<IHeader> = ({ title }) => {
  return (
    <div className="header">
      <label className="logo">{title}</label>
    </div>
  );
};
