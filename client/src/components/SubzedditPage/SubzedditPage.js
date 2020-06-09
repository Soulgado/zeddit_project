import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { format } from 'date-fns';
import { getSubzeddit } from "../../redux/actionCreators";
import PostPageWrapper from "../PostPage/PostPageWrapper";
import PostMinified from "../PostMinified/PostMinified";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import Placeholder from "../fetchingPlaceholder";
import "../../styles/subzedditPage.sass";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  subzeddit: state.subzeddit.subzeddit,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getSubzeddit: (title, user) => dispatch(getSubzeddit(title, user)),
});

class SubzedditPage extends React.Component {
  componentDidMount() {
    const { title } = this.props.match.params;
    this.props.getSubzeddit(title, this.props.user);
  }

  render() {
    const { subzeddit, loggedIn, loading } = this.props;
    const { title } = this.props.match.params;
    const { url, path } = this.props.match;
    return (
      <div className="subzeddit-page-wrapper">
        <div className="subzeddit-header">
          {loading ? null : (
            <div className="subzeddit-header-content">
              <h1>z/{subzeddit.title}</h1>
              {loggedIn ? <SubscribeButton subzeddit={subzeddit} /> : null}
            </div>
          )}
        </div>
        <div className="main-content">
          <Switch>
            <Route exact path={`${url}/`}>
              {loading ? (
                <Placeholder />
              ) : (
                <div className="posts-list-wrapper">
                  <div className="posts-list">
                    {!subzeddit.posts ? (
                      <p>No posts yet, want to add the first?</p>
                    ) : (
                      subzeddit.posts.map((post) => {
                        return <PostMinified key={post.id} post={post} />;
                      })
                    )}
                  </div>
                </div>
              )}
            </Route>
            <Route
              path={`${path}/:post_id/:post_title`}
              component={PostPageWrapper}
            />
          </Switch>
          <aside className="sidebar-wrapper subzeddit-sidebar">
            <p className="sidebar-title">About community</p>
            <p>{subzeddit.description}</p>
            <div className="users-count">
              <p>{subzeddit.subscriptions} subscribers</p>
            </div>
            <p>Created {format(subzeddit.creation_date, "dd MMMM yyyy")}</p>
            {loggedIn ? (
              <Link
                to={{
                  pathname: "/submit_post",
                  state: {
                    subzeddit: title,
                  },
                }}
              >
                <button type="button">Submit a new post</button>
              </Link>
            ) : null}
          </aside>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubzedditPage);
