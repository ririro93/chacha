import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';


class App extends React.Component {
  render() {
    return(
      <Router>
        <Route path='/' exact component={MainPage}></Route>
        <Route path='/create-question' component={CreateQuestionPage}></Route>
        <Route path='/sign-in' component={SignInPage}></Route>
        <Route path='/sign-up' component={SignUpPage}></Route>
      </Router>
    )
  }
}

export default App;