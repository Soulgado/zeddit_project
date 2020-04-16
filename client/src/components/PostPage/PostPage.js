import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentCreateForm from '../CommentCreate/CommentCreate';
import Comment from '../Comment/Comment';
import { getPost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  getPost: (post, subzeddit) => dispatch(getPost(post, subzeddit))
});

function PostPage(props) {
  // should fetch the post and all? first level comments
  // specific component for comment body
  // comments and post don't show on the first load
  const { post, title } = useParams();  // title of the post
  const [ thisPost, setPost] = useState('');

  useEffect(() => {
    let currPost;
    if (props.posts.length !== 0) {
      currPost = props.posts.find(value => value.title === post);
    }
    if (!currPost) {
      props.getPost(post, title);
    } else {
      setPost(currPost);
    }
  }, [props.posts, props, post, title]);

  function handleUpvote() {
    if (!props.loggedIn) return;
    props.ratePost(thisPost, props.user, 1);
  }

  function handleDownvote() {
    if (!props.loggedIn) return;
    props.ratePost(thisPost, props.user, -1);
  }

  return (
    <div className='post-page-wrapper'>
      <h1>{thisPost.title}</h1>
      <p>{thisPost.content}</p>
      <span>Upvotes: {thisPost.upvotes}</span>
      <span>Downvotes: {thisPost.downvotes}</span>
      <button type='button' id='upvote-button' onClick={handleUpvote}>Upvote</button>
      <button type='button' id='downvote-button' onClick={handleDownvote}>Downvote</button>
      {props.loggedIn
        ? <CommentCreateForm post={thisPost}/>
        : ''}
      <div className='post-comments'>
        <ul>
          {!thisPost.comments
            ? <span>No comment yet.</span>
            : thisPost.comments.map(comment => {
              return <li>{<Comment comment={comment} />}</li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);