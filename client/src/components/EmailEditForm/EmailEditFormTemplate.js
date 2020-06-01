import React from 'react';
import { connect } from 'react-redux'; 
import { 
  editEmail,
  resetUserFormErrors
} from '../../redux/actionCreators';

const mapStateToProps = state => ({
  errors: state.currentUser.formErrors,
  user: state.currentUser.user,
});

const mapDispatchToProps = dispatch => ({
  editEmail: (formData) => dispatch(editEmail(formData)),
  resetErrors: () => dispatch(resetUserFormErrors())
});

class PasswordEditFormTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newEmail: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { password, newEmail } = this.state;
    this.props.editEmail({
      username: this.props.user.username,
      password,
      new_password: newEmail
    });
    this.props.resetErrors();
  }

  render() {
    const { password, newEmail } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
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
          <label htmlFor='newEmail'>New Email:</label>
          <input
            id='newEmail'
            type='email' 
            value={newEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-errors'>
          {this.props.errors &&
            <p>{this.props.errors}</p>}
        </div> 
        <button className='form-button' type='submit'>Change email</button>
      </form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordEditFormTemplate);