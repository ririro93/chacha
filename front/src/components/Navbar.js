import React from 'react';
import Button from './Button';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userList } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">New Question</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Log in</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
