import { FC } from "react";

interface ButtonProps {
  icon: string;
  additionalClasses?: string;
  onClick: React.MouseEventHandler;
  dataHook: string;
}

export const Button: FC<ButtonProps> = ({ icon, additionalClasses, onClick, dataHook }) => {
  return (
    <div
      className={`btn ${additionalClasses}`}
      onClick={onClick}
      data-hook={dataHook}
    >
      <span className="material-icons md-36">{icon}</span>
    </div>
  );
};
