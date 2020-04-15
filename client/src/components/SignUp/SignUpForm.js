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
        <label htmlFor='email'>E-mail:</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='form-element'>
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className='form-element'>
        <label htmlFor='conf-password'>Confirm Password:</label>
        <input
          id='conf-password'
          type='password' 
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
          required
        />
      </div>
      <button className='form-button sign-up-button' type='submit'>Create Account</button>
    </form>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);