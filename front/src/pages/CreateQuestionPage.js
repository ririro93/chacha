import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from 'AuthContext';


class CreateQuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            choices: ['']
        }
    }
  
    componentDidMount() {
        const { history } = this.props;
        const { userEmail } = this.context;
        const isAuthenticated = userEmail !== null;
        if (!isAuthenticated) {
            history.push('/');
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
        const { history, globalInfo } = this.props;
        const csrftoken = Cookies.get('csrftoken');
        return (
            <div>
                <Navbar history={history} globalInfo={globalInfo} ></Navbar>
                <div className="mx-auto mt-5 w-25">
                    <form name="question-form">
                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea className="form-control" name="content" onChange={this.handleChange.bind(this)}></textarea>
                        </div>
                        <div id="choice-list">
                            <label className="form-label">Choice 1</label>
                            <input type="text" className="form-control choice-item" name="choice-0" onChange={this.handleChange.bind(this)}></input>
                        </div>
                        <p onClick={() => this.addItem()} className="text-primary text-decoration-none mt-1 text-end mb-1" style={{cursor: 'pointer'}}>add</p>

                        <div className="d-flex justify-content-end">
                            <input type="button" class="btn btn-primary mt-3" value="Submit" onClick={() => {
                                const { content, choices } =  this.state;
                                const reqData = {
                                    'content': content,
                                    'choices': choices
                                };
                                axios.post('api/questions/', 
                                    reqData,
                                    {
                                        headers: {
                                            'X-CSRFToken': csrftoken
                                        },
                                    }
                                ).then(res => {
                                    console.log(res);
                                    history.push('/');
                                }).catch(res => {
                                    console.log(res);
                                });
                            }}></input>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

CreateQuestionPage.contextType = AuthContext;

export default CreateQuestionPage;