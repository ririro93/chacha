import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import Cookies from 'js-cookie';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('authorized') === null) 
      localStorage.setItem('authorized', false);
    const authorized = localStorage.getItem('authorized');
    this.state = {
      globalInfo: {
        userInfo: null,
        signIn: this.signIn.bind(this),
        signOut: this.signOut.bind(this),
        authorized: authorized
      }
    };
  }

  componentDidMount() {
    if (localStorage.getItem('authorized') === null) 
      localStorage.setItem('authorized', false);
    const authorized = localStorage.getItem('authorized');
    this.setState({
      globalInfo: {
        ...this.state.globalInfo,
        authorized: authorized
      }
    });
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
          console.log('Login success!');
          localStorage.setItem('authorized', true);
          this.setState({
            globalInfo: {
              ...this.state.globalInfo,
              authorized: true
            }
          });
        }).catch(res => {
            console.log('Login failed!');
            localStorage.setItem('authorized', false);
            this.setState({
              globalInfo: {
                ...this.state.globalInfo,
                authorized: false
              }
            });
        });
  }

  signOut() {
    const csrftoken = Cookies.get('csrftoken');
    axios.post('api/accounts/logout/',
    {
    },
    {
      headers: {
          'X-CSRFToken': csrftoken
      }
    }).then(res => {
      console.log('Logout success!');
      localStorage.setItem('authorized', false);
      this.setState({
        globalInfo: {
          ...this.state.globalInfo,
          authorized: false
        }
      });
    }).catch(res => {
      console.log('Logout failed!');
    });
  }

  render() {
    const { globalInfo } = this.state;
    return(
      <Router>
        <Route path='/' exact component={(props) => (<MainPage {...props} globalInfo={globalInfo} ></MainPage>)}></Route>
        <Route path='/create-question' component={(props) => <CreateQuestionPage {...props} globalInfo={globalInfo}></CreateQuestionPage>}></Route>
      </Router>
    )
  }
}

export default App;