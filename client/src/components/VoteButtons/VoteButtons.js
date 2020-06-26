import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { votePost } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  votePost: (post, user, rating) => dispatch(votePost(post, user, rating)),
});

export function VoteButtons(props) {
  const [user_rating, setRating] = useState(props.post.rating);
  const [upvotes, setUpvotes] = useState(props.post.upvotes);
  const [downvotes, setDownvotes] = useState(props.post.downvotes);

  useEffect(() => {
    setRating(props.post.rating);
    setUpvotes(props.post.upvotes);
    setDownvotes(props.post.downvotes);
  }, [props]);

  function onUpvote() {
    if (!props.loggedIn) return;
    if (user_rating === 1) {
      setRating(0);
      setUpvotes(upvotes - 1);
    } else if (user_rating === -1) {
      setDownvotes(downvotes - 1);
      setRating(1);
      setUpvotes(upvotes + 1);
    } else {
      setRating(1);
      setUpvotes(upvotes + 1);
    }
    props.votePost(props.post.id, props.user.id, 1); 
  }

  function onDownvote() {
    if (!props.loggedIn) return;
    if (user_rating === -1) {
      setRating(0);
      setDownvotes(downvotes - 1);
    } else if (user_rating === 1) {
      setUpvotes(upvotes - 1);
      setRating(-1);
      setDownvotes(downvotes + 1);
    } else {
      setRating(-1);
      setDownvotes(downvotes - 1);
    }
    props.votePost(props.post.id, props.user.id, -1);
  }

  return (
    <div className="post-vote-wrapper">
      <div className="upvote-wrapper">
        <div
          className={`vote-button upvote-button ${
            user_rating === 1 ? "upvote-active" : ""
          }`}
          onClick={onUpvote}
        >
        </div>
        <span>{upvotes}</span>
      </div>
      <div className="post-rating">{upvotes - downvotes}</div>
      <div className="downvote-wrapper">
        <div
          className={`vote-button downvote-button ${
            user_rating === -1 ? "downvote-active" : ""
          }`}
          onClick={onDownvote}
        ></div>
        <span>{downvotes}</span>
      </div>
    </div>
  );
}

VoteButtons.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  votePost: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteButtons);
