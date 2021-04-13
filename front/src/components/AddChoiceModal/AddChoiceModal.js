import React from 'react';
import './AddChoiceModal.css';
import axios from 'axios';
import Cookies from 'js-cookie';

class AddChoiceModal extends React.Component {
    addChoice() {
        const csrftoken = Cookies.get('csrftoken');
        const { questionId } = this.props;
        const choiceContent = document.getElementById('choice-content').value;
        axios.post('api/choices/',
            {
                'author': 1,
                'question': questionId,
                'content': choiceContent
            },
            {
                headers: {
                    'X-CSRFToken': csrftoken
                },
            }
        ).then(res => {
            console.log(res);
        });
    }


    render() {
        return (
            <div className="modal fade" id="addchoice-modal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content d-flex">
                        <div className="addchoice-header mx-auto mt-5 mb-3">
                            <div className="mt-3"></div>
                            <h3>Add Choice</h3>
                        </div>
                        <div className="addchoice-body mx-auto">
                            <textarea id="choice-content" className="form-control  mx-auto my-2" placeholder="Write your answer"></textarea>
                        </div>
                        <div className="addchoice-footer d-grid gap-2 mt-3 mb-5 mx-auto">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {this.addChoice()}}>Submit</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddChoiceModal;