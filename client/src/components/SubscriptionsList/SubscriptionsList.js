import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserSubscriptions } from "../../redux/actionCreators";
import SubzedditMinified from "../SubzedditMinified/SubzedditMinified";
import { withLoading } from "../withLoading";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
  subscriptionsList: state.userAction.userSubscriptions,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (user) => dispatch(getUserSubscriptions(user)),
});

class SubscriptionsList extends React.Component {
  render() {
    let { subscriptionsList } = this.props;
    return (
      <div className="subzeddits-list-wrapper user-list">
        <h1 className="subzeddits-list-title">
          List of subscribed subzeddits:
        </h1>
        <div className="subzeddits-list">
          <ul id="subzeddits-list">
            {subscriptionsList.map((subzeddit) => {
              return (
                <SubzedditMinified
                  key={subzeddit.title}
                  subzeddit={subzeddit}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

SubscriptionsList.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  subscriptionsList: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
}

const SubscriptionsListLoaded = withLoading(SubscriptionsList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionsListLoaded);
