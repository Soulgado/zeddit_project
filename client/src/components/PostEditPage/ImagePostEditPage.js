import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editImagePost, resetPostFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  errors: state.post.formErrors,
});

const mapDispatchToProps = (dispatch) => ({
  editPost: (user, post, formData) =>
    dispatch(editImagePost(user, post, formData)),
  resetErrors: () => dispatch(resetPostFormErrors()),
});

export class ImagePostEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { title } = this.props.post;
    this.setState({
      title,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errors: undefined
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
    } else return;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.formErrorsCheck(this.state);
    if (errors) {
      this.setState({
        errors: errors
      });
      return;
    }
    const formData = {
      title: this.state.title,
    };
    this.props.editPost(this.props.user.id, this.props.post.id, formData);
    this.props.resetErrors();
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    const { title } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <p className="form-title">Edit post</p>
        <div className="form-element">
          <label htmlFor="title">Post title:</label>
          <input id="title" type="text" value={title} onChange={handleChange} />
        </div>
        <div className="form-errors">
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button className="form-button" type="submit">
          Apply changes
        </button>
      </form>
    );
  }
}

ImagePostEditPage.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.string,
  editPost: PropTypes.func,
  resetErrors: PropTypes.func,
  post: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePostEditPage);
