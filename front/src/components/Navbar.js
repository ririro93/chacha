import React from 'react';
import Button from './Button';

class Navbar extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Button history={history} to="/" className="nav-link">Home</Button>
                        </li>
                        <li className="nav-item">
                            <Button history={history} to="/create-question" className="nav-link active">New Question</Button>
                        </li>
                        <li className="nav-item">
                            <Button history={history} to="/login" className="nav-link">Log in</Button>
                        </li>
                        <li className="nav-item">
                            <Button history={history} to="/join" className="nav-link">Join</Button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
