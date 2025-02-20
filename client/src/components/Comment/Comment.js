import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CommentVoteButtons from "../CommentVoteButtons/CommentVoteButtons";
import CommentCreateForm from "../CommentCreate/CommentCreate";
import CreationTime from "../CreationTime/CreationTime";
import { editComment, deleteComment } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  post: state.post.post,
});

const mapDispatchToProps = (dispatch) => ({
  editComment: (user, comment, content) =>
    dispatch(editComment(user, comment, content)),
  deleteComment: (user, comment) => dispatch(deleteComment(user, comment)),
});

export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createFormActive: false,
      editFormActive: false,
      commentText: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      commentText: this.props.comment.content,
    });
  }

  handleChange = (e) => {
    this.setState({
      commentText: e.target.value,
    });
  };

  handleClick = () => {
    this.setState({
      createFormActive: !this.state.createFormActive,
    });
  };

  handleEditClick = () => {
    if (!this.state.editFormActive) {
      this.setState({
        editFormActive: true,
      });
    } else {
      this.setState({
        editFormActive: false,
      });
      this.props.editComment(
        this.props.user.id,
        this.props.post.id,
        this.state.commentText
      );
    }
  };

  handleDeleteClick = () => {
    this.props.deleteComment(this.props.user.id, this.props.comment.id);
  };

  render() {
    // ToDo: divide in several components?
    const { comment, loggedIn, post, user } = this.props;
    let { createFormActive, editFormActive, commentText } = this.state;
    return (
      <div
        style={{ marginLeft: `${comment.level * 0}px` }}
        className="comment-body"
      >
        <CommentVoteButtons comment={comment} />
        <div className="comment-main">
          <div className="comment-info">
            <span>
              {comment.username ? comment.username : "[deleted]"} - {comment.updated ? "updated " : "posted "}
              <CreationTime time={comment.creation_time} />
            </span>
          </div>
          <div className="comment-content">
            {editFormActive ? (
              <textarea
                value={commentText}
                onChange={this.handleChange}
              ></textarea>
            ) : (
              <p>{commentText}</p>
            )}
          </div>
          <div className="comment-buttons">
            {loggedIn ? (
              <button
                className="comment-create-button"
                type="button"
                onClick={this.handleClick}
              >
                {createFormActive ? "Hide" : "Reply"}
              </button>
            ) : null}
            {loggedIn && comment.author === user.id ? (
              <>
                <button
                  className="comment-edit-button"
                  type="button"
                  onClick={this.handleEditClick}
                >
                  {editFormActive ? "Apply changes" : "Edit"}
                </button>
                <button className="comment-delete-button" type="button" onClick={this.handleDeleteClick}>
                  Delete Comment
                </button>
              </>
            ) : null}
          </div>
          {createFormActive ? (
            <CommentCreateForm
              parent={comment}
              post={post.id}
              handleClick={this.handleClick}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  post: PropTypes.object,
  editComment: PropTypes.func,
  deleteComment: PropTypes.func,
  comment: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
