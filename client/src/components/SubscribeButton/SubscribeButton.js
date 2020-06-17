import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeSubscriptionStatus } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  changeSubscriptionStatus: (user, subzeddit, status) =>
    dispatch(changeSubscriptionStatus(user, subzeddit, status)),
});

export class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscribed: false, // change default?
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // to change, status doesn't changes on first render
    let sub = this.props.subzeddit.subscription_status ? true : false; 
    this.setState({
      isSubscribed: sub,
    });
  }

  handleClick() {
    this.props.changeSubscriptionStatus(
      this.props.user,  // to id
      this.props.subzeddit.title,
      this.state.isSubscribed
    );
    this.setState({
      isSubscribed: !this.state.isSubscribed,
    });
  }

  render() {
    return (
      <div className="subscribe-button-wrapper">
        <button type="button" onClick={this.handleClick}>
          {this.state.isSubscribed ? "LEAVE" : "JOIN"}
        </button>
      </div>
    );
  }
}

SubscribeButton.propTypes = {
  user: PropTypes.object,
  changeSubscriptionStatus: PropTypes.func,
  subzeddit: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton);
