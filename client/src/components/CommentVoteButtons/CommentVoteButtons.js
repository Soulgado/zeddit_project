import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { voteComment } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  voteComment: (comment, user, rating) =>
    dispatch(voteComment(comment.id, user.id, rating)),
});

export function CommentVoteButtons(props) {
  const [user_rating, setRating] = useState(props.comment.rating);
  const [upvotes, setUpvotes] = useState(props.comment.upvotes);
  const [downvotes, setDownvotes] = useState(props.comment.downvotes);

  useEffect(() => {
    setRating(props.comment.rating);
    setUpvotes(props.comment.upvotes);
    setDownvotes(props.comment.downvotes);
  }, [props]);

  function onUpvote() {
    if (!props.loggedIn) return;  // redirect to log in page?
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
    props.voteComment(props.comment.id, props.user.id, 1);
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
      setDownvotes(downvotes + 1);
    }
    // doesn't fetch new rating on click, just changes local state values
    props.voteComment(props.comment.id, props.user.id, -1);
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

CommentVoteButtons.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  voteComment: PropTypes.func,
  comment: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentVoteButtons);
