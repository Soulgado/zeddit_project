import React from 'react';
import { connect } from 'react-redux';
import {
  changeSubscriptionStatus
} from '../../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  changeSubscriptionStatus: (user, subzeddit, status) => dispatch(changeSubscriptionStatus(user, subzeddit, status))
});

class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscribed: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let sub = this.props.subzeddit.subscription_status ? true : false;
    this.setState({
      isSubscribed: sub
    });
  }

  handleClick() {
    this.props.changeSubscriptionStatus(
      this.props.user,
      this.props.subzeddit.title,
      this.state.isSubscribed
      )
    this.setState({
      isSubscribed: !this.state.isSubscribed
    });
  }

  render() {
    return (
      <div className='subscribe-button-wrapper'>
        <button type='button' onClick={this.handleClick}>
        {this.state.isSubscribed
          ? 'LEAVE'
          : 'JOIN'}
        </button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeButton);