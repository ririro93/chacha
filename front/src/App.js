import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import Cookies from 'js-cookie';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalInfo: {
        userInfo: null,
        accessToken: null,
        refreshToken: null,
        signIn: this.signIn.bind(this)
      }
    };
  }


  signIn(email, password) {
    const csrftoken = Cookies.get('csrftoken');
    axios.post('api/accounts/login/',
        {
            username: '',
            email: email,
            password: password
        },
        {
            headers: {
                'X-CSRFToken': csrftoken
            }
        }).then(res => {
            const accessToken = res.data.access_token;
            const refreshToken = res.data.refresh_token;
            this.setState({
              accessToken: accessToken,
              refreshToken: refreshToken
            });
            console.log(res.data);
        }).catch(res => {
            console.log(res);
            console.log('Login failed!');
        });
  }

  render() {
    const { globalInfo } = this.state;
    return(
      <Router>
        <Route path='/' exact component={() => <MainPage globalInfo={globalInfo}></MainPage>}></Route>
        <Route path='/create-question' component={() => <CreateQuestionPage globalInfo={globalInfo}></CreateQuestionPage>}></Route>
      </Router>
    )
  }
}

export default App;