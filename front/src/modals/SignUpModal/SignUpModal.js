import React from 'react';
import { AppContext } from 'AppContext';
import { Modal, Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './SignUpModal.css';

const { Text } = Typography;

class SignUpModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password1: '',
            password2: '',
            errorMessages: {
                email: '',
                password1: '',
                password2: ''
            }
        };
    }

    handleOk() {
        const { setIsSignUpModalVisible } = this.context;
        setIsSignUpModalVisible(false);
    }

    handleCancel() {
        const { setIsSignUpModalVisible } = this.context;
        setIsSignUpModalVisible(false);
    }

    handleChange(e, type) {
        if (type === 'email') {
            this.setState({
                email: e.target.value
            });
        } else if (type === 'password1') {
            this.setState({
                password1: e.target.value
            });
        } else if (type === 'password2') {
            this.setState({
                password2: e.target.value
            });
        }
    }

    render() {
        const { isSignUpModalVisible, setIsSignUpModalVisible, signUp } = this.context;
        const { errorMessages } = this.state;

        const validateMessages = {
            required: '${label} is required!',
        }

        return (
            <Modal title="Sign Up" visible={ isSignUpModalVisible } onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} footer={null}>
                <Form className="signup-form" validateMessages={validateMessages}>
                    <Form.Item 
                        name="email" 
                        onChange={e => {this.handleChange.bind(this)(e, 'email')}}
                        rules={[
                            {
                                validator: () => errorMessages.email ? Promise.reject(new Error(errorMessages.email)) : Promise.resolve()
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"></Input>
                    </Form.Item>
                    <Form.Item 
                        name="password1" 
                        onChange={e => {this.handleChange.bind(this)(e, 'password1')}}
                        rules={[
                            {
                                validator: () => errorMessages.password1 ? Promise.reject(new Error(errorMessages.password1)) : Promise.resolve()
                            }
                        ]}
                        >
                        <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"></Input>
                    </Form.Item>
                    <Form.Item 
                        name="password2" 
                        rules={[{ required: true, message: 'Please enter your password!' }]} 
                        onChange={e => {this.handleChange.bind(this)(e, 'password2')}}
                        rules={[
                            {
                                validator: () => errorMessages.password2 ? Promise.reject(new Error(errorMessages.password2)) : Promise.resolve()
                            }
                        ]}
                        >
                        <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm password"></Input>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="signup-form-button" onClick={() => {
                            const { email, password1, password2 } = this.state;
                            if (email === '' || password1 === '' || password1 !== password2) {
                                this.setState({
                                    errorMessages: {
                                        email: email === '' ? 'Please enter your email.' : '',
                                        password1: password1 === '' ? 'Please enter your password.' : '',
                                        password2: password1 !== password2 ? 'Confirm your password' : ''
                                    }
                                });
                            } else {
                                signUp(email, password1, password2).then(res => {
                                    if (res.success) {
                                        console.log('Sign Up success'); // Need to be implemented
                                    } else {
                                        const errorMessages = res.messages;
                                        this.setState({
                                            errorMessages: {
                                                email: errorMessages.email ? errorMessages.email[0] : '',
                                                password1: errorMessages.password1 ? errorMessages.password1[0] : '',
                                                password2: errorMessages.password2 ? errorMessages.password2[0] : ''
                                            }
                                        });
                                    }
                                });
                            }
                            
                        }}>Sign Up</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

SignUpModal.contextType = AppContext;

export default SignUpModal;
