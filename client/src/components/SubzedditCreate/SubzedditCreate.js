import React from "react";
import { connect } from "react-redux";
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

class SubzedditCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      errors: undefined,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      errors: undefined,
    });
    this.props.resetErrors();
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
    const errors = this.formErrorsCheck();
    if (errors) {
      this.setState({
        errors: errors,
      });
      return;
    }
    const { title, description } = this.state;
    const user = this.props.user.id;
    this.props.createSubzeddit({ title, user, description });
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    // ToDo: front-end errors handler
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreateForm);
