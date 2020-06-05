import React from "react";
import { connect } from "react-redux";
import { editUsername, resetUserFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  errors: state.currentUser.formErrors,
  user: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  editUsername: (formData) => dispatch(editUsername(formData)),
  resetErrors: () => dispatch(resetUserFormErrors()),
});

class UsernameEditFormTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newUsername: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    this.props.resetErrors();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, newUsername } = this.state;
    this.props.editUsername({
      username: this.props.user.username,
      password,
      new_username: newUsername,
    });
    this.props.resetErrors();
  };

  render() {
    const { password, newUsername } = this.state;
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
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button" type="submit">
          Change username
        </button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameEditFormTemplate);
