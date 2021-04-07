import React from 'react';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';

class JoinPage extends React.Component {
    render() {
        const { history } = this.props;
        const csrftoken = Cookies.get('csrftoken');
        return (
            <div>
                <Navbar history={history} ></Navbar>
                email: <input type="text" name="email"></input><br></br>
                Password: <input type="password" name="password1"></input><br></br>
                confirm: <input type="password" name="password2"></input><br></br>
                <input type="hidden" name="csrfmiddlewaretoken" value={ csrftoken } />
                <a onClick={() => {
                    const email = document.querySelector("input[name=email]").value;
                    const password1 = document.querySelector("input[name=password1").value;
                    const password2 = document.querySelector("input[name=password2").value;
                    
                    console.log(email, password1, password2, csrftoken);
                    axios.post('http://localhost:8000/accounts/auth/register',
                        {
                            email: email,
                            password1: password1,
                            password2: password2
                        },
                        {
                            headers: {
                                'X-CSRFToken': csrftoken
                            },
                        }
                    ).then((res) => {
                        console.log(res);
                    });

                }}>Join</a>
            </div>
        );
    }

    join(email, password, password2) {

    }
}

export default JoinPage;