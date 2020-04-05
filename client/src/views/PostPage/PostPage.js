import React from 'react';
import { connect } from 'react-redux';
import CommentCreateForm from '../CommentCreate/CommentCreate';

function PostPage(props) {
  // should fetch the post and all? first level comments
  // specific component for comment body
  return (
    <div className='post-page-wrapper'>
      <h1>{props.post.title}</h1>
      <p>{props.post.content}</p>
      <CommentCreateForm />
      <div className='post-comments'>
        <ul>
          {!props.post.comments
            ? <span>No comment yet.</span>
            : props.post.comments.map(comment => {
              return <li><p>{comment.content}</p></li>
            })}

        </ul>
      </div>
    </div>
  )
}

export default PostPage;