import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Placeholder from "../fetchingPlaceholder";
import SignInForm from "../SignIn/SignInForm";

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  loggedIn: state.currentUser.loggedIn,
});

// ToDo: extend for success message
class SubzedditCreatePage extends React.Component {
  // redirect to main page or previous page on successful signing
  render() {
    const { loading } = this.props;

    return <div>{loading ? <Placeholder /> : <SignInForm />}</div>;
  }
}

SubzedditCreatePage.propTypes = {
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool
}

export default connect(mapStateToProps)(SubzedditCreatePage);
