import React from 'react';
import { connect } from 'react-redux';
import {
  changeSubscriptionStatus,
  getUserSubscription
} from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn,
  userSubscriptionsStatus: state.userSubscriptionsStatus
});

const mapDispatchToProps = dispatch => ({
  getUserSubscription: (user, subzeddit) => dispatch(getUserSubscription(user, subzeddit)),
  changeSubscriptionStatus: (user, subzeddit, status) => dispatch(changeSubscriptionStatus(user, subzeddit, status))
});

class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getUserSubscription(this.props.user.username, this.props.subzeddit);
  }

  handleClick() {
    this.props.changeSubscriptionStatus(
      this.props.user,
      this.props.subzeddit,
      this.props.userSubscriptionsStatus[this.props.subzeddit]
      )
    this.props.getUserSubscription(this.props.user.username, this.props.subzeddit);
  }

  // problem: button doesn't change 

  render() {
    return (
      <div className='subscribe-button-wrapper'>
        <button type='button' onClick={this.handleClick}>
        {this.props.userSubscriptionsStatus[this.props.subzeddit]
          ? 'Unsubscribe'
          : 'Subscribe'}
        </button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeButton);