import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({

});

// use Formik for forms

function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || password === "") return;
    let response = sendData();
    if (response.result === 'success') {
      history.goBack();
    }
  }

  function sendData() {
    let formData = {
      username: name,
      password: password
    }
    fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res =>  {
      console.log(res);
      return res;
    });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
    </form>
  )
}

export default SignUpForm;