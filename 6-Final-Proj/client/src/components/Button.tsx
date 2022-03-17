import { FC } from "react";

interface IButton {
  icon: string;
  additionalClasses?: Array<string>;
  onClick: React.MouseEventHandler;
}

export const Button: FC<IButton> = ({ icon, additionalClasses, onClick }) => {
  return (
    <div
      className={`btn ${additionalClasses ? additionalClasses.join(" ") : ""}`}
      onClick={onClick}
    >
      <span className="material-icons md-36">{icon}</span>
    </div>
  );
};
