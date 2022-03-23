import { FC } from "react";

interface IButton {
  icon: string;
  additionalClasses?: Array<string>;
  onClick: React.MouseEventHandler;
  dataHook: string;
}

export const Button: FC<IButton> = ({ icon, additionalClasses, onClick, dataHook }) => {
  return (
    <div
      className={`btn ${additionalClasses ? additionalClasses.join(" ") : ""}`}
      onClick={onClick}
      data-hook={dataHook}
    >
      <span className="material-icons md-36">{icon}</span>
    </div>
  );
};
