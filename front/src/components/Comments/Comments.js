import React from 'react';
import './Comments.css';
import { Comment, Empty, List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Comments extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { commentList } = this.props;
        
        const data = commentList.map(comment => {
            return {
                author: comment.author,
                avatar: <Avatar icon={<UserOutlined />} size="large" />,
                content: comment.content,
                datetime: comment.created_at
            }
        });

        return (
            commentList ?
                <List
                    dataSource={data}
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