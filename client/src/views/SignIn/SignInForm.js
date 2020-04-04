import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  signIn: (user) => dispatch(login(user))
})

function SignInForm(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || password === "") return;
    let formData = {
      username: name,
      password: password
    }
    fetch('/api/users/signin', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res =>  {
      if (res.result === 'success') {
        props.signIn(res.user);
      }
      console.log(res);
    });
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