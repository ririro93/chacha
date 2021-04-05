import React from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Wall from './components/Wall';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      userList: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/questions/').then(res => {
      this.setState({
        questionList: res.data
      });
    });
    axios.get('http://localhost:8000/api/users/').then(res => {
      this.setState({
        userList: res.data
      });
    });
  }

  render() {
    const { questionList, userList } = this.state;
    return (
      <div className="App">
        <Navbar userList={userList}></Navbar>
        <Main>
        </Main>
        <Wall questionList={questionList}></Wall>
        
      </div>
    )
  }
}

export default App;
