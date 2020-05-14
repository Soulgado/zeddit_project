import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SubscribeButton from '../SubscribeButton/SubscribeButton';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn
});

const SubzedditMinified = ({ loggedIn, subzeddit }) => {
  // subscribe button doesn't receive change text
  return (
    <li>
      <div>
        <Link to={`/sz/${subzeddit.title}`}>
          {subzeddit.title}
        </Link>
        <p>Created {subzeddit.creation_date} by {subzeddit.username}</p>
        <p>{subzeddit.subscriptions} subscribers</p>
        {loggedIn 
          ? <SubscribeButton subzeddit={subzeddit} />
          : ''}
      </div>
    </li>
  )
}

export default connect(
  mapStateToProps
)(SubzedditMinified);