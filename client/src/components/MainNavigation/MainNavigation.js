import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actionCreators';
import SubscriptionsListNav from '../SubscriptionsListNav/SubscriptionsListNav';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

class MainNavigation extends React.Component {
  checkLoggedIn() {
    if (!this.props.loggedIn) {
      return (
        <ul>
          <li className='navigation-element'>
            <Link to='/register'>
              <button type='button'>
                Create Account
              </button>
            </Link>
          </li>
          <li className='navigation-element'>
            <Link to='/login'>
              <button type='button'>
                Sign In
              </button>
            </Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li className='welcome-message'>
            <span>Hello, {this.props.user.username}!</span>
          </li>
          <li className='navigation-element'>
            <Link to={`/profile/${this.props.user.username}/settings`}>
              <button type='button'>
                Profile
              </button>
            </Link>
          </li>
          <li className='navigation-element'>
              <button type='button' onClick={this.props.logout}>Sign out</button>
          </li>
        </ul>
      )
    }
  }

  render() {
    return (
      <nav>
        <ul>
          <li className='navigation-element'>
            <Link to='/'>
              <button type='button'>
                ZEDDIT
              </button>
            </Link>
          </li>
          {this.props.loggedIn
            ? <SubscriptionsListNav />
            : ''}
          <li className='navigation-element'>
            <Link to='/sz'>
              <button type='button'>
                All subzeddits
              </button>
            </Link>
          </li>
        </ul>
          {this.checkLoggedIn()}
      </nav>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigation);