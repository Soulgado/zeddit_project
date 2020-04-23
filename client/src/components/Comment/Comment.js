import React from 'react';

const Comment = (props) => {

  // add rendering all child comments

  return (
    <div
    style={{marginLeft: `${props.comment.level*20}px`}}
    className='comment-body'>
      <div className='comment-info'> 
        <span>{props.comment.username} - posted {props.comment.creation_time}</span>
      </div>
      <div className='comment-content'>
        <p>{props.comment.content}</p>
      </div>
      <div className='comment-buttons'>
        <button
          type='button'
        >Reply
        </button>
      </div>
    </div>
  )
}

export default Comment;