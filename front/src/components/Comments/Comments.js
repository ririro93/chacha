import React from 'react';
import './Comments.css';
import { Comment, Empty, List, Form, Input, Button, Avatar, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
const { TextArea } = Input;

class AddCommentForm extends React.Component {
    render() {
        const { value, handleChange, submit, disabled } = this.props;
        return (
            <>
                <Form.Item>
                    <TextArea rows={4} value={value} onChange={handleChange} disabled={disabled} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={submit} disabled={disabled}>Add Comment</Button>
                </Form.Item>
            </>
        )
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: '',
            answerForComment: null,
        };
    }

    handleChange(e) {
        this.setState({
            commentContent: e.target.value
        });
    }

    handleRadioChange(e) {
        this.setState({
            answerForComment: e.target.value
        });
    }

    componentDidUpdate() {
        const { myAnswers } = this.props;
        const { answerForComment } = this.state;
        if (myAnswers.length > 0 && answerForComment === null) {
            this.setState({
                answerForComment: myAnswers[0].id
            });
        }
    }

    submit() {
        const { commentContent, answerForComment } = this.state;
        console.log(answerForComment, commentContent);
        const csrftoken = Cookies.get('csrftoken');
        axios.post('api/comments/', {
            author: 1,
            choice: answerForComment,
            content: commentContent
        },
        {
            headers: {
                'X-CSRFToken': csrftoken
            }
        }).then(res => {
            console.log(res);
            window.location.reload();
        });
    }

    render() {
        const { commentList, myAnswers } = this.props;
        const { commentContent } = this.state;
        console.log(commentList);
        return (
            <>
                {
                commentList ?
                    <List
                        dataSource={commentList}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.author}
                                    avatar={item.avatar}
                                    content={item.content}
                                    datetime={item.datetime}
                                >
                                </Comment>
                            </li>
                        )}></List>
                    :
                    <Empty></Empty>
                    }
                
                {
                    myAnswers.length > 0 &&
                    <Radio.Group onChange={this.handleRadioChange.bind(this)} defaultValue={myAnswers[0].id}>
                        {
                            myAnswers.map(answer => 
                                <Radio key={answer.id} value={answer.id}>
                                    {answer.content}
                                </Radio>)
                        }
                    </Radio.Group>
                }
                <Comment 
                    avatar={<Avatar icon={<UserOutlined />} size="large" />}
                    content={<AddCommentForm value={commentContent} handleChange={this.handleChange.bind(this)} submit={this.submit.bind(this)} disabled={myAnswers.length == 0}></AddCommentForm>}
                />
            </>
        );
    }
}



export default Comments;