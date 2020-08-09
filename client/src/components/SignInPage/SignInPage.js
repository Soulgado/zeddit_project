import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Placeholder from "../fetchingPlaceholder";
import SignInForm from "../SignIn/SignInForm";
import { resetRegistrationSuccess } from "../../redux/actionCreators";

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  loggedIn: state.currentUser.loggedIn,
  successFlag: state.currentUser.successFlag
});

const mapDispatchToProps = dispatch => ({
  resetSuccessFlag: () => dispatch(resetRegistrationSuccess())
});

class SignInPage extends React.Component {
  // redirect to main page or previous page on successful signing
  renderingOptions() {
    const { loading, successFlag, ...otherProps } = this.props;
    if (loading) {
      return <Placeholder />;
    } else if (successFlag) {
      return (
        <div className="success-message">
          <p>You have successfully logged in. Redirecting to the last visited page in 5 sec.</p>
          {setTimeout(() => {
            if (this.props.history.length !== 0) {
              this.props.history.goBack();
            }
          }, 5000)}
        </div>
      );
    } else {
      return <SignInForm {...otherProps} />;
    }
  }

  componentWillUnmount() {
    this.props.resetSuccessFlag();
  }
  
  render() {
    return (
      <div className="create-page">
        <div className="create-wrapper">{this.renderingOptions()}</div>
      </div>
    );
  }
}

SignInPage.propTypes = {
  successFlag: PropTypes.bool,
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool
}

// const ConnectedSignInPage = withLogging(SignInPage, "/");

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
