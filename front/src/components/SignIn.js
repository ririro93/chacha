import React from 'react';
import './modal.css';
import { Link } from 'react-router-dom';

class SignIn extends React.Component {
    render() {
        return (
            <div className="modal fade" id="sign-in-modal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content d-flex">
                        <div className="signin-header mx-auto mt-5 mb-3">
                            <div className="mt-3"></div>
                            <h3>Sign In</h3>
                        </div>
                        <div className="signin-body mx-auto">
                            <input className="form-control  mx-auto my-2" type="text" placeholder="Email"></input>
                            <input className="form-control  mx-auto my-2" type="password" placeholder="Password"></input>
                        </div>
                        <div className="signin-footer d-grid gap-2 mt-3 mb-5 mx-auto">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Sign in</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

export default SignIn;