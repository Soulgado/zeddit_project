import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import CommentCreateForm from '../CommentCreate/CommentCreate';
import VoteButtons from '../VoteButtons/VoteButtons';
import CommentsList from '../CommentsList/CommentsList';
import { getPost } from '../../redux/actionCreators';
import '../../styles/postPage.sass';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  post: state.post.post,
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

  useEffect(() => {
    props.getPost(post_id, props.user); 
  }, [post_id, post_title]);

  return (
    <div className='post-page-wrapper'>
      <VoteButtons className='post-page-vote' post={props.post} />
      <div className='post-general-wrapper'>
        <h2>{props.post.title}</h2>
        <div className='post-info'>
          <p>
            {props.post.updated 
              ? 'Updated '
              : 'Posted '
            }  
            by {props.post.username} on {props.post.creation_date}</p>
          <p>{props.post.comments_num} comments</p>
        </div>
        <div className='post-content'>
          {props.post.type === 'image'
            ? <img src={`/static/images/${props.post.filename}`} alt='post content'></img>
            : <p>{props.post.content}</p>}
        </div>
        {props.loggedIn && props.post.username === props.user.username 
          ? <Link to={{
              pathname: '/edit_post',
              state: {
                post: props.post
              }
            }}>
              <button type='button'>Edit post</button>
            </Link>
          : null}
        {props.loggedIn
          ? <CommentCreateForm post={props.post.id} />
          : null}
        <div className='post-comments'>
          <p>Comments:</p>
            {!props.post.comments
              ? <span>No comment yet.</span>
              : <CommentsList comments={props.post.comments} />
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