import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentCreateForm from '../CommentCreate/CommentCreate';
import Comment from '../Comment/Comment';
import VoteButtons from '../VoteButtons/VoteButtons';
import { getPost } from '../../redux/actionCreators';
import '../../styles/postPage.sass';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  posts: state.post.posts,
  loggedIn: state.currentUser.loggedIn
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
      <VoteButtons className='post-page-vote' post={thisPost} />
      <div className='post-general-wrapper'>
        <h2>{thisPost.title}</h2>
        <div className='post-content'>
          <p>{thisPost.content}</p>
        </div>
        {props.loggedIn
          ? <CommentCreateForm post={thisPost.id} />
          : null}
        <div className='post-comments'>
          <p>Comments:</p>
          <ul>
            {!thisPost.comments
              ? <span>No comment yet.</span>
              : thisPost.comments.map(comment => {
                return <li key={comment.id}>{<Comment comment={comment} />}</li>
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);