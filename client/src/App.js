import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import './styles/navigation.sass';
import './styles/form.sass';
import SignInForm from './components/SignIn/SignInForm';
import SignUpForm from './components/SignUp/SignUpForm';
import SubzedditCreateForm from './components/SubzedditCreate/SubzedditCreate';
import SubzedditList from './components/SubzedditList/SubzedditList';
import SubzedditPage from './components/SubzedditPage/SubzedditPage';
import MainNavigation from './components/MainNavigation/MainNavigation';
import UserProfile from './components/UserProfile/UserProfile';
import PostCreatePage from './components/PostCreatePage/PostCreatePage';
import MainPage from './components/MainPage/MainPage';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <MainNavigation />
        </header>
        <main>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route path='/create_subzeddit' component={SubzedditCreateForm} />
              <Route path='/sz/:title' component={SubzedditPage} />
              <Route path='/sz' component={SubzedditList} />
              {this.props.loggedIn
                ? <Redirect from='/login' to='/' />
                : <Route path='/login' component={SignInForm} />}
              <Route path='/register' component={SignUpForm} />
              <Route path='/profile/:username' component={UserProfile} />
              <Route page='/submit_post' component={PostCreatePage} />
            </Switch> 
        </main>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(App);
