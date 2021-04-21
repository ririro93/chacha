import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AuthContext } from 'AuthContext';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: localStorage['user-email'] === undefined ? null : localStorage['user-email']
    };
  }

  signIn(email, password) {
    const csrftoken = Cookies.get('csrftoken');
    return axios.post('api/accounts/login/',
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
            localStorage['user-email'] = email;
            this.setState({
              userEmail: email
            });
            return true;
        }).catch(res => {
            console.log('Login failed!');
            return false;
        }
    );
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
            localStorage.removeItem('user-email');
            this.setState({
              userEmail: null
            });
        }).catch(res => {
            console.log('Logout failed!');
    });
  }

  signUp(email, password1, password2) {
    const csrftoken = Cookies.get('csrftoken');
    axios.post('api/accounts/signup/',
        {
          email: email,
          password1: password1,
          password2: password2
        },
        {
          headers: {
            'X-CSRFToken': csrftoken
          }
        }).then(res => {
            console.log('Signup success!');
        }).catch(res => {
            console.log('Signup failed!');
      });
  }
  
  componentDidMount() {
    this.setState({
      userEmail: localStorage['user-email'] === undefined ? null : localStorage['user-email']
    });
  }

  render() {
    const { userEmail } = this.state;

    return(
      <AuthContext.Provider value={{
        signIn: this.signIn.bind(this),
        signOut: this.signOut.bind(this),
        signUp: this.signUp,
        userEmail: userEmail
      }}>
        <Router>
          <Route path='/' exact component={(props) => (<MainPage {...props} ></MainPage>)}></Route>
          <Route path='/create-question' component={(props) => <CreateQuestionPage {...props}></CreateQuestionPage>}></Route>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App;