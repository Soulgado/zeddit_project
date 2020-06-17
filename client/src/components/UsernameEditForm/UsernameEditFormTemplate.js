import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editUsername, resetUserFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  errors: state.currentUser.formErrors,
  user: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  editUsername: (formData) => dispatch(editUsername(formData)),
  resetErrors: () => dispatch(resetUserFormErrors()),
});

export class UsernameEditFormTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newUsername: "",
      errors: undefined,
    };
  }

  formErrorsCheck(state) {
    if (state.newUsername === "") {
      return "Username field must not be empty";
    } else if (state.newUsername.length < 3) {
      return "Username must not be less than 3 characters long";
    } else if (state.newUsername.length > 60) {
      return "Username must not be more than 60 characters long";
    } else if (state.password === "") {
      return "Password field must not be empty";
    } else {
      return;
    }
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

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.formErrorsCheck(this.state);
    if (errors) {
      this.setState({
        errors: errors,
      });
      return;
    }
    const { password, newUsername } = this.state;
    this.props.editUsername({
      username: this.props.user.username,  // change to id
      password,
      new_username: newUsername,
    });
    this.props.resetErrors();
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    const { password, newUsername, errors } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-element">
          <label htmlFor="newUsername">New Username:</label>
          <input
            id="newUsername"
            type="text"
            value={newUsername}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-errors">
          {errors && <p>{errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button" type="submit">
          Change username
        </button>
      </form>
    );
  }
}

UsernameEditFormTemplate.propTypes = {
  errors: PropTypes.string,
  user: PropTypes.object,
  editUsername: PropTypes.func,
  resetErrors: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameEditFormTemplate);
