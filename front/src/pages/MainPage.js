import React from 'react';
import axios from 'axios';
import MyChart from 'components/Chart';
import Comments from 'components/Comments';
import ChoiceList from 'components/ChoiceList';
import SignInModal from 'modals/SignInModal';
import SignUpModal from 'modals/SignUpModal';
import { AppContext } from 'AppContext';
import { Layout, Button, Row, Col, Empty, Typography, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Header, Content } = Layout;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainQuestion: null, 
      questionList: [],
      commentList: []
    }
  }

  componentWillUnmount() {
    this.ismounted = false; // any better way?
  }

  getUserName(userId) {
    axios.get('api/users/'+userId).then(res => {
        return res.data.username;
    });
  }

  componentDidMount() {
    this.ismounted = true;
    axios.get('api/questions/').then(res => {
      const questionList = res.data;
      if (this.ismounted) {
        this.setState({
          questionList: questionList
        });
      }
    });

    axios.get('api/questions/main-question/').then(res => {
      const mainQuestion = res.data.question;
      if (this.ismounted) {
        this.setState({
          mainQuestion: mainQuestion
        });
      }
    });

    
    axios.get('api/comments/').then(res => {
      if (this.ismounted) {
        const commentList = res.data;
        const commentDataList = [];
        let pending = Promise.resolve();
        for (let comment of commentList) {
          pending = pending.then(() => 
            axios.get('api/users/'+comment.author).then(res => {
              const userName = res.data.username;
              commentDataList.push({
                author: userName,
                avatar: <Avatar icon={<UserOutlined />} size="large" />,
                content: comment.content,
                datetime: comment.created_at
              });
            }));
        }
        pending.then(() => {
          this.setState({
            commentList: commentDataList
          });
        });
      }
    });
    
  }
  

  

  render() {
    const { mainQuestion, commentList } = this.state;
    const { setIsSignInModalVisible, isSignInModalVisible, userEmail, signOut } = this.context;
    const isAuthenticated = userEmail !== null;
    
    return (
      <Layout>
        <Header>
            <Row width="100%" justify="end" align="middle">
              <Col>
                <Button type="primary"
                  onClick={() => {
                    if (isAuthenticated) {
                      console.log('new question'); // Need to be implemented
                    } else {
                      setIsSignInModalVisible(true);
                    }
                  }}>New Question</Button>
              </Col>
              <Col style={{padding: "0 20px"}}>
                { isAuthenticated ? 
                  <div>
                    <Avatar icon={<UserOutlined />} />
                    <Button type="link" onClick={signOut}>Log out</Button>
                  </div>
                  : 
                  <Button type="link" onClick={() => {
                    setIsSignInModalVisible(true);
                  }}>Log in</Button>
                }
              </Col>
            </Row>
        </Header>
        <Content>
          <Row align="center">
            <Col span={12}>
              {
                mainQuestion ? 
                <>
                  <ChoiceList choiceList={mainQuestion.choices}></ChoiceList>
                  <MyChart style={{margin: "auto"}}
                    question={mainQuestion}
                  ></MyChart>
                </>
                :
                <Empty></Empty>
              }
              
              <Comments commentList={commentList}></Comments>
            </Col>
          </Row>
        </Content>
        <SignInModal></SignInModal>
        <SignUpModal></SignUpModal>
      </Layout>
    )
  }
}

MainPage.contextType = AppContext;

export default MainPage;
