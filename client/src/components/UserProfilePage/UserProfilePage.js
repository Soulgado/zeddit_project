import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UsernameEditForm from "../UsernameEditForm/UsernameEditForm";
import PasswordEditForm from "../PasswordEditForm/PasswordEditForm";
import EmailEditForm from "../EmailEditForm/EmailEditForm";

// take user from redux store?

export class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFormActive: false,
      passwordFormActive: false,
      emailFormActive: false,
    };

    this.toggleUsernameForm = this.toggleUsernameForm.bind(this);
    this.togglePasswordForm = this.togglePasswordForm.bind(this);
    this.toggleEmailForm = this.toggleEmailForm.bind(this);
  }

  toggleUsernameForm() {
    if (this.state.emailFormActive) {
      this.setState({
        emailFormActive: false
      });
    }
    if (this.state.passwordFormActive) {
      this.setState({
        passwordFormActive: false
      });
    }
    this.setState({
      usernameFormActive: !this.state.usernameFormActive,
    });
  }

  togglePasswordForm() {
    if (this.state.usernameFormActive) {
      this.setState({
        usernameFormActive: false
      });
    }
    if (this.state.emailFormActive) {
      this.setState({
        emailFormActive: false
      });
    }
    this.setState({
      passwordFormActive: !this.state.passwordFormActive,
    });
  }

  toggleEmailForm() {
    if (this.state.usernameFormActive) {
      this.setState({
        usernameFormActive: false
      });
    }
    if (this.state.passwordFormACtive) {
      this.setState({
        passwordFormActive: false
      });
    }
    this.setState({
      emailFormActive: !this.state.emailFormActive,
    });
  }

  // ToDo: close all other forms when one form is opened

  render() {
    const {usernameFormActive, passwordFormActive, emailFormActive} = this.state;
    return (
      <>
        <h2>Account settings</h2>
        <div className="user-settings-elem-wrapper">
          <div id="user-settings-username" className="user-settings-elem ">
            <p>Current username: {this.props.user.username}</p>
            <button type="button" onClick={this.toggleUsernameForm}>
              {usernameFormActive ? "Close" : "Change"}
            </button>
          </div>
          {this.state.usernameFormActive && <UsernameEditForm />}
        </div>
        <div className="user-settings-elem-wrapper">
          <div id="user-settings-email" className="user-settings-elem">
            <p>Currrent email address: {this.props.user.email}</p>
            <button type="button" onClick={this.toggleEmailForm}>
              {emailFormActive ? "Close" : "Change"}
            </button>
          </div>
          {this.state.emailFormActive && <EmailEditForm />}
        </div>
        <div className="user-settings-elem-wrapper">
          <div id="user-settings-password" className="user-settings-elem">
            <p>Password</p>
            <button type="button" onClick={this.togglePasswordForm}>
              {passwordFormActive ? "Close" : "Change"}
            </button>
          </div>
          {this.state.passwordFormActive && <PasswordEditForm />}
        </div>
        <div>
          <Link to={`/delete_account`}>
            <button className="delete-button" type="button">
              Delete account
            </button>
          </Link>
        </div>
      </>
    );
  }
}

UserProfilePage.propTypes = {
  user: PropTypes.object
}

export default UserProfilePage;
