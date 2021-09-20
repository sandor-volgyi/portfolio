import { FC } from "react";
import "./MessageWall.scss";
import { UserData } from "../components/Header";

const MessageWall: FC<UserData> = ({ isLoggedIn }) => {
  /*  useEffect(() => {

  }, []);*/

  return <div id="message-wall"></div>;
};

export default MessageWall;
