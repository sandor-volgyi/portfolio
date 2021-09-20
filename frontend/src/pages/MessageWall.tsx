import "./MessageWall.scss";
import { useEffect, useState } from "react";
import { get, ApiError } from "../services/apiService";
import Notification from "../components/Notification";
import CommentHolder from "../components/CommentHolder";

export interface Comment {
  id: number;
  user_id: number;
  user_name: string;
  user_role: string;
  created_on: number;
  edited_on: number | null;
  comment: string;
}

interface CommentResponse {
  comments: Comment[];
}

const MessageWall = () => {
  const isUserLoggedIn = localStorage.getItem("token") != null;
  const [notification, setNotification] = useState("");
  const emptyComments: Comment[] = [];
  const [comments, setComments] = useState(emptyComments);

  async function getAllComments() {
    try {
      const commentList = await get("/comment");
      if (!commentList.response.ok) {
        throw new Error((commentList.parsedBody as ApiError).message);
      }
      setComments((commentList.parsedBody as CommentResponse).comments);
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (errorMessage.toLowerCase().includes("found")) {
        setNotification("Comments are not available at the moment.");
      } else {
        setNotification("Unexpected error happened. Please try again later.");
      }
    }
  }

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="message-wall">
      {!isUserLoggedIn && (
        <Notification
          type="note"
          message={"Please register / log in to leave a comment."}
        />
      )}

      {notification && <Notification type="error" message={notification} />}
      {comments &&
        comments.map((x, i) => {
          return <CommentHolder {...x} key={i} />;
        })}
    </div>
  );
};

export default MessageWall;
