import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  login,
  resetUserFormErrors
} from '../../redux/actionCreators';
import { withLogging } from '../withLogging';

const mapStateToProps = state => ({
  loggedIn: state.currentUser.loggedIn,
  errors: state.currentUser.formErrors
})

const mapDispatchToProps = dispatch => ({
  signIn: (formData) => dispatch(login(formData)),
  resetErrors: () => dispatch(resetUserFormErrors())
})

function SignInForm(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || password === "") return;
    let formData = {
      username: name,
      password: password
    }
    props.signIn(formData);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p className='form-title'>Sign In</p>
      <div className='form-element'>
        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className='form-element'>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className='form-errors'>
          {props.errors &&
            <p>{props.errors}</p>}
      </div> 
      <button className='form-button sign-in-button' type='submit'>Sign In</button>
    </form>
  )
}

// check for logged in state
const connectedComp = withLogging(SignInForm, '/');

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectedComp);