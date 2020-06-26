import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getUserSubscriptions } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  subscriptions: state.userAction.userSubscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscriptions: (user) => dispatch(getUserSubscriptions(user)),
});

export class SubscriptionsListNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    this.props.getSubscriptions(this.props.user);
  }

  handleMouseEnter() {
    this.setState({
      dropdownActive: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      dropdownActive: false,
    });
  }

  renderSubscriptions() {
    return (
      <ul className="subscriptions-dropdown">
        {this.props.subscriptions.length !== 0 ? this.props.subscriptions.map((subzeddit) => {
          return (
            <li key={subzeddit.title}>
              <Link to={`/sz/${subzeddit.title}`}>{subzeddit.title}</Link>
            </li>
          );
        }) : <div>No subscriptions yet</div>}
      </ul>
    );
  }

  render() {
    return (
      <li
        className="navigation-element"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <button type="button">My Communities</button>
        {this.state.dropdownActive ? this.renderSubscriptions() : null}
      </li>
    );
  }
}

SubscriptionsListNav.propTypes = {
  user: PropTypes.object,
  subscriptions: PropTypes.arrayOf(PropTypes.object),
  getSubscriptions: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionsListNav);
