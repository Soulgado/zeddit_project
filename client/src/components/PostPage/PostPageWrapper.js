import React from "react";
import { connect } from "react-redux";
import Placeholder from "../fetchingPlaceholder";
import PostPage from "./PostPage";
import { getPost, resetCommentCreationFlag } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loading: state.loading.loading,
  commentCreated: state.post.creationFlag,
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (post, user) => dispatch(getPost(post, user)),
  resetFlag: () => dispatch(resetCommentCreationFlag()),
});

class PostPageWrapper extends React.Component {
  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.props.getPost(post_id, this.props.user);
  }

  componentDidUpdate() {
    if (this.props.commentCreated) {
      const { post_id } = this.props.match.params;
      this.props.getPost(post_id, this.props.user);
      this.props.resetFlag();
    }
  }

  render() {
    return (
      <div className="post-page-wrapper">
        {this.props.loading ? <Placeholder /> : <PostPage />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPageWrapper);
