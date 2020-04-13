import React, { useState } from 'react';
import CommentCreateForm from '../CommentCreate/CommentCreate';

function Comment(props) {
  const [replyActive, setReplyActive] = useState();

  // add rendering all child comments

  return (
    <div className='comment-body'>
      <div> 
        <span>{props.comment.author} - posted {props.comment.date}</span>
      </div>
      <p>{props.comment.content}</p>
      <div className='comment-buttons'>
        <button
          type='button'
          onClick={setReplyActive(!replyActive)}
        >Reply
        </button>
      </div>
      {replyActive && <CommentCreateForm parent={props.comment._id} />}
    </div>
  )
}

export default Comment;