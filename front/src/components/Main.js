import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.children
        }
    }

    render() {
        const { text } = this.state;
        return (
            <div className="main">
                <h1>{ text }</h1>
            </div>
        )
    }
}

export default Main;