import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSubzeddit } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.currentUser.user
})

const mapDispatchToProps = dispatch => ({
  createSubzeddit: (formData) => dispatch(createSubzeddit(formData)),
})

function SubzedditCreateForm(props) {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.createSubzeddit({ title, user: props.user });
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='form-title'>Create New Subzeddit</p>
      <div className='form-element'>
        <label htmlFor='title'>Title:</label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <button className='form-button' type='submit'>Create Subzeddit</button>
    </form>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreateForm);