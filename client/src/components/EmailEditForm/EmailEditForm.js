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

export class EmailEditForm extends React.Component {
  componentWillUnmount() {
    this.props.resetSuccess();
  }

  renderingOptions() {
    if (this.props.loading) {
      return <Placeholder />;
    } else if (this.props.successFlag) {
      return (
        <div className="success-message">
          <p>Your email has been successfully changed!</p>
        </div>
      );
    } else {
      return <EmailEditFormTemplate />;
    }
  }

  render() {
    return <div>{this.renderingOptions()}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailEditForm);
