import React from "react";
import Comment from "../Comment/Comment";

const CommentsList = (props) => {
  return (
    <ul>
      {props.comments.map((comment) => {
        if (comment.child_comments.length !== 0) {
          return (
            <li key={comment.id}>
              <Comment comment={comment} />
              <CommentsList comments={comment.child_comments} />
            </li>
          );
        }
        return (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentsList;
