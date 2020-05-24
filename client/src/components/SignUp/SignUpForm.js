import React from 'react';
import { connect } from 'react-redux';
import { 
  createAccount,
  resetUserFormErrors
} from '../../redux/actionCreators';

const mapStateToProps = state => ({
  errors: state.currentUser.formErrors
});

const mapDispatchToProps = dispatch => ({
  signUp: (formData) => dispatch(createAccount(formData)),
  resetErrors: () => dispatch(resetUserFormErrors())
});

// use Formik for forms

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confPassword: ''
    }
  }

  handleSubmit = (e) => {
    const { name, password, email, confPassword } = this.state;
    e.preventDefault();
    if (name === "" || password === "" || password !== confPassword) return;
    let formData = {
      username: name,
      password: password,
      email: email
    }
    this.props.signUp(formData);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    const { name, password, email, confPassword } = this.state;
    const {handleSubmit, handleChange} = this;
    return (
      <form onSubmit={handleSubmit}>
        <p className='form-title'>Sign Up</p>
        <div className='form-element'>
          <label htmlFor='username'>Username:</label>
          <input 
            id='name'
            type='text'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-element'>
          <label htmlFor='email'>E-mail:</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-element'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-element'>
          <label htmlFor='conf-password'>Confirm Password:</label>
          <input
            id='confPassword'
            type='password' 
            value={confPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-errors'>
          {this.props.errors &&
            <p>{this.props.errors}</p>}
        </div> 
        <button className='form-button sign-up-button' type='submit'>Create Account</button>
      </form>
    )
  }

  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);