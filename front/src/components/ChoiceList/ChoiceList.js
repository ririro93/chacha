import React from 'react';
import './ChoiceList.css';
import AddChoice from 'components/AddChoiceModal';
import axios from 'axios';
import Cookies from 'js-cookie';

class ChoiceList extends React.Component {
    vote(choice) {
        const csrftoken = Cookies.get('csrftoken');
        axios.post('api/answers/', 
        {
            author: 1,
            choice: choice.id
        }, 
        {
            headers: {
                'X-CSRFToken': csrftoken
            }
        }, res => {
            console.log(res);
        });
    }

    render() {
        const { choiceList, questionId } = this.props;
        return (
            <div className="card w-25">
                <ul className="list-group list-group-flush">
                    { 
                        choiceList ? choiceList.map(choice => 
                            <li className="list-group-item" onClick={() => {this.vote(choice)}} key={choice.id}>{choice.content}</li>
                        ) : ''
                    }
                    <li className="list-group-item" data-bs-toggle="modal" data-bs-target="#addchoice-modal">Add another</li>
                </ul>
                <AddChoice questionId={questionId}></AddChoice>
            </div>
        )
    }
}


export default ChoiceList;