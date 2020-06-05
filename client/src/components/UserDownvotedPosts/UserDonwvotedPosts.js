import React from "react";
import { connect } from "react-redux";
import { getDownvotedPosts } from "../../redux/actionCreators";
import PostMinified from "../PostMinified/PostMinified";
import { withLoading } from "../withLoading";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  postsList: state.userAction.userDownvotedPosts,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (user) => dispatch(getDownvotedPosts(user)),
});

class UserDownvotedPosts extends React.Component {
  render() {
    let { postsList } = this.props;
    return (
      <div className="subzeddits-list-wrapper user-list">
        <h1 className="subzeddits-list-title">List of downvoted posts:</h1>
        <div className="subzeddits-list">
          <ul className="posts-list">
            {postsList.map((post) => {
              return (
                <li key={post.title}>
                  <PostMinified post={post} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const UserDownvotedPostsLoaded = withLoading(UserDownvotedPosts);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDownvotedPostsLoaded);
