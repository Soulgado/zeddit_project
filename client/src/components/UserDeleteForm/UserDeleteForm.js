import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetRegistrationSuccess } from "../../redux/actionCreators";
import Placeholder from "../fetchingPlaceholder";
import UserDeleteFormTemplate from "./UserDeleteFormTemplate";

const mapStateToProps = (state) => ({
  successFlag: state.currentUser.successFlag,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  resetSuccess: () => dispatch(resetRegistrationSuccess()),
});

class UserDeleteForm extends React.Component {
  componentWillUnmount() {
    this.props.resetSuccess();
  }

  renderingOptions() {
    if (this.props.loading) {
      return <Placeholder />;
    } else if (this.props.successFlag) {
      return (
        <div>
          <p>Your account has been successfully deleted!</p>
        </div>
      );
    } else {
      return <UserDeleteFormTemplate />;
    }
  }

  render() {
    return this.renderingOptions();
  }
}

UserDeleteForm.propTypes = {
  successFlag: PropTypes.bool,
  loading: PropTypes.bool,
  resetSuccess: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDeleteForm);
