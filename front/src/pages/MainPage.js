import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import axios from 'axios';


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainQuestion: [], 
      questionList: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/questions/').then(res => {
      const questionList = res.data;
      this.setState({
        questionList: questionList
      })
    });

    axios.get('http://localhost:8000/api/questions/main-question/').then(res => {
      const mainQuestion = res.data.question;
      this.setState({
        mainQuestion: [mainQuestion]
      })
    });
  }

  render() {
    const { history } = this.props;
    const { questionList, mainQuestion } = this.state;
    
    return (
      <div className="App">
        <Navbar history={history} ></Navbar>
        <div className="container">
          <div className="row">
            <Main questionList={mainQuestion}>
            </Main>
          </div>
          <div className="row">
            
          </div>
        </div>
        
      </div>
    )
  }
}

export default MainPage;
