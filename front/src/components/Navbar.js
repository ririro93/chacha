import axios from 'axios';
import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionQuery: '',
            suggestionList: []
        }
    }

    handleChange(e) {
        const questionQuery = e.target.value;
        this.setState({
            questionQuery: questionQuery
        });

        if (questionQuery) {
            axios.get('http://localhost:8000/api/questions/').then(res => {
                this.setState({
                    suggestionList: res.data
                });
            });
        } else {
            this.setState({
                suggestionList: []
            });
        }
    }
    
    componentDidMount() {
        const searchQuestionInput = document.querySelector('.search-question');
        searchQuestionInput.addEventListener('focusout', e => {
            const suggestions = document.querySelector('.suggestions');
            suggestions.hidden = true;
        });

        searchQuestionInput.addEventListener('focusin', e => {
            const suggestions = document.querySelector('.suggestions');
            suggestions.hidden = false;
        })

    }
    render() {
        const { history } = this.props;
        const { suggestionList } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="d-flex align-items-center fs-5 text-white">
                    <a className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => {history.push('/')}}>멋진로고</a>
                </div>
                <div className="d-flex justify-content-end align-items-end flex-fill mx-2 search-question-wrapper" style={{position: 'relative'}}>
                    <input className="search-question" type="text" placeholder="Search" value={this.state.questionQuery} onChange={this.handleChange.bind(this)}></input>
                    <div className="suggestions">
                        { 
                            suggestionList ? 
                            <ol className="list-group list-group-numbered">
                                { suggestionList.map(suggestion => <li className="list-group-item" key={suggestion.id}>{suggestion.content}</li>) }
                            </ol>
                            : ''
                        }
                    
                    </div>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                         <button type="button" className="btn btn-secondary" onClick={() => {history.push('/create-question')}}>New question</button>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="modal" data-bs-target="#sign-in-modal">Sign in</a>
                    </li>
                </ul>
                
                {// Login modal
                }
                <SignIn></SignIn>
                <SignUp></SignUp>
            </nav>
            
        )
    }
}

export default Navbar;
