import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Wall from '../components/Wall';
import axios from 'axios';
import Cookies from 'js-cookie';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainQuestion: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/questions/main/').then(res => {
      const mainQuestion = res.data.question;
      mainQuestion.choices = [res.data.choice1, res.data.choice2];
      this.setState({
        mainQuestion: mainQuestion
      });
    });
      /*
    const csrftoken = Cookies.get('csrftoken');
    axios.post('http://localhost:8000/accounts/login/', {
      email: 'ephong93@gmail.com',
      password: '14321432'
    }, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    }).then(res => {
      const tokenKey = res.data.key;
      console.log(tokenKey);
      axios.get('http://localhost:8000/api/questions/main/', {
        token: tokenKey
      }).then(res => {
        this.setState({
          mainQuestion: res.data
        });
        console.log(res.data);
      });
      
    });
*/
    
    /*
    const mainQuestion = {
      'author': 0,
      'content': 'Question content',
      'created_at': Date.now(),
      'updated_at': Date.now(),
      'last_main': Date.now(),
      'choices': [
        {
          'id': 0,
          'content': 'Choice A',
          'value': 30
        },
        {
          'id': 1,
          'content': 'Choice B',
          'value': 60
        },
        {
          'id': 2,
          'content': 'Choice C',
          'value': 10
        }
      ]
    }
    */

    
    axios.get('http://localhost:8000/api/questions/main-question/').then(res => {
      console.log(res.data);  

    });
   
  }

  render() {
    const { history } = this.props;
    const { mainQuestion, questionList } = this.state;

    
    return (
      <div className="App">
        <Navbar history={history} ></Navbar>
        <div className="container">
          <div className="row">
            <Main mainQuestion={mainQuestion}>
            </Main>
          </div>
          <div className="row">
            <div className="col-sm">
              <Wall questionList={questionList}></Wall>
            </div>
            <div className="col-sm">
              <Wall></Wall>
            </div>
            <div className="col-sm">
              <Wall></Wall>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default MainPage;
