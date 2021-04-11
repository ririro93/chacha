import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import axios from 'axios';
import Cookies from 'js-cookie';

class CreateQuestionPage extends React.Component {
    render() {
        const { history } = this.props;
        const csrftoken = Cookies.get('csrftoken');
        return (
            <div>
                <Navbar history={history} ></Navbar>
                <div className="mx-auto mt-5 w-25">
                    <form name="question-form">
                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea className="form-control" name="content"></textarea>
                        </div>
                        <div>
                            <label className="form-label">Choice 1</label>
                            <input type="text" className="form-control" name="choice1"></input>
                            <label className="form-label">Choice 2</label>
                            <input type="text" className="form-control" name="choice2"></input>
                        </div>

                        <a style={{cursor: 'pointer'}} onClick={() => {
                            const formData = document.forms['question-form'];
                            const reqData = {
                                'content': formData.content.value,
                                'choices': [
                                    formData.choice1.value,
                                    formData.choice2.value
                                ]
                            };
                            axios.post('https://localhost:8000/api/questions/', 
                                reqData,
                                {
                                    headers: {
                                        'X-CSRFToken': csrftoken
                                    },
                                }
                            );
                        }}>Submit</a>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateQuestionPage;