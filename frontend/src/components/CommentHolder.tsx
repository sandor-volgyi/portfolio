import { FC } from "react";
import { SyntheticEvent } from "react";
import "./CommentHolder.scss";
import { Comment } from "../pages/MessageWall";
import { userCanEdit } from "../services/userService";
import { del } from "../services/apiService";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();
  const labelForEdit = props.edited_on ? "Edited on:" : "Added on:";
  const timestampToUse = props.edited_on ? props.edited_on : props.created_on;
  const formattedTime = timeConverter(timestampToUse);
  const canEdit: boolean = userCanEdit(props.user_role, props.user_id);

  const deleteComment = async (e: SyntheticEvent) => {
    e.preventDefault();
    const id = (e.target as HTMLButtonElement).id;
    if (!id) {
      return;
    }
    const messageId = {
      id,
    };
    const deleteWithId = await del(`/comment/${id}`, messageId, true);
    if (!deleteWithId.response.ok) {
      return;
    } else {
      history.push("/messagewall");
    }
  };

  return (
    <div className="comment" id={"" + props.id}>
      <span className="username">Commenter: {props.user_name}</span>
      <div className="manage-links">
        {canEdit && (
          <button className="edit" id={"" + props.id}>
            Edit comment
          </button>
        )}
        {canEdit && (
          <button className="delete" id={"" + props.id} onClick={deleteComment}>
            Delete comment
          </button>
        )}
      </div>
      <p className="comment-text">{props.comment}</p>
      <span className="comment-date">{labelForEdit + " " + formattedTime}</span>
    </div>
  );
};

export default CommentHolder;
