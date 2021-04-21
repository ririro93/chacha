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
            isErrorMessageVisible: false
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
            <Modal title="Sign Up" visible={ isSignUpModalVisible } onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} footer={null}>
                <Form className="signup-form" validateMessages={validateMessages}>
                    <Form.Item 
                        name="email" 
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                        onChange={e => {this.handleChange.bind(this)(e, 'email')}}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"></Input>
                    </Form.Item>
                    <Form.Item 
                        name="password1" 
                        rules={[{ required: true, message: 'Please enter your password!' }]} 
                        onChange={e => {this.handleChange.bind(this)(e, 'password1')}}>
                        <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"></Input>
                    </Form.Item>
                    <Form.Item 
                        name="password2" 
                        rules={[{ required: true, message: 'Please enter your password!' }]} 
                        onChange={e => {this.handleChange.bind(this)(e, 'password2')}}>
                        <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm password"></Input>
                    </Form.Item>
                    { isErrorMessageVisible && <Text type="danger">Invalid email or password.</Text>}

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="signup-form-button" onClick={() => {
                            const { email, password1, password2 } = this.state;
                            if (email === '' || password1 === '' || password2 === '') return;
                            signUp(email, password1, password2).then(status => {
                                console.log(status);
                            });
                            
                        }}>Sign Up</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

SignUpModal.contextType = AppContext;

export default SignUpModal;
