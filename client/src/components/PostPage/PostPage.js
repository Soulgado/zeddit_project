import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentCreateForm from '../CommentCreate/CommentCreate';
import Comment from '../Comment/Comment';
import VoteButtons from '../VoteButtons/VoteButtons';
import { getPost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  getPost: (post) => dispatch(getPost(post))
});

function PostPage(props) {
  // should fetch the post and all? first level comments
  // specific component for comment body
  // comments and post don't show on the first load
  const { post_id, post_title } = useParams();  // title of the post
  const [thisPost, setPost] = useState('');

  useEffect(() => {
    let currPost;
    if (props.posts.length !== 0) {
      currPost = props.posts.find(value => {
        return value.title === post_title && value.id === parseInt(post_id);
      });
    }
    if (!currPost) {
      props.getPost(post_id); 
    } else {
      setPost(currPost);
    }
  }, [props.posts, props, post_id, post_title]);


  return (
    <div className='post-page-wrapper'>
      <VoteButtons post={thisPost} />
      <h1>{thisPost.title}</h1>
      <p>{thisPost.content}</p>
      {props.loggedIn
        ? <CommentCreateForm post={thisPost}/>
        : null}
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