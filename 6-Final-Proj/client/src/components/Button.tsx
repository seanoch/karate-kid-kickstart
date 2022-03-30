import { FC } from "react";

interface ButtonProps {
  icon: string;
  className?: string;
  onClick: React.MouseEventHandler;
  dataHook: string;
}

export const Button: FC<ButtonProps> = ({ icon, className, onClick, dataHook }) => {
  return (
    <div
      className={`btn ${className}`}
      onClick={onClick}
      data-hook={dataHook}
    >
      <span className="material-icons md-36">{icon}</span>
    </div>
  );
};
