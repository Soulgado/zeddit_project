import React from 'react';
import { Link } from 'react-router-dom';
import UsernameEditForm from '../UsernameEditForm/UsernameEditForm';
import PasswordEditForm from '../PasswordEditForm/PasswordEditForm';
import EmailEditForm from '../EmailEditForm/EmailEditForm';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFormActive: false,
      passwordFormActive: false,
      emailFormActive: false
    }

    this.toggleUsernameForm = this.toggleUsernameForm.bind(this);
    this.togglePasswordForm = this.togglePasswordForm.bind(this);
    this.toggleEmailForm = this.toggleEmailForm.bind(this);
  }

  toggleUsernameForm() {
    this.setState({
      usernameFormActive: !this.state.usernameFormActive
    });
  }

  togglePasswordForm() {
    this.setState({
      passwordFormActive: !this.state.passwordFormActive
    });
  }

  toggleEmailForm() {
    this.setState({
      emailFormActive: !this.state.emailFormActive
    });
  }

  render() {
    return (
      <>
      <h2>Account settings</h2>
      <div className='user-settings-elem'>
        <p>Current username: {this.props.user.username}</p>
        <button type='button' onClick={this.toggleUsernameForm}>Change</button>
        {this.state.usernameFormActive && <UsernameEditForm />}
      </div>
      <div className='user-settings-elem'>
        <p>Currrent email address: {this.props.user.email}</p>
        <button type='button' onClick={this.toggleEmailForm}>Change</button>
        {this.state.emailFormActive && <EmailEditForm />}
      </div>
      <div className='user-settings-elem'>
        <p>Password</p>
        <button type='button' onClick={this.togglePasswordForm}>Change</button>
        {this.state.passwordFormActive && <PasswordEditForm />}
      </div>
      <div>
        <Link to={`/delete_account`}>
          <button className='delete-button' type='button'>Delete account</button>
        </Link>
      </div>
      </>
  
    )
  }
}

export default UserProfilePage;