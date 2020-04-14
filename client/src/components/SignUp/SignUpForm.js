import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount } from '../../redux/actionCreators';

const mapDispatchToProps = dispatch => ({
  signUp: (formData) => dispatch(createAccount(formData)) 
});

// use Formik for forms

function SignUpForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || password === "" || password !== confPass) return;
    let formData = {
      username: name,
      password: password,
      email: email
    }
    props.signUp(formData);
    history.goBack();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p className='form-title'>Sign Up</p>
      <label>Username:
        <input 
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}>
        </input>
      </label>
      <label>E-mail:
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
        </input>
      </label>
      <label>Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
        </input>
      </label>
      <label>Confirm Password:
        <input
          type='password' 
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}>
        </input>
      </label>
      <button className='form-button sign-up-button' type='submit'>Create Account</button>
    </form>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);