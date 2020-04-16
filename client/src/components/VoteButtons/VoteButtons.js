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
        <button className='vote-button upvote-button' type='button' onClick={onUpvote}>&#x2BC5;</button>
        <span>{props.post.upvotes}</span>
      </div>
      <div className='post-rating'>
        {props.post.upvotes - props.post.downvotes}
      </div>
      <div className='downvote-wrapper'>
        <button className='vote-button downvote-button' type='button' onClick={onDownvote}>&#x2BC6;</button>
        <span>{props.post.downvotes}</span>
      </div>
    </div>
    
    
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteButtons);