import React from 'react';
import './ChoiceList.css';
import { Radio, Input, Button } from 'antd';
import { AppContext } from 'AppContext';

class ChoiceList extends React.Component {
    state = {
        value: 1
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        const { value } = this.state;
        const { choiceList } = this.props;
        const { userEmail, setIsSignInModalVisible } = this.context;
        const isAuthenticated = userEmail !== null;
        
        return (
            <div>
                <Radio.Group onChange={this.onChange} value={value}>
                    { choiceList.map((choice, i) => 
                        <Radio style={radioStyle} value={i} key={i}>
                            {choice.content}
                        </Radio>)}
                    <Radio style={radioStyle} value={choiceList.length}>
                    More...
                    {value === choiceList.length ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                    </Radio>
                </Radio.Group>
                <Button type="primary"
                    onClick={() => {
                        if (isAuthenticated) {
                            console.log('vote'); // Need to be implemented
                        } else {
                            setIsSignInModalVisible(true);
                        }
                    }}>Vote!</Button>
            </div>
        )
    }
}

ChoiceList.contextType = AppContext;

export default ChoiceList;