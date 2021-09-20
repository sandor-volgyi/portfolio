import { ChangeEvent, FC, useEffect, useState } from "react";
import "./Input.scss";

interface InputProps {
  type?: string;
  placeholder?: string;
  validation?: {
    validate: (text: string) => boolean;
    error: string;
  };
  onChange?: (text: string) => void;
  defaultError?: string | undefined;
}

const Input: FC<InputProps> = ({
  type,
  placeholder,
  validation,
  onChange,
  defaultError,
}) => {
  const [text, setText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<undefined | string>();

  useEffect(() => {
    setErrorMessage(defaultError);
  }, [defaultError]);

  const validate = (input: string): void => {
    if (!validation) return;
    setErrorMessage(validation?.validate(input) ? undefined : validation.error);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    validate(e.target.value);
    setText(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="user-input">
      {type === "textarea" ? (
        <textarea
          onChange={handleChange}
          placeholder={placeholder}
          value={text}
        />
      ) : (
        <input
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
          value={text}
        />
      )}
      {errorMessage && <p className="input-error">{errorMessage}</p>}
    </div>
  );
};

export default Input;
