import React from 'react';
import './ChoiceList.css';
import { Button, Checkbox, Space } from 'antd';
import { AppContext } from 'AppContext';
import axios from 'axios';
import Cookies from 'js-cookie';


class ChoiceItem extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <div
                style={{
                    border: '1px solid gray'
                }}>
                { content }
            </div>
        )
    }
}


class ChoiceList extends React.Component {
    state = {
        checkedList: []
    };

    handleChange(e) {
        console.log(e);
    }

    handleClick(e, choiceId) {
        console.log(e, choiceId);
        const { checkedList } = this.state;
        const index = checkedList.indexOf(choiceId);
        if (index >= 0)
            checkedList.splice(index, 1);
        else
            checkedList.push(choiceId);
        this.setState({
            checkedList: checkedList
        });
    }


    render() {
        const { choiceList, myAnswers } = this.props;
        const { checkedList } = this.state;
        const { userEmail, userId, setIsSignInModalVisible } = this.context;
        const isAuthenticated = userEmail !== null;
        const options = choiceList.map(choice => choice.content);

        const alreadyVoted = myAnswers.length > 0;
        
        return (
            <div>
                <Checkbox.Group style={{width: 300}} value={alreadyVoted ? myAnswers : checkedList} disabled={alreadyVoted} onChange={this.handleChange.bind(this)}>
                    <Space direction="vertical" style={{width: '100%'}}>
                        { 
                            choiceList.map(choice => 
                                <div key={choice.id} className="choice-item" onClick={(e) => this.handleClick.bind(this)(e, choice.id)}>
                                    <Checkbox value={choice.id}>{choice.content}</Checkbox>
                                </div>)
                        }
                        <Button type="primary"
                            onClick={() => {
                                if (isAuthenticated) {
                                    const csrftoken = Cookies.get('csrftoken');
                                    for (let choiceId of checkedList) {
                                        axios.post('api/answers/', {
                                            author: userId,
                                            choice: choiceId
                                        }, {
                                            headers: {
                                                'X-CSRFToken': csrftoken
                                            }
                                        }).then(res => {
                                            console.log(res);
                                            window.location.reload();
                                        });
                                    }
                                } else {
                                    setIsSignInModalVisible(true);
                                }
                            }} disabled={alreadyVoted}>Vote!</Button>
                    </Space>
                </Checkbox.Group>
            </div>
        )
    }
}

ChoiceList.contextType = AppContext;

export default ChoiceList;