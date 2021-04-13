import React from 'react';
import Navbar from 'components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

class CreateQuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            choices: ['']
        }
    }
  
    addItem() {
        const choiceList = document.getElementById('choice-list');
        const choiceLabel = document.createElement('label');
        const choiceItem = document.createElement('input');
        const { choices } = this.state;

        choiceLabel.setAttribute('class', 'form-label');
        choiceLabel.innerText = 'Choice ' + (choices.length+1);
        choiceItem.setAttribute('class', 'form-control choice-item');
        choiceItem.setAttribute('name', 'choice-'+choices.length);
        choiceItem.setAttribute('type', 'text');
        choiceItem.addEventListener('change', e => {
            this.handleChange.bind(this)(e)
        });

        choiceList.appendChild(choiceLabel);
        choiceList.appendChild(choiceItem);

        choices.push('');
        this.setState({
            choices: choices
        });
    }

    handleChange(e) {
        const name = e.target.name;
        if (name === 'content') {
            this.setState({
                content: e.target.value
            });
        } else {
            const choiceId = parseInt(e.target.name.split('-')[1]);
            const { choices } = this.state;
            choices[choiceId] = e.target.value;
        }
    }

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
                            <textarea className="form-control" name="content" onChange={e => {
                                this.handleChange.bind(this)(e);
                            }}></textarea>
                        </div>
                        <div id="choice-list">
                            <label className="form-label">Choice 1</label>
                            <input type="text" className="form-control choice-item" name="choice-0" onChange={e => {
                                this.handleChange.bind(this)(e);
                            }}></input>
                        </div>
                        <p onClick={() => this.addItem()} className="text-primary text-decoration-none mt-1 text-end mb-1" style={{cursor: 'pointer'}}>add</p>

                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary mt-3" style={{cursor: 'pointer'}} onClick={() => {
                                const { content, choices } =  this.state;
                                const reqData = {
                                    'content': content,
                                    'choices': choices
                                };
                                axios.post('http://localhost:8000/api/questions/', 
                                    reqData,
                                    {
                                        headers: {
                                            'X-CSRFToken': csrftoken
                                        },
                                    }
                                ).then(res => {
                                    history.push('/');
                                });
                            }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateQuestionPage;