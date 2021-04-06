import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

class CreateQuestionPage extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div>
                <Navbar history={history} ></Navbar>
                <form className="w-25">
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input type="email" className="form-control"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea className="form-control"></textarea>
                    </div>
                    <Button history={history} >Submit</Button>
                </form>
            </div>
        );
    }
}

export default CreateQuestionPage;