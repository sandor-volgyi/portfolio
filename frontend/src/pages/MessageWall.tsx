import "./MessageWall.scss";
import { useEffect, useState } from "react";
import { get, ApiError } from "../services/apiService";

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
  const [notification, setNotification] = useState("");
  const emptyComments: Comment[] = [];
  const [comments, setComments] = useState(emptyComments);

  useEffect(() => {
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
    getAllComments();
  }, []);

  return (
    <div id="message-wall">{comments && comments.map((x) => x.comment)}</div>
  );
};

export default MessageWall;
