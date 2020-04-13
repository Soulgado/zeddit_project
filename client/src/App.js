import React from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import './styles/navigation.sass';
import SignInForm from './components/SignIn/SignInForm';
import SignUpForm from './components/SignUp/SignUpForm';
import SubzedditCreateForm from './components/SubzedditCreate/SubzedditCreate';
import SubzedditList from './components/SubzedditList/SubzedditList';
import SubzedditPage from './components/SubzedditPage/SubzedditPage';
import MainNavigation from './components/MainNavigation/MainNavigation';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <MainNavigation />
        </header>
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

export default App;
