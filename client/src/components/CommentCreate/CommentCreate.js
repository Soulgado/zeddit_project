import React from "react";
import { connect } from "react-redux";
import { postComment, resetPostFormErrors } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  errors: state.post.formErrors,
});

const mapDispatchToProps = (dispatch) => ({
  postComment: (user, comment, post, parent) =>
    dispatch(postComment(user, comment, post, parent)),
  resetErrors: () => dispatch(resetPostFormErrors()),
});

class CommentCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      errors: undefined,
    };
  }

  handleSubmit = (e) => {
    const { comment } = this.state;
    e.preventDefault();
    if (comment === "") {
      this.setState({
        errors: "The body of the comment should not be empty",
      });
      return;
    }
    const { user, post, parent, postComment } = this.props;
    postComment(user.id, comment, post, parent ? parent.id : null);
    this.setState({
      comment: "",
    });
    if (this.props.handleClick) {
      this.props.handleClick();
    }
  };

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
      errors: undefined,
    });
    this.props.resetErrors();
  };

  componentWillUnmount() {
    this.props.resetErrors();
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <textarea
          id="comment"
          value={this.state.comment}
          placeholder="Write your comment here"
          onChange={this.handleChange}
        />
        <div className="form-errors">
          {this.state.errors && <p>{this.state.errors}</p>}
          {this.props.errors && <p>{this.props.errors}</p>}
        </div>
        <button type="submit" className="comment-create-button">
          COMMENT
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreateForm);
