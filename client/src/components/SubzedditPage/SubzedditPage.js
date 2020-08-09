import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { format } from "date-fns";
import { getSubzeddit } from "../../redux/actionCreators";
import PostPageWrapper from "../PostPage/PostPageWrapper";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import SubzedditPosts from "./SubzedditPosts";
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

export class SubzedditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
  }
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
              <h1>{subzeddit.title}</h1>
              {loggedIn ? <SubscribeButton subzeddit={subzeddit} /> : null}
            </div>
          )}
        </div>
        <div className="main-content">
          <Switch>
            <Route exact path={`${url}`}
              render={routeProps => (
                <SubzedditPosts {...routeProps} title={title} count={Number(subzeddit.posts_count)} />
              )}>
            </Route>
            <Route
              path={`${path}/:post_id/:post_title`}
              component={PostPageWrapper}
            />
          </Switch>
          <aside className="sidebar-wrapper subzeddit-sidebar">
            <p className="sidebar-title">About community</p>
            <div className="subzeddit-sidebar__title">
              <span>z/{subzeddit.title}</span>
            </div>
            <div className="subzeddit-sidebar__description">
              <p>{subzeddit.description}</p>
            </div>
            <div className="users-count">
              <span className="users-count__count">{subzeddit.subscriptions}</span>
              <span>subscribers</span>
            </div>
            <div className="subzeddit-sidebar__creation">
              <p>Created {subzeddit.creation_date ? format(Date.parse(subzeddit.creation_date), "dd MMMM yyyy") : ""}</p>
            </div>
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

SubzedditPage.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  subzeddit: PropTypes.object,
  loading: PropTypes.bool,
  getSubzeddit: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SubzedditPage);
