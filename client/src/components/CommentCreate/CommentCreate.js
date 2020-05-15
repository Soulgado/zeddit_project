import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.currentUser.user
});

const mapDispatchToProps = dispatch => ({
  postComment: (user, comment, post, parent) => dispatch(
    postComment(user, comment, post, parent)
  )
});

function CommentCreateForm(props) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment === '') return; // show error
    props.postComment(
      props.user.id,
      comment,
      props.post,
      props.parent ? props.parent.id : null);
    if (props.handleClick) {
      props.handleClick();
    }
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
  mapDispatchToProps
)(CommentCreateForm);