import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getMostPopularDefault } from "../../redux/actionCreators";
import PostMinified from "../PostMinified/PostMinified";
import Placeholder from "../fetchingPlaceholder";
import "../../styles/mainPage.sass";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  loading: state.loading.loading,
  mostPopularGlobal: state.subzeddit.mostPopularGlobal,
});

const mapDispatchToProps = (dispatch) => ({
  getMostPopularGlobal: (user) => dispatch(getMostPopularDefault(user)),
});

export class MainPage extends React.Component {
  // if user is logged in - return most popular posts for the last day from subscribed
  // if user is not logged in - return most popular posts from 'global' list of subzeddits
  componentDidMount() {
    this.props.getMostPopularGlobal(this.props.user);
  }

  renderPosts(posts) {
    return (
      <div className="posts-list">
        {posts.map((post) => {
          return <PostMinified key={post.id} post={post} />;
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="main-page-wrapper">
        <div className="main-content">
          <div className="posts-list-wrapper">
            <p>Most popular posts:</p>
            {this.props.loading ? (
              <Placeholder />
            ) : (
              this.renderPosts(this.props.mostPopularGlobal)
            )}
          </div>
          <aside className="sidebar-wrapper main-page-sidebar">
            <Link to="/create_subzeddit">
              <button type="button">Create Subzeddit</button>
            </Link>
            <Link to="/submit_post">
              <button type="button">Submit a new Post</button>
            </Link>
          </aside>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
  mostPopularGlobal: PropTypes.array,
  mostPopularUser: PropTypes.array,
  getMostPopularGlobal: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
