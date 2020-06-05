import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

class SubzedditCreatePage extends React.Component {
  componentWillUnmount() {
    this.props.resetRegistrationSuccess();
  }

  render() {
    const { successFlag, loading } = this.props;

    return (
      <div>
        {successFlag ? (
          <div>
            <p>Your account was successfully created!</p>
            <p>
              Go to <Link to="/login">Log in page</Link>
            </p>
          </div>
        ) : loading ? (
          <Placeholder />
        ) : (
          <SignUpForm />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubzedditCreatePage);
