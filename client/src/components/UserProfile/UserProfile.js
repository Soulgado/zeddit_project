import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SubscriptionsList from "../SubscriptionsList/SubscriptionsList";
import UserUpvotedPosts from "../UserUpvotedPosts/UserUpvotedPosts";
import UserDownvotedPosts from "../UserDownvotedPosts/UserDonwvotedPosts";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import UserSubmittedPosts from "../UserSubmittedPosts/UserSubmittedPosts";
import "../../styles/user-profile.sass";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  loading: state.loading.loading,
});

class UserProfile extends React.Component {
  render() {
    const { url, path } = this.props.match;
    return (
      <div className="user-profile-wrapper">
        <div className="user-profile">
          <ul className="user-profile-nav">
            <li>
              <NavLink to={`${url}/settings`} activeClassName="nav-selected">
                Profile page
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${url}/subscriptions`}
                activeClassName="nav-selected"
              >
                Subscriptions
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/submitted`} activeClassName="nav-selected">
                Submitted
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/upvoted`} activeClassName="nav-selected">
                Upvoted
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/downvoted`} activeClassName="nav-selected">
                Downvoted
              </NavLink>
            </li>
          </ul>
          <div className="profile-content-wrapper">
            <Switch>
              <Route exact path={`${path}/settings`}>
                <UserProfilePage user={this.props.user} />
              </Route>
              <Route path={`${path}/subscriptions`}>
                <SubscriptionsList />
              </Route>
              <Route path={`${path}/submitted`}>
                <UserSubmittedPosts />
              </Route>
              <Route path={`${path}/upvoted`}>
                <UserUpvotedPosts />
              </Route>
              <Route path={`${path}/downvoted`}>
                <UserDownvotedPosts />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.object,
  loading: PropTypes.object
}

export default connect(mapStateToProps)(UserProfile);
