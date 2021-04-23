import React from 'react';
import SignInModal from 'modals/SignInModal';
import SignUpModal from 'modals/SignUpModal';
import { AppContext } from 'AppContext';
import { Layout, Button, Row, Col, Typography, Avatar, Form, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './CreateQuestionPage.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const { Text } = Typography;
const { Header, Content } = Layout;

class CreateQuestionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      choices: ['']
    }
  }

  handleChange(content, type, index) {
    if (type === 'question') {
      this.setState({
        question: content
      });
    } else {
      const { choices } = this.state;
      choices[index] = content;
      this.setState({
        choices: choices
      });
    }
  }

  addChoice() {
    const { choices } = this.state;
    choices.push('');
    this.setState({
      choices: choices
    });
  }

  removeChoice(index) {
    const { choices } = this.state;
    choices.splice(index, 1);
    this.setState({
      choices: choices
    });
  }

  submit() {
    const { history } = this.props;
    const { question, choices } = this.state;
    const { userId } = this.context;
    const csrftoken = Cookies.get('csrftoken');
    console.log(userId, question, choices);
    axios.post('api/questions/', {
      author: userId,
      content: question,
      choices: choices
    }, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    }).then(res => {
      console.log('Successfully posted question!');
      history.push('/');
    }).catch(res => {
      console.log(res);
    });
  }

  render() {
    const { historpy } = this.props;
    const { setIsSignInModalVisible, isSignInModalVisible, userEmail, userName, signOut } = this.context;
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
            <Form 
              labelCol={{ span: 4}}
              >
                  <Form.Item >
                    <Input placeholder="Enter your question" style={{width: '60%'}} onChange={e => this.handleChange(e.target.value, 'question')}></Input>
                  </Form.Item>
                  <Form.Item>
                    <Input placeholder="Enter an answer" style={{width: '60%'}} onChange={e => this.handleChange(e.target.value, 'choice', 0)}></Input>
                  </Form.Item>
                  
                  <Form.List
                    name="names"
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            required={false}
                            key={field.key}
                            
                          >
                            <Input placeholder="Enter an answer" style={{ width: '60%' }} onChange={e => this.handleChange(e.target.value, 'choice', index+1)}/>   
                            {fields.length > 0 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                  remove(field.name);
                                  this.removeChoice(index+1);
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => { 
                              add();
                              this.addChoice();
                            }}
                            style={{ width: '60%' }}
                            icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                </Form.List>
                <Button type="primary" onClick={() => this.submit()}>Submit</Button>
            </Form>
            </Col>
          </Row>
        </Content>
        <SignInModal></SignInModal>
        <SignUpModal></SignUpModal>
      </Layout>
    )
  }
}

CreateQuestionPage.contextType = AppContext;

export default CreateQuestionPage;
