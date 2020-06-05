import React from "react";
import { connect } from "react-redux";
import { resetRegistrationSuccess } from "../../redux/actionCreators";
import Placeholder from "../fetchingPlaceholder";
import EmailEditFormTemplate from "./EmailEditFormTemplate";

const mapStateToProps = (state) => ({
  successFlag: state.currentUser.successFlag,
  loading: state.loading.loading,
});

const mapDispatchToProps = (dispatch) => ({
  resetSuccess: () => dispatch(resetRegistrationSuccess()),
});

class EmailEditForm extends React.Component {
  componentWillUnmount() {
    this.props.resetSuccess();
  }

  renderingOptions() {
    if (this.props.loading) {
      return <Placeholder />;
    } else if (this.props.successFlag) {
      return (
        <div>
          <p>Your email has been successfully changed!</p>
        </div>
      );
    } else {
      return <EmailEditFormTemplate />;
    }
  }

  render() {
    return this.renderingOptions();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailEditForm);
