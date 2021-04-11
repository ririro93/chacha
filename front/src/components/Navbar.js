import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

class Navbar extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="d-flex align-items-center fs-5 text-white">
                    <a className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => {history.push('/')}}>멋진로고</a>
                </div>
                <div className="d-flex justify-content-end align-items-end flex-fill mx-2">
                    <input className="search-question" type="text" placeholder="Search"></input>
                </div>
                <ul className="navbar-nav">
                    
                    <li className="nav-item">
                         <button type="button" class="btn btn-secondary">New question</button>
                        
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
