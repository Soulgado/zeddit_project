import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Placeholder from "../fetchingPlaceholder";
import SignInForm from "../SignIn/SignInForm";
import { withLogging } from "../withLogging";

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  loggedIn: state.currentUser.loggedIn,
});

// ToDo: extend for success message
class SignInPage extends React.Component {
  // redirect to main page or previous page on successful signing
  render() {
    const { loading, ...otherProps } = this.props;

    return <div>{loading ? <Placeholder /> : <SignInForm {...otherProps}/>}</div>;
  }
}

SignInPage.propTypes = {
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool
}

const ConnectedSignInPage = withLogging(SignInPage, "/");

export default connect(mapStateToProps)(ConnectedSignInPage);
