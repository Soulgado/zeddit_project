import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createNewPost } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user
});

// change to dispatch props
const mapDispatchToProps = dispatch => ({
  createPost: (user, formData) => dispatch(createNewPost(user, formData))
})

function PostCreateForm(props) {
  // accept different types of content
  // need subzeddit too
  const { state } = useLocation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subzeddit, setSubzeddit] = useState(state.subzeddit || '');
  const [subzedditsTitles, setTitles] = useState(props.subzeddits);
  const [dropdownActive, setDropdown] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    props.createPost(props.user.id, { title, content, subzeddit });
  }

  function matchedSubzeddits(title) {
    return props.subzeddits.filter(subzeddit => {
      const regex = new RegExp(title, 'gi')
      return subzeddit.title.match(regex);
    })
  }

  const handleSubzedditChange = event => {
    const matchedTitles = matchedSubzeddits(event.target.value);
    setTitles(matchedTitles);
    setSubzeddit(event.target.value);
  }

  const handleSubzedditFocus = () => {
    setDropdown(true);
  }

  const handleSubzedditBlur = () => {
    setDropdown(false);
  }

  function renderMatches() {
    // specific component is required
    return (
      <ul className='form-subzeddits-dropdown'>
        {subzedditsTitles.map(subzeddit => {
          return (
            <li key={subzeddit.title}>
              {subzeddit.title}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
  <form onSubmit={handleSubmit}>
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
    <div className='form-element'>
      <label htmlFor='subzeddit'>Submit post to subzeddit:</label>
      <input
        id='subzeddit'
        type='text'
        value={subzeddit}
        onChange={handleSubzedditChange} 
        onFocus={handleSubzedditFocus}
        onBlur={handleSubzedditBlur}/>
      {dropdownActive
      ? renderMatches()
      : null}
    </div>
    <button className='form-button' type='submit'>Create Post</button> 
  </form>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCreateForm);