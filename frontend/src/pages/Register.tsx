import { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { LoginResponse } from "./Login";
import { ApiError, post } from "../services/apiService";
import "./Register.scss";

const Register = () => {
  let history = useHistory();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [userError, setUserError] = useState<undefined | string>();
  const [passwordError, setPasswordError] = useState<undefined | string>();

  const postUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!username || password.length < 8) {
      setErrorMessage("Username and password are required.");
      return;
    }
    const user = {
      username,
      password,
    };
    try {
      const postNewUser = await post("/register", user, false);
      if (!postNewUser.response.ok) {
        throw new Error((postNewUser.parsedBody as ApiError).message);
      }
      const token = (postNewUser.parsedBody as LoginResponse).token;
      if (token) {
        localStorage.setItem("token", token);
        history.push("/");
      }
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
      <p className="form-title">Registration</p>
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
      <Button title="SIGN UP" onClick={postUser} type="submit" />
    </form>
  );
};

export default Register;
