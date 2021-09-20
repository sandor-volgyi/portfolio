import { FC } from "react";
import "./Notification.scss";

interface NoteMessage {
  message: string;
  type: "note" | "error";
}

const Notification: FC<NoteMessage> = ({ message, type }) => {
  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
