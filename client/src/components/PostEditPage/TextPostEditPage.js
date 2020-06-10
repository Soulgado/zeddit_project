import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editTextPost, resetPostFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  errors: state.post.errors,
});

const mapDispatchToProps = (dispatch) => ({
  editPost: (user, post, formData) =>
    dispatch(editTextPost(user, post, formData)),
  resetErrors: () => dispatch(resetPostFormErrors()),
});

class TextPostEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { title, content } = this.props.post;
    this.setState({
      title,
      content,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    this.props.resetErrors();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      title: this.state.title,
      content: this.state.content,
    };
    this.props.editPost(this.props.user.id, this.props.post.id, formData);
    this.props.resetErrors();
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    const { title, content } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <p className="form-title">Edit post</p>
        <div className="form-element">
          <label htmlFor="title">Post title:</label>
          <input id="title" type="text" value={title} onChange={handleChange} />
        </div>
        <div className="form-element">
          <label htmlFor="content">Post content:</label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={handleChange}
          />
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

TextPostEditPage.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.string,
  editPost: PropTypes.func,
  resetErrors: PropTypes.func,
  post: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TextPostEditPage);
