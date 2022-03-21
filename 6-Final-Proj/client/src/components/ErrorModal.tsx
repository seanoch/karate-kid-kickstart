import { FC } from "react";
import ReactDOM from "react-dom";
import "../../styles/errors.css";
import { Button } from "./Button";

export interface ErrorMessage {
    title: string;
    message: string;
}

interface IErrorModal {
  error: ErrorMessage;
  onConfirm: React.MouseEventHandler;
}

const Backdrop: FC<{ onConfirm: React.MouseEventHandler }> = ({
  onConfirm,
}) => {
  return <div className="backdrop" onClick={onConfirm}></div>;
};

const ModalOverlay: FC<IErrorModal> = ({ error, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <h2>{error.title}</h2>
        <Button icon="&#xe14c;" onClick={onConfirm}></Button>
      </div>
      <div className="modal-content">
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export const ErrorModal: FC<IErrorModal> = ({ error, onConfirm }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm}></Backdrop>,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay error={error} onConfirm={onConfirm}></ModalOverlay>,
        document.getElementById("modal-root") as HTMLElement
      )}
    </>
  );
};
