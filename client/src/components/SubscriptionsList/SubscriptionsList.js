import React from 'react';
import { connect } from 'react-redux';
import { getUserSubscriptions } from '../../redux/actionCreators';
import SubzedditMinified from '../SubzedditMinified/SubzedditMinified';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  subscriptionsList: state.userAction.userSubscriptions
});

const mapDispatchToProps = dispatch => ({
  getUserSubscriptions: (user) => dispatch(getUserSubscriptions(user))
});

class SubscriptionsList extends React.Component {
  componentDidMount() {
    // get subscriptions
    this.props.getUserSubscriptions(this.props.user);
  }

  render() {
    let { subscriptionsList } = this.props; 
    return (
      <div className='subzeddits-list-wrapper'>
        <h1 className='subzeddits-list-title'>List of subscribed subzeddits:</h1>
        <div className='subzeddits-list'>
          <ul id='subzeddits-list'>
            {subscriptionsList.map(subzeddit => {
            return <SubzedditMinified
                key={subzeddit.title}
                subzeddit={subzeddit} />
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionsList);