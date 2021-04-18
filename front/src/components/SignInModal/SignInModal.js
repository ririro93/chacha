import React from 'react';
import './SignInModal.css';
import { Link } from 'react-router-dom';
import { Modal } from 'bootstrap';
import { AuthContext } from 'AuthContext';

class SignInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: false
        };
    }

    handleChange(e) {
        if (e.target.id === 'input-email') {
            this.setState({
                email: e.target.value
            });
        } else if (e.target.id === 'input-password') {
            this.setState({
                password: e.target.value
            });
        }
    }

    render() {
        const { email, password, errorMessage } = this.state;
        const { modal } = this.props;
        const { signIn } = this.context;
        return (
            <div className="modal fade" id="sign-in-modal" aria-hidden="true" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content d-flex">
                        <div className="signin-header mx-auto mt-5 mb-3">
                            <div className="mt-3"></div>
                            <h3>Sign In</h3>
                        </div>
                        <div className="signin-body mx-auto">
                            <input id="input-email" className="form-control  mx-auto my-2" type="text" placeholder="Email" onChange={this.handleChange.bind(this)} value={email}></input>
                            <input id="input-password" className="form-control  mx-auto my-2" type="password" placeholder="Password" onChange={this.handleChange.bind(this)} value={password}></input>
                            <span className="text-danger" 
                                style={{
                                    display: errorMessage ? "inline" : "none"
                                }}
                                >Please check you email or password</span>
                        </div>
                        <div className="signin-footer d-grid gap-2 mt-3 mb-5 mx-auto">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                                signIn(email, password).then(isSuccessful => {
                                    if (isSuccessful) {
                                        console.log('Login succeeded!');
                                        modal.hide();
                                    } else {
                                        this.setState({
                                            errorMessage: true
                                        });
                                    }
                                }).catch(res => {
                                    console.log('catch!');
                                });
                            }}>Sign in</button>
                            <button type="button" className="btn btn-secondary" onClick={() => {modal.hide();}}>Close</button>
                            <div className="text-end">
                                <Link to="/" data-bs-dismiss="modal" className="text-decoration-none fs-6">Forgot password</Link><br></br>
                                <a data-bs-target="#sign-up-modal" data-bs-toggle="modal" data-bs-dismiss="modal" className="text-decoration-none fs-6">Not a member?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SignInModal.contextType = AuthContext;

export default SignInModal;