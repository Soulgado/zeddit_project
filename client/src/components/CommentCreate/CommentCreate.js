import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.currentUser.user
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    postComment: (comment) => dispatch(
      postComment(
        stateProps.user.id,
        comment,
        ownProps.post))
  }
}

// doesn't fetch created content until page reload 
function CommentCreateForm(props) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postComment(comment);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='comment'>Comment:</label>
      <input
        id='comment'
        type='text'
        value={comment}
        onChange={e => setComment(e.target.value)} />
      <button type='submit'>Post comment</button>
    </form>
  )
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(CommentCreateForm);