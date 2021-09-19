import { FC, SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input } from "../../../common/components";
import { Button } from "../../../common/components";
import { ApiError, post } from "../../../common/services/apiService";
import "./RegisterForm.scss";

export interface RegisterFormProps {}
const RegisterForm: FC<RegisterFormProps> = () => {
  let history = useHistory();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [kingdom, setKingdom] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [userError, setUserError] = useState<undefined | string>();
  const [passwordError, setPasswordError] = useState<undefined | string>();

  const dispatch = useDispatch();

  const postUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!username || password.length < 8) {
      setErrorMessage("Username and password are required.");
      return;
    }
    const user = {
      username,
      password,
      kingdom,
    };
    try {
      const postNewUser = await post("/register", user, false);
      if (!postNewUser.response.ok) {
        throw new Error((postNewUser.parsedBody as ApiError).message);
      }
      history.push("/login");
    } catch (error: any) {
      const errorMessage = error.message || error;
      if (errorMessage.toLowerCase().includes("password")) {
        setPasswordError(errorMessage);
      } else if (errorMessage.toLowerCase().includes("username")) {
        setUserError(errorMessage);
      } else {
        setErrorMessage(errorMessage);
      }
    }
  };

  const validateUsername = {
    validate: (input: string): boolean => !!input,
    error: userError || "Username is required.",
  };
  const validatePassword = {
    validate: (input: string): boolean => input.length > 7,
    error: passwordError || "Password must be at least 8 characters.",
  };

  return (
    <form className="form" onSubmit={postUser}>
      <p className="error-message">{errorMessage}</p>
      <Input
        type="text"
        onChange={setUsername}
        validation={validateUsername}
        placeholder="Username"
        defaultError={userError}
      />
      <Input
        type="password"
        onChange={setPassword}
        validation={validatePassword}
        placeholder="Password"
        defaultError={passwordError}
      />
      <Input type="text" onChange={setKingdom} placeholder="Kingdom" />
      <Button title="SIGN UP" onClick={postUser} type="submit" />
    </form>
  );
};

export default RegisterForm;
