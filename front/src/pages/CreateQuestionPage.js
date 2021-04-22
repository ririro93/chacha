import React from 'react';
import SignInModal from 'modals/SignInModal';
import SignUpModal from 'modals/SignUpModal';
import { AppContext } from 'AppContext';
import { Layout, Button, Row, Col, Empty, Typography, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Form from 'antd/lib/form/Form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Header, Content } = Layout;

class CreateQuestionPage extends React.Component {
  constructor(props) {
    super(props);
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
              <Form>
                
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
