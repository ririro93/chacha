import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AppContext } from 'AppContext';
import SignInModal from 'modals/SignInModal';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: localStorage['user-email'] === undefined ? null : localStorage['user-email'],
      isSignInModalVisible: false,
      isSignUpModalVisible: false
    };
  }



  setIsSignInModalVisible(flag) {
    this.setState({
      isSignInModalVisible: flag
    });
  }

  setIsSignUpModalVisible(flag) { 
    this.setState({
      isSignUpModalVisible: flag
    });
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
    console.log('signout');
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
            return true;
        }).catch(res => {
            console.log('Logout failed!');
            return false;
    });
  }

  signUp(email, password1, password2) {
    const csrftoken = Cookies.get('csrftoken');
    return axios.post('api/accounts/signup/',
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
            return {
              success: true
            };
        }).catch(res => {
          const { email, password1 } = res.response.data;
          return {
            success: false,
            messages: {
              email: email,
              password1: password1,
              password2: []
            }
          };
      });
  }
  
  componentDidMount() {
    this.setState({
      userEmail: localStorage['user-email'] === undefined ? null : localStorage['user-email']
    });
  }

  render() {
    const { userEmail, isSignInModalVisible, isSignUpModalVisible } = this.state;

    return(
      <AppContext.Provider value={{
        signIn: this.signIn.bind(this),
        signOut: this.signOut.bind(this),
        signUp: this.signUp.bind(this),
        isSignInModalVisible: isSignInModalVisible,
        isSignUpModalVisible: isSignUpModalVisible,
        setIsSignInModalVisible: this.setIsSignInModalVisible.bind(this),
        setIsSignUpModalVisible: this.setIsSignUpModalVisible.bind(this),
        userEmail: userEmail
      }}>
        <Router>
          <Route path='/' exact component={(props) => (<MainPage {...props} ></MainPage>)}></Route>
        </Router>
      </AppContext.Provider>
    )
  }
}

export default App;