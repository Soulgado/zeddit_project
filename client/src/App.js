import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import './styles/navigation.sass';
import './styles/form.sass';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import SubzedditCreatePage from './components/SubzedditCreatePage/SubzedditCreatePage';
import SubzedditList from './components/SubzedditList/SubzedditList';
import SubzedditPage from './components/SubzedditPage/SubzedditPage';
import MainNavigation from './components/MainNavigation/MainNavigation';
import UserProfile from './components/UserProfile/UserProfile';
import PostCreatePage from './components/PostCreatePage/PostCreatePage';
import MainPage from './components/MainPage/MainPage';
import PostEditPage from './components/PostEditPage/PostEditPage';

const mapStateToProps = state => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn
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
              <Route path='/create_subzeddit' component={SubzedditCreatePage} />
              <Route path='/sz/:title' component={SubzedditPage} />
              <Route path='/sz' component={SubzedditList} />
              <Route path='/login' component={SignInPage} />}
              <Route path='/register' component={SignUpPage} />
              <Route path='/profile/:username' component={UserProfile} />
              <Route path='/edit_post' component={PostEditPage} />
              <Route page='/submit_post' component={PostCreatePage} />
            </Switch> 
        </main>
        <footer>
          2020, Created with Node.js, Express, React and PostgreSQL.
        </footer>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(App);
