import React from 'react';
import { Link, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import './styles/navigation.sass';
import SignInForm from './views/SignIn/SignInForm';
import SignUpForm from './views/SignUp/SignUpForm';
import SubzedditCreateForm from './views/SubzedditCreate/SubzedditCreate';
import SubzedditList from './views/SubzedditList/SubzedditList';
import SubzedditPage from './views/SubzedditPage/SubzedditPage';
import { logout } from './redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

class App extends React.Component {

  checkLoggedIn() {
    if (!this.props.loggedIn) {
      return (
        <>
        <li className='navigation-element'>
          <Link to='/register'>Create Account</Link>
        </li>
        <li className='navigation-element'>
          <Link to='/login'>Sign In</Link>
        </li>
        </>
      )
    } else {
      return (
        <>
        <li><span>Hello, {this.props.user.username}!</span></li>
        <li><button type='button' onClick={this.props.logout}>Sign out</button></li>
        </>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <nav>
          <ul>
            <li className='navigation-element'>
              <Link to='/'>Main Page</Link>
            </li>
            <li className='navigation-element'>
              <Link to='/create_subzeddit'>Create Subzeddit</Link>
            </li>
            <li className='navigation-element'>
              <Link to='/sz'>All subzeddits</Link>
            </li>
            {this.checkLoggedIn()}
          </ul>
        </nav>
        <main>
            <Switch>
              <Route exact path='/'>
                <p>This is main page of the Zeddit.</p>
              </Route>
              <Route path='/create_subzeddit'>
                <SubzedditCreateForm />
              </Route>
              <Route path='/sz/:title'>
                <SubzedditPage />
              </Route>
              <Route path='/sz'>
                <SubzedditList />
              </Route>
              <Route path='/login'>
                <SignInForm />
              </Route>
              <Route path='/register'>
                <SignUpForm />
              </Route>
            </Switch> 
        </main>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
