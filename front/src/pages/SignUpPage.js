import React from 'react';
import Navbar from 'components/Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';

class SignUpPage extends React.Component {
    render() {
        const { history } = this.props;
        const csrftoken = Cookies.get('csrftoken');
        return (
            <div>
                <Navbar history={history} ></Navbar>
                <div className="mt-5 mx-auto w-25">
                    <form>
                        <div>
                            <label className="form-label">email</label>
                            <input type="text" className="form-control" name="email"></input><br></br>
                        </div>
                        <div>
                            <label className="password" name="password1">password</label>
                            <input type="password" className="form-control"></input><br></br>
                            <label className="password" name="password2">confirm</label>
                            <input type="password" className="form-control"></input><br></br>
                        </div>
                        <input type="submit"></input>
                    </form>
                </div>
                <a onClick={() => {
                    const email = document.querySelector("input[name=email]").value;
                    const password1 = document.querySelector("input[name=password1").value;
                    const password2 = document.querySelector("input[name=password2").value;
                    
                    axios.post('http://localhost:8000/accounts/auth/register/',
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

                }}>Sign up</a>
            </div>
        );
    }
}

export default SignUpPage;