import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editEmail, resetUserFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  errors: state.currentUser.formErrors,
  user: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  editEmail: (formData) => dispatch(editEmail(formData)),
  resetErrors: () => dispatch(resetUserFormErrors()),
});

export class EmailEditFormTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newEmail: "",
      errors: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  formErrorsCheck(state) {
    if (state.newEmail === "") {
      return "Email field must not be empty";
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
    const { password, newEmail } = this.state;
    this.props.editEmail({
      username: this.props.user.id,
      password,
      new_password: newEmail,
    });
    this.props.resetErrors();
  };

  render() {
    const { password, newEmail, errors } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-element">
          <label htmlFor="newEmail">New Email:</label>
          <input
            id="newEmail"
            name="newEmail"
            type="email"
            value={newEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-errors">
          {errors && <p>{errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button" type="submit">
          Change email
        </button>
      </form>
    );
  }
}

EmailEditFormTemplate.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.string,
  editEmail: PropTypes.func,
  resetErrors: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailEditFormTemplate);
