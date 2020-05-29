import React from 'react';
import { connect } from 'react-redux';
import { resetRegistrationSuccess } from '../../redux/actionCreators';
import Placeholder from '../fetchingPlaceholder';
import UsernameEditFormTemplate from './UsernameEditFormTemplate';

const mapStateToProps = state => ({
  successFlag: state.currentUser.successFlag,
  loading: state.loading.loading
});

const mapDispatchToProps = dispatch => ({
  resetSuccess: () => dispatch(resetRegistrationSuccess())
});

class UsernameEditForm extends React.Component {
  componentWillUnmount() {
    this.props.resetSuccess();
  }

  renderingOptions() {
    if (this.props.loading) {
      return <Placeholder />;
    } else if (this.props.successFlag) {
      return (<div>
        <p>Your username has been successfully changed!</p>
      </div>);
    } else {
      return <UsernameEditFormTemplate />; 
    }
  }

  render() {
    return (
      this.renderingOptions()
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameEditForm);