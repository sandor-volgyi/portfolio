import { FC, SyntheticEvent } from "react";
import "./Button.scss";

interface ButtonType {
  title: string;
  type: "button" | "submit" | "reset";
  onClick?: (e: SyntheticEvent) => void;
}

const Button: FC<ButtonType> = ({ title, type, onClick }) => {
  return (
    <button type={type || "button"} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
