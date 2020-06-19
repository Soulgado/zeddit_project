import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editPassword, resetUserFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  errors: state.currentUser.formErrors,
  user: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  editPassword: (formData) => dispatch(editPassword(formData)),
  resetErrors: () => dispatch(resetUserFormErrors()),
});

export class PasswordEditFormTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confPassword: "",
      newPassword: "",
      errors: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      errors: undefined,
    });
    if(this.props.errors) {
      this.props.resetErrors();
    }
  };

  formErrorsCheck(state) {
    if (state.password === "") {
      return "Old password field must not be empty";
    } else if (state.newPassword === "") {
      return "New password field must not be empty";
    } else if (state.newPassword.length < 5) {
      return "New password must not be less than 5 characters long";
    } else if (state.newPassword.length > 60) {
      return "New password must not be more than 60 characters long";
    } else if (state.newPassword !== state.confPassword) {
      return "Passwords does not match";
    } else {
      return;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.formErrorsCheck(this.state);
    if (errors) {
      this.setState({
        errors: errors
      });
      return;
    }
    const { password, newPassword } = this.state;
    this.props.editPassword({
      user: this.props.user.id,   // change to id
      password,
      new_password: newPassword,
    });
    this.props.resetErrors();
  };

  render() {
    const { password, confPassword, newPassword, errors } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="password">Current Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-element">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-element">
          <label htmlFor="confPassword">Confirm New Password:</label>
          <input
            id="confPassword"
            type="password"
            value={confPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-errors">
          {errors && <p>{errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button" type="submit">
          Change password
        </button>
      </form>
    );
  }
}

PasswordEditFormTemplate.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.string,
  editPassword: PropTypes.func,
  resetErrors: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordEditFormTemplate);
