import React from 'react';
import Navbar from 'components/Navbar';


class SignInPage extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div>
                <Navbar history={history} ></Navbar>
                <div className="mt-5 mx-auto w-25">
                    <form>
                        <div>
                            <label className="form-label">email</label>
                            <input type="text" className="form-control"></input><br></br>
                        </div>
                        <div>
                            <label className="password">password</label>
                            <input type="password" className="form-control"></input><br></br>
                        </div>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignInPage;