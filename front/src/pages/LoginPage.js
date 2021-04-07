import React from 'react';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';


class LoginPage extends React.Component {
    render() {
        const { history } = this.props;
        const csrftoken = Cookies.get('csrftoken');
        return (
            <div>
                <Navbar history={history} ></Navbar>
                <form>
                    Username: <input type="text"></input><br></br>
                    Password: <input type="password"></input><br></br>
                    <input type="hidden" name="_token" value={ csrftoken } />
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default LoginPage;