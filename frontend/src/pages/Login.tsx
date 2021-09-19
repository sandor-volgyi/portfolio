import { SyntheticEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import { ApiError, post } from "../services/apiService";

export interface LoginFormProps {}

export interface LoginResponse {
  token: string;
}

const LoginForm = () => {
  let history = useHistory();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [userError, setUserError] = useState<undefined | string>();
  const [passwordError, setPasswordError] = useState<undefined | string>();

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!username || password.length < 8) {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      const loginResponse = await post("/login", { username, password }, false);
      if (!loginResponse.response.ok) {
        throw new Error((loginResponse.parsedBody as ApiError).message);
      }
      const token = (loginResponse.parsedBody as LoginResponse).token;
      localStorage.setItem("token", token);
      if (token) history.push("/");
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
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
    <form className="form" onSubmit={login}>
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
      <p className="error-message">{errorMessage}</p>
      <Button title="LOGIN" type="submit" />
    </form>
  );
};

export default LoginForm;
