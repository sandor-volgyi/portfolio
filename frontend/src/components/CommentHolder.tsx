import { FC } from "react";
import "./CommentHolder.scss";
import { Comment } from "../pages/MessageWall";

/*
export interface Comment {
  id: number;
  user_id: number;
  user_name: string;
  user_role: string;
  created_on: number;
  edited_on: number | null;
  comment: string;
}
*/

function timeConverter(UNIX_timestamp: number) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  let hour: string = a.getHours().toString();
  hour = parseInt(hour) < 10 ? "0" + hour : hour;
  let min: string = a.getMinutes().toString();
  min = parseInt(min) < 10 ? "0" + min : min;

  const time = year + " " + month + " " + date + " " + hour + ":" + min;
  return time;
}

const CommentHolder: FC<Comment> = (props) => {
  const labelForEdit = props.edited_on ? "Edited on:" : "Added on:";
  const timestampToUse = props.edited_on ? props.edited_on : props.created_on;
  const formattedTime = timeConverter(timestampToUse);

  return (
    <div className="comment" id={"" + props.id}>
      <span className="username">Commenter: {props.user_name}</span>
      <div className="manage-links">
        <button className="edit" id={"" + props.id}>
          Edit comment
        </button>
        <button className="delete" id={"" + props.id}>
          Delete comment
        </button>
      </div>
      <p className="comment-text">{props.comment}</p>
      <span className="comment-date">{labelForEdit + " " + formattedTime}</span>
    </div>
  );
};

export default CommentHolder;
//onClick={alert("hali")}
