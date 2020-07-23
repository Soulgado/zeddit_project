import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createAccount, resetUserFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  errors: state.currentUser.formErrors,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (formData) => dispatch(createAccount(formData)),
  resetErrors: () => dispatch(resetUserFormErrors()),
});

// use Formik for forms?

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confPassword: "",
      errors: undefined,
    };
  }

  formErrorsCheck(state) {
    if (state.username === "") {
      return "Username field must not be empty";
    } else if (state.username.length < 3) {
      return "Username must not be less than 3 characters long";
    } else if (state.username.length > 60) {
      return "Username must not be more than 60 characters long";
    } else if (state.email === "") {
      return "Email field must not be empty";
    } else if (state.password === "") {
      return "Password field must not be empty";
    } else if (state.password.length < 5) {
      return "Password must not be less than 5 characters long";
    } else if (state.password.length > 60) {
      return "Password must not be more than 60 characters long";
    } else if (state.password !== state.confPassword) {
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
        errors: errors,
      });
      return;
    }
    const { username, password, email } = this.state;
    let formData = {
      username,
      password,
      email,
    };
    this.props.signUp(formData);
    this.props.resetErrors();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      errors: undefined,
    });
    if (this.props.errors) {
      this.props.resetErrors();
    }
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    const { username, password, email, confPassword, errors } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit}>
        <p className="form-title">Sign Up</p>
        <div className="form-element">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="conf-password">Confirm Password:</label>
          <input
            id="confPassword"
            type="password"
            value={confPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-errors">
          {errors && <p>{errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button sign-up-button" type="submit">
          Create Account
        </button>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  errors: PropTypes.string,
  signUp: PropTypes.func,
  resetErrors: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
