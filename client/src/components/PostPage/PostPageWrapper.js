import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Placeholder from "../fetchingPlaceholder";
import PostPage from "./PostPage";
import { getPost, resetCommentCreationFlag, resetPostDeleteFlag } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loading: state.loading.loading,
  commentCreated: state.post.creationFlag,
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (post, user) => dispatch(getPost(post, user)),
  resetCommentFlag: () => dispatch(resetCommentCreationFlag()),
  resetDeleteFlag: () => dispatch(resetPostDeleteFlag())
});

class PostPageWrapper extends React.Component {
  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.props.getPost(post_id, this.props.user);
  }

  componentDidUpdate() {
    // on comment creation - update post
    if (this.props.commentCreated) {
      const { post_id } = this.props.match.params;
      this.props.getPost(post_id, this.props.user);
      this.props.resetCommentFlag();
    }
  }

  componentWillUnmount() {
    this.props.resetDeleteFlag();
  }

  renderingOptions() {
    if (this.props.loading) {
      return <Placeholder />;
    } else if (this.props.postDeleteFlag) {
      return (
        <div className="post-deleted-message">
          <p>This post has been successfully deleted!</p>
          <p>Go to the <Link to="/">main page</Link></p>
        </div>
      );
    } else {
      return <PostPage />
    }
  }

  render() {
    return (
      <div className="post-page-wrapper">
        {this.renderingOptions()}
      </div>
    );
  }
}

PostPageWrapper.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  commentCreated: PropTypes.bool,
  getPost: PropTypes.func,
  resetFlag: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPageWrapper);
