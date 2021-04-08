import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Wall from '../components/Wall';
import axios from 'axios';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      userList: []
    }
  }

  componentDidMount() {
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
    const questionList = [];
    this.setState({
      mainQuestion: mainQuestion,
      questionList: questionList
    });

    /*
    axios.get('http://localhost:8000/api/questions/main').then(res => {
      this.setState({
        mainQuestion: res.data
      });
    });
    axios.get('http://localhost:8000/api/questions/list').then(res => {
      this.setState({
        questionList: res.data
      });
    });
    */
   
  }

  render() {
    const { history } = this.props;
    const { mainQuestion, questionList } = this.state;

    return (
      <div className="App">
        <Navbar history={history} ></Navbar>
        <div className="container">
          <Main mainQuestion={mainQuestion}>
          </Main>
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
