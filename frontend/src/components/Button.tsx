import { FC, SyntheticEvent } from "react";
import "./Button.scss";

type ButtonType = JSX.IntrinsicElements["button"] & {
  title: string;
  type?: string;
  onClick?: (e: SyntheticEvent) => void;
}

const Button: FC<ButtonType> = ({ title, type, onClick}) => {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
