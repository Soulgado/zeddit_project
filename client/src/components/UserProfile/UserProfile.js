import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SubscriptionsList from '../SubscriptionsList/SubscriptionsList';
import UserUpvotedPosts from '../UserUpvotedPosts/UserUpvotedPosts';
import UserDownvotedPosts from '../UserDownvotedPosts/UserDonwvotedPosts';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

class UserProfile extends React.Component {
  render() {
    const { url, path } = this.props.match;
    return (
      <div className='user-profile'>
        <ul>
          <li>
            <Link to={`${url}/`}>
              Profile page
            </Link>
          </li>
          <li>
            <Link to={`${url}/subscriptions`}>
              Subscriptions
            </Link>
          </li>
          <li>
            <Link to={`${url}/upvoted`}>
              Upvoted
            </Link>
          </li>
          <li>
            <Link to={`${url}/downvoted`}>
              Downvoted
            </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path={`${path}/`}>
            <div>
              <p>Username: {this.props.user.username}</p>
            </div>
          </Route>
          <Route path={`${path}/subscriptions`}>
            <SubscriptionsList />
          </Route>
          <Route path={`${path}/upvoted`}>
            <UserUpvotedPosts />
          </Route>
          <Route path={`${path}/downvoted`}>
            <UserDownvotedPosts />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(UserProfile);