import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/navigation.sass";
import "./styles/form.sass";
import SignInPage from "./components/SignInPage/SignInPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import SubzedditCreatePage from "./components/SubzedditCreatePage/SubzedditCreatePage";
import SubzedditList from "./components/SubzedditList/SubzedditList";
import SubzedditPage from "./components/SubzedditPage/SubzedditPage";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import UserProfile from "./components/UserProfile/UserProfile";
import PostCreatePage from "./components/PostCreatePage/PostCreatePage";
import MainPage from "./components/MainPage/MainPage";
import PostEditPage from "./components/PostEditPage/PostEditPage";
import UserDeleteForm from "./components/UserDeleteForm/UserDeleteForm";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { login } from "./redux/actionCreators";

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  loggedIn: state.currentUser.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: data => dispatch(login(data))
});

class App extends React.Component {
  componentDidMount() {
    let token = window.localStorage.getItem("zeddit_token");
    if (token) {
      // sign in callback
      this.props.login({
        username: "default",
        password: "default",
        token
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <MainNavigation />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/create_subzeddit" component={SubzedditCreatePage} />
            <Route path="/sz/:title" component={SubzedditPage} />
            <Route path="/sz" component={SubzedditList} />
            <Route path="/login" component={SignInPage} />
            <Route path="/register" component={SignUpPage} />
            <Route path="/profile/:username" component={UserProfile} />
            <Route path="/edit_post" component={PostEditPage} />
            <Route path="/submit_post" component={PostCreatePage} />
            <Route path="/delete_account" component={UserDeleteForm} />
            <Route path="*" component={NotFoundPage}/>
          </Switch>
        </main>
        <footer>
          2020, Created with Node.js, Express, React and PostgreSQL.
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
