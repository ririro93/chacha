import React from 'react';
import { AppContext } from 'AppContext';
import { Modal, Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './SignInModal.css';

const { Text } = Typography;

class SignInModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isErrorMessageVisible: false
        };
    }

    handleOk() {
        const { setIsSignInModalVisible } = this.context;
        setIsSignInModalVisible(false);
    }

    handleCancel() {
        const { setIsSignInModalVisible } = this.context;
        setIsSignInModalVisible(false);
    }

    handleChange(e, type) {
        if (type === 'email') {
            this.setState({
                email: e.target.value
            });
        } else if (type === 'password') {
            this.setState({
                password: e.target.value
            });
        }
    }

    render() {
        const { isSignInModalVisible, setIsSignInModalVisible, signIn, setIsSignUpModalVisible } = this.context;
        const { isErrorMessageVisible } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: 'Invalid ${label}',
                password: 'Invalid ${label}'
            } 
        }

        return (
            <Modal title="Log In" visible={ isSignInModalVisible } onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} footer={null}>
                <Form className="signin-form" validateMessages={validateMessages}>
                    <Form.Item 
                        name="email" 
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                        onChange={e => {this.handleChange.bind(this)(e, 'email')}}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"></Input>
                    </Form.Item>
                    <Form.Item 
                        name="password" 
                        rules={[{ required: true, message: 'Please enter your password!' }]} 
                        onChange={e => {this.handleChange.bind(this)(e, 'password')}}>
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"></Input.Password>
                    </Form.Item>
                    { isErrorMessageVisible && <Text type="danger">Please check your email or password.</Text>}

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="signin-form-forgot" href="">
                        Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="signin-form-button" onClick={() => {
                            const { email, password } = this.state;
                            if (email === '' || password === '') return;
                            signIn(email, password).then(status => {
                                if (status) {
                                    setIsSignInModalVisible(false);
                                } else {
                                    this.setState({
                                        isErrorMessageVisible: true
                                    });
                                }
                            });
                        }}>Log in</Button>
                        <Button type="link" onClick={() => {
                            setIsSignInModalVisible(false);
                            setIsSignUpModalVisible(true);
                        }}>Not a member?</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

SignInModal.contextType = AppContext;

export default SignInModal;
