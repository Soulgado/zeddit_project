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
      <label>Username
        <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input> 
      </label>
      <label>Password
        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <button type='submit'>Sign In</button>
    </form>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);