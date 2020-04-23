import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import CommentCreateForm from '../CommentCreate/CommentCreate';
import Comment from '../Comment/Comment';
import VoteButtons from '../VoteButtons/VoteButtons';
import CommentsList from '../CommentsList/CommentsList';
import { getPost } from '../../redux/actionCreators';
import '../../styles/postPage.sass';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  posts: state.post.posts,
  loggedIn: state.currentUser.loggedIn
});

const mapDispatchToProps = dispatch => ({
  getPost: (post, user) => dispatch(getPost(post, user))
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
      props.getPost(post_id, props.user); 
    } else {
      setPost(currPost);
    }
  }, [props.posts, props, post_id, post_title]);


  return (
    <div className='post-page-wrapper'>
      <VoteButtons className='post-page-vote' post={thisPost} />
      <div className='post-general-wrapper'>
        <h2>{thisPost.title}</h2>
        <div className='post-info'>
          <p>
            {thisPost.updated 
              ? 'Updated '
              : 'Posted '
            }  
            by {thisPost.username} on {thisPost.creation_date}</p>
        </div>
        <div className='post-content'>
          <p>{thisPost.content}</p>
        </div>
        {props.loggedIn && thisPost.username === props.user.username 
          ? <Link to={{
              pathname: '/edit_post',
              state: {
                post: thisPost
              }
            }}>
              <button type='button'>Edit post</button>
            </Link>
          : null}
        {props.loggedIn
          ? <CommentCreateForm post={thisPost.id} />
          : null}
        <div className='post-comments'>
          <p>Comments:</p>
            {!thisPost.comments
              ? <span>No comment yet.</span>
              : <CommentsList comments={thisPost.comments} />
              }
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);