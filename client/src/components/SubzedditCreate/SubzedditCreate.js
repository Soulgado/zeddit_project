import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createSubzeddit,
  resetSubzedditFormErrors,
} from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  errors: state.subzeddit.formErrors,
});

const mapDispatchToProps = (dispatch) => ({
  createSubzeddit: (formData) => dispatch(createSubzeddit(formData)),
  resetErrors: () => dispatch(resetSubzedditFormErrors()),
});

// ToDo: title should not contains spaces/special characters
export class SubzedditCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
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
    if (this.props.errors) {
      this.props.resetErrors();
    }
  };

  formErrorsCheck(state) {
    if (state.title === "") {
      return "Title field must not be empty";
    } else if (state.title.length < 3) {
      return "Title must be no less than 3 characters long";
    } else if (state.description === "") {
      return "Description field must not be empty";
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
    const { title, description } = this.state;
    const user = this.props.user.id;
    this.props.createSubzeddit({ title, user, description });
    this.props.resetErrors();
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    const { title, description } = this.state;
    const { handleChange } = this;

    return (
      <form onSubmit={this.handleSubmit}>
        <p className="form-title">Create New Subzeddit</p>
        <div className="form-element">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-element">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-errors">
          {this.state.errors && <p>{this.state.errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button" type="submit">
          Create Subzeddit
        </button>
      </form>
    );
  }
}

SubzedditCreateForm.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.string,
  createSubzeddit: PropTypes.func,
  resetErrors: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreateForm);
