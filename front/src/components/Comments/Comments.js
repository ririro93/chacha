import React from 'react';
import './Comments.css';
import { Comment, Empty, List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

class Comments extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { commentList } = this.props;

        return (
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
            
        );
    }
}

export default Comments;