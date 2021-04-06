import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Wall from '../components/Wall';

class MainPage extends React.Component {
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
    const { questionList } = this.state;
    const { history } = this.props;

    return (
      <div className="App">
        <Navbar history={history} ></Navbar>
        <div className="container">
          <div className="row">
            <Main>
              Main!
            </Main>
          </div>
          <div className="row">
            <div className="col-sm">
              <Wall questionList={questionList}></Wall>
            </div>
            <div className="col-sm">
              <Wall questionList={questionList}></Wall>
            </div>
            <div className="col-sm">
              <Wall questionList={questionList}></Wall>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default MainPage;
