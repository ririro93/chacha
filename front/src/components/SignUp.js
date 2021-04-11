import React from 'react';
import './modal.css';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    render() {
        return (
            <div className="modal fade" id="sign-up-modal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content d-flex">
                        <div className="signup-header mx-auto mt-5 mb-3">
                            <div className="mt-3"></div>
                            <h3>Sign Up</h3>
                        </div>
                        <div className="signup-body mx-auto">
                            <input className="form-control mx-auto my-2" type="text" placeholder="Email"></input>
                            <input className="form-control mx-auto my-2" type="password" placeholder="Password"></input>
                            <input className="form-control mx-auto my-2" type="password" placeholder="Confirm password"></input>
                        </div>
                        <div className="signup-footer d-grid gap-2 mt-3 mb-5 mx-auto">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Sign Up</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;