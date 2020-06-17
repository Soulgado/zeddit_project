import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import TextPostEditPage from "./TextPostEditPage";
import ImagePostEditPage from "./ImagePostEditPage";
import Placeholder from "../fetchingPlaceholder";
import { resetCommentCreationFlag } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  creationFlag: state.post.creationFlag,
  post: state.post.post,
});

const mapDispatchToProps = (dispatch) => ({
  resetCreationFlag: () => dispatch(resetCommentCreationFlag()),
});

class PostEditPage extends React.Component {
  componentWillUnmount() {
    this.props.resetCreationFlag();
  }

  renderingOptions() {
    const { loading, creationFlag, post } = this.props;
    const editPost = this.props.location.state.post;
    if (loading) {
      return <Placeholder />;
    } else if (creationFlag) {
      return (
        <div className="success-message">
          <p>The post has been successfully edited!</p>
          <p>
            Go to{" "}
            <Link
              to={`/sz/${editPost.subzeddit_title}/${post.id}/${post.title}`}
            >
              created post
            </Link>
          </p>
        </div>
      );
    } else if (editPost.type === "text") {
      return <TextPostEditPage post={editPost} />;
    } else {
      return <ImagePostEditPage post={editPost} />;
    }
  }

  // ToDo: check for user === post.creator => Redirect to main page

  render() {
    return (
      <div className="create-page">
        <div className="create-wrapper">{this.renderingOptions()}</div>
      </div>
    );
  }
}

PostEditPage.propTypes = {
  loading: PropTypes.bool,
  creationFlag: PropTypes.bool,
  post: PropTypes.object,
  resetCreationFlag: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditPage);
