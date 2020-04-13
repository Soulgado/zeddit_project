import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

function MainNavigation(props) {
  function checkLoggedIn() {
    if (!props.loggedIn) {
      return (
        <>
        <li className='navigation-element'>
          <Link to='/register'>Create Account</Link>
        </li>
        <li className='navigation-element'>
          <Link to='/login'>Sign In</Link>
        </li>
        </>
      )
    } else {
      return (
        <>
        <li><span>Hello, {props.user.username}!</span></li>
        <li><button type='button' onClick={props.logout}>Sign out</button></li>
        </>
      )
    }
  }

  return (
    <nav>
      <ul>
        <li className='navigation-element'>
          <Link to='/'>Main Page</Link>
        </li>
        <li className='navigation-element'>
          <Link to='/create_subzeddit'>Create Subzeddit</Link>
        </li>
        <li className='navigation-element'>
          <Link to='/sz'>All subzeddits</Link>
        </li>
        {checkLoggedIn()}
      </ul>
    </nav>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigation);