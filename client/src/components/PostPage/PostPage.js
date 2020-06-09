import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CommentCreateForm from "../CommentCreate/CommentCreate";
import VoteButtons from "../VoteButtons/VoteButtons";
import CommentsList from "../CommentsList/CommentsList";
import CreationTime from "../CreationTime/CreationTime";
import { deletePost } from "../../redux/actionCreators";
import "../../styles/postPage.sass";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  post: state.post.post,
  loggedIn: state.currentUser.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  deletePost: (user, post) => dispatch(deletePost(user, post)),
});

class PostPage extends React.Component {
  handleDeleteClick = () => {
    this.props.deletePost(this.props.user.id, this.props.post.id);
    // redirect to the main page?
  };

  render() {
    const { post, loggedIn, user } = this.props;
    return (
      <>
        <VoteButtons className="post-page-vote" post={post} />
        <div className="post-general-wrapper">
          <h2>{post.title}</h2>
          <div className="post-info">
            <p>
              {post.updated ? "Updated " : "Posted "}
              by {post.username} <CreationTime time={post.creation_date} />
            </p>
          </div>
          <div className="post-content">
            {post.type === "image" ? (
              <img
                src={`/static/images/${post.filename}`}
                alt="post content"
              ></img>
            ) : (
              <p>{post.content}</p>
            )}
          </div>
          {loggedIn && post.username === user.username ? (
            <div className="post-control-buttons">
              <Link
                to={{
                  pathname: "/edit_post",
                  state: {
                    post: post,
                  },
                }}
              >
                <button type="button">Edit post</button>
              </Link>
              <button
                className="delete-button post-delete"
                type="button"
                onClick={this.handleDeleteClick}
              >
                Delete post
              </button>
            </div>
          ) : null}
          {post.deleted && (
            <p>This post has been deleted, you cannot post any comments here</p>
          )}
          <p>{post.comments_num} comments</p>
          <div className="post-comments">
            {loggedIn && !post.deleted ? (
              <CommentCreateForm post={post.id} />
            ) : null}
            <p>Comments:</p>
            {!post.comments ? (
              <span>No comment yet.</span>
            ) : (
              <CommentsList comments={post.comments} />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
