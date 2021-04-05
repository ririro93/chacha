import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.children
        }
    }

    render() {
        const { text } = this.state;
        return(
            <div className="Button">
                <button type="button" className="btn btn-link">{text}</button>
            </div>
            
        );
    }
}

export default Button;