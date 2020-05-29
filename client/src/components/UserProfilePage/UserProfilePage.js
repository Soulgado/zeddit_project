import React from 'react';
import UsernameEditForm from '../UsernameEditForm/UsernameEditForm';
import PasswordEditForm from '../PasswordEditForm/PasswordEditForm';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFormActive: false,
      passwordFormActive: false
    }

    this.toggleUsernameForm = this.toggleUsernameForm.bind(this);
    this.togglePasswordForm = this.togglePasswordForm.bind(this);
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
        <button type='button'>Change</button>
      </div>
      <div className='user-settings-elem'>
        <p>Password</p>
        <button type='button' onClick={this.togglePasswordForm}>Change</button>
        {this.state.passwordFormActive && <PasswordEditForm />}
      </div>
      <div>
        <button type='button'>Delete account</button>
      </div>
      </>
  
    )
  }
}

export default UserProfilePage;