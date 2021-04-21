import React from 'react';
import './SignUpModal.css';
import { Link } from 'react-router-dom';
import { AuthContext } from 'AuthContext';

class SignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: ''
        };
    }

    handleChange(e) {
        if (e.target.id === 'input-email') {
            this.setState({
                email: e.target.value
            });
        } else if (e.target.id === 'input-password1') {
            this.setState({
                password1: e.target.value
            });
        } else if (e.target.id === 'input-password2') {
            this.setState({
                password2: e.target.value
            });
        }
    }
    render() {
        const { signUp } = this.context;
        const { email, password1, password2 } = this.state;
        return (
            <div className="modal fade" id="sign-up-modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content d-flex">
                        <div className="signup-header mx-auto mt-5 mb-3">
                            <div className="mt-3"></div>
                            <h3>Sign Up</h3>
                        </div>
                        <div className="signup-body mx-auto">
                            <input id="input-email" className="form-control mx-auto my-2" type="text" placeholder="Email"></input>
                            <input id="input-password1" className="form-control mx-auto my-2" type="password" placeholder="Password"></input>
                            <input id="input-password2" className="form-control mx-auto my-2" type="password" placeholder="Confirm password"></input>
                        </div>
                        <div className="signup-footer d-grid gap-2 mt-3 mb-5 mx-auto">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {signUp(email, password1, password2);}}>Sign Up</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SignUpModal.contextType = AuthContext;

export default SignUpModal;