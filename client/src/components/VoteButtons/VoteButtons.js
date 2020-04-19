import React from 'react';
import { connect } from 'react-redux';
import { votePost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  votePost: (post, user, rating) => dispatch(votePost(post.id, user, rating)) 
});

function VoteButtons(props) {
  function onUpvote() {
    if (!props.loggedIn) return;
    props.votePost(props.post, props.user, 1);
  }

  function onDownvote() {
    if (!props.loggedIn) return;
    props.votePost(props.post, props.user, -1);
  }

  return (
    <div className='post-vote-wrapper'>
      <div className='upvote-wrapper'>
        <div
          className={`vote-button upvote-button ${props.post.rating === 1 ? 'upvote-active' : ''}`}
          onClick={onUpvote}></div>
        <span>{props.post.upvotes}</span>
      </div>
      <div className='post-rating'>
        {props.post.upvotes - props.post.downvotes}
      </div>
      <div className='downvote-wrapper'>
        <div
          className={`vote-button downvote-button ${props.post.rating === -1 ? 'downvote-active' : ''}`}
          onClick={onDownvote}></div>
        <span>{props.post.downvotes}</span>
      </div>
    </div>
    
    
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteButtons);