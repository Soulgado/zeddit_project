import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { resetRegistrationSuccess } from "../../redux/actionCreators";
import Placeholder from "../fetchingPlaceholder";
import SignUpForm from "../SignUp/SignUpForm";

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  successFlag: state.currentUser.successFlag,
});

const mapDispatchToProps = (dispatch) => ({
  resetRegistrationSuccess: () => dispatch(resetRegistrationSuccess()),
});

class SignUpPage extends React.Component {
  componentWillUnmount() {
    this.props.resetRegistrationSuccess();
  }

  renderingOptions() {
    const { loading, successFlag, ...otherProps } = this.props;
    if (loading) {
      return <Placeholder />;
    } else if (successFlag) {
      return (
        <div className="success-message">
          <p>Your account was successfully created!</p>
          <p>
            Go to <Link to="/login">Log in page</Link>
          </p>
        </div>
      );
    } else {
      return <SignUpForm {...otherProps} />;
    }
  }

  render() {
    return (
      <div className="create-page">
        <div className="create-wrapper">{this.renderingOptions()}</div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  loading: PropTypes.bool,
  successFlag: PropTypes.bool,
  resetRegistrationSuccess: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
