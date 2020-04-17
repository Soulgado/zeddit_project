import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SubscribeButton from '../SubscribeButton/SubscribeButton';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

const SubzedditMinified = ({ user, loggedIn, subzeddit }) => {
  // add subscribe button
  return (
    <li>
      <div>
        <Link to={`/sz/${subzeddit.title}`}>
          {subzeddit.title}
        </Link>
        <p>Created {subzeddit.creation_date} by {subzeddit.username}</p>
        {loggedIn 
          ? <SubscribeButton subzeddit={subzeddit.title} />
          : ''}
      </div>
    </li>
  )
}

export default connect(
  mapStateToProps
)(SubzedditMinified);