import { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { ApiError, post } from "../services/apiService";

import "./CommentForm.scss";

const CommentForm = () => {
  let history = useHistory();
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [commentError, setCommentError] = useState<undefined | string>();

  const postComment = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!comment || comment.length < 10) {
      setErrorMessage("Comment has to be at least 10 characters long.");
      return;
    }
    const message = {
      comment,
    };
    try {
      const postNewComment = await post("/comment", message, true);
      if (!postNewComment.response.ok) {
        throw new Error((postNewComment.parsedBody as ApiError).message);
      } else {
        history.push("/messagewall");
      }
    } catch (error: any) {
      const errorMessage = error.message || error;
      if (errorMessage.toLowerCase().includes("comment")) {
        setCommentError(errorMessage);
      } else {
        setErrorMessage(errorMessage);
      }
    }
  };

  const validateComment = {
    validate: (input: string): boolean => input.length > 9,
    error: commentError || "Comment must be at least 10 characters.",
  };

  return (
    <form className="comment-form" onSubmit={postComment}>
      <Button title="Send comment" onClick={postComment} type="submit" />
      <Input
        type="textarea"
        onChange={setComment}
        validation={validateComment}
        placeholder="Comment text"
        defaultError={commentError}
      />
    </form>
  );
};

export default CommentForm;
