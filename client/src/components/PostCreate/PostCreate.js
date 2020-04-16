import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNewPost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...ownProps,
    createPost: (formData) => dispatch(createNewPost(stateProps.user, formData, ownProps.subzeddit.title))
  }
}

function PostCreateForm(props) {
  // accept different types of content
  // need subzeddit too
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.createPost({ title, content });
  }

  return (
  <form onSubmit={e => handleSubmit(e)}>
    <p className='form-title'>Create new Post</p>
    <div className='form-element'>
      <label htmlFor='title'>Post title:</label>
      <input
        id='title'
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)} />
    </div>
    <div className='form-element'>
      <label htmlFor='content'>Post content:</label>
      <input
        id='content'
        type='text'
        value={content}
        onChange={e => setContent(e.target.value)} />
    </div>
    <button className='form-button' type='submit'>Create Post</button> 
  </form>
  )
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(PostCreateForm);