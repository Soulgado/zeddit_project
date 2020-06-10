import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetRegistrationSuccess } from "../../redux/actionCreators";
import Placeholder from "../fetchingPlaceholder";
import PasswordEditFormTemplate from "./PasswordEditFormTemplate";

const mapStateToProps = (state) => ({
  successFlag: state.currentUser.successFlag,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  resetSuccess: () => dispatch(resetRegistrationSuccess()),
});

class PasswordEditForm extends React.Component {
  componentWillUnmount() {
    this.props.resetSuccess();
  }

  renderingOptions() {
    if (this.props.loading) {
      return <Placeholder />;
    } else if (this.props.successFlag) {
      return (
        <div>
          <p>Your Password has been successfully changed!</p>
        </div>
      );
    } else {
      return <PasswordEditFormTemplate />;
    }
  }

  render() {
    return this.renderingOptions();
  }
}

PasswordEditForm.propTypes = {
  loading: PropTypes.bool,
  successFlag: PropTypes.bool,
  resetSuccess: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEditForm);
