import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, resetUserFormErrors } from "../../redux/actionCreators";
import { withLogging } from "../withLogging";

const mapStateToProps = (state) => ({
  loggedIn: state.currentUser.loggedIn,
  errors: state.currentUser.formErrors,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (formData) => dispatch(login(formData)),
  resetErrors: () => dispatch(resetUserFormErrors()),
});

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: undefined,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      errors: undefined,
    });
    if (this.props.errors) {
      this.props.resetErrors();
    }
  };

  formErrorsCheck(state) {
    if (state.username === "") {
      return "Username field must not be empty";
    } else if (state.password === "") {
      return "Password field must not be empty";
    } else {
      return;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.formErrorsCheck(this.state);
    if (errors) {
      this.setState({
        errors: errors,
      });
      return;
    }
    const { username, password } = this.state;
    let formData = {
      username,
      password,
    };
    this.props.signIn(formData);
    this.props.resetErrors();
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    const { username, password, errors } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit}>
        <p className="form-title">Sign In</p>
        <p className="redirect-message">{this.props.location.state.message ? this.props.location.state.message : ""}</p>
        <div className="form-element">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-element">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-errors">
          {errors && <p>{errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button sign-in-button" type="submit">
          Sign In
        </button>
      </form>
    );
  }
}

SignInForm.propTypes = {
  loggedIn: PropTypes.bool,
  errors: PropTypes.string,
  signIn: PropTypes.func,
  resetErrors: PropTypes.func,
}

// if already logged in - redirect to main page
const ConnectedSignInForm = withLogging(SignInForm, "/");

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSignInForm);
