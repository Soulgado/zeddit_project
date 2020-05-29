import React from 'react';
import { connect } from 'react-redux';
import { 
  deleteAccount,
  resetUserFormErrors
} from '../../redux/actionCreators';

const mapStateToProps = state => ({
  errors: state.currentUser.formErrors,
  user: state.currentUser.user,
});

const mapDispatchToProps = dispatch => ({
  deleteAccount: (formData) => dispatch(deleteAccount(formData)),
  resetErrors: () => dispatch(resetUserFormErrors())
});

class UserDeleteFormTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confPassword: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { password, confPassword, username } = this.state;
    if (password !== confPassword) return;
    this.props.deleteAccount({
      username,
      password
    });
    this.props.resetErrors();
  }

  render() {
    const { username, password, confPassword } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-element'>
          <label htmlFor='password'>Username:</label>
          <input
            id='username'
            type='text'
            value={username}
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
          <label htmlFor='confPassword'>Confirm Password:</label>
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
        <button className='form-button' type='submit'>Delete account</button>
      </form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDeleteFormTemplate);