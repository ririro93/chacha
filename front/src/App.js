import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';


class App extends React.Component {
  render() {
    return(
      <Router>
        <Route path='/' exact component={MainPage}></Route>
        <Route path='/create-question' component={CreateQuestionPage}></Route>
        <Route path='/login' component={LoginPage}></Route>
        <Route path='/join' component={JoinPage}></Route>
      </Router>
    )
  }
}

export default App;