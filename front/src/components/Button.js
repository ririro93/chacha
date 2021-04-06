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
        const { history, to, className } = this.props;

        return(
            <div className="button">
                <a className={className} onClick={() => {history.push(to)}}>{text}</a>
            </div>
        );
    }
}

export default Button;