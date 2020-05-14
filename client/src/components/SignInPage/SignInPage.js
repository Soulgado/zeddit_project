import React from 'react';
import { connect } from 'react-redux';
import Placeholder from '../fetchingPlaceholder';
import SignInForm from '../SignIn/SignInForm';

const mapStateToProps = state => ({
  loading: state.loading.loading,
  loggedIn: state.currentUser.loggedIn
})

class SubzedditCreatePage extends React.Component {

  render() {
    const { loading, loggedIn, history } = this.props;

    return (
      <div>
        {loggedIn
          ? history.goBack()
          : loading 
            ? <Placeholder />
            : <SignInForm />}
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(SubzedditCreatePage);