import React from 'react';
import Navbar from '../components/Navbar';

class LoginPage extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div>
                <Navbar history={history} ></Navbar>
                <form>
                    Username: <input type="text"></input><br></br>
                    Password: <input type="password"></input><br></br>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default LoginPage;