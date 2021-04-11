import React from 'react';
import Button from './Button';

class Navbar extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="d-flex align-items-center me-auto fs-5 text-white">
                    <a>Home</a>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Button history={history} to="/create-question" className="nav-link">New Question</Button>
                    </li>
                    <li className="nav-item">
                        <Button history={history} to="/login" className="nav-link">Log in</Button>
                    </li>
                    <li className="nav-item">
                        <Button history={history} to="/join" className="nav-link">Join</Button>
                    </li>
                </ul>
            </nav>
            
        )
    }
}

export default Navbar;
