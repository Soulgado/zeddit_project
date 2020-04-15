import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  signIn: (formData) => dispatch(login(formData))
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
      <button className='form-button sign-in-button' type='submit'>Sign In</button>
    </form>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);