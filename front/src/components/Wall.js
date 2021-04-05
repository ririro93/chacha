import React from 'react';

class Wall extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { questionList } = this.props;
        console.log(questionList[0]);
    }

    render() {
        const { questionList } = this.props;

        for (let question of questionList) {
            question.created_at = new Date(question.created_at);
            question.updated_at = new Date(question.updated_at);
        }

        return(
            <div>
                <div className="card" style={{width: "20rem"}}>
                    <h5 className="card-title">Recent Questions</h5>
                    { 
                        questionList.map(question => 
                            <div key={question.id}>
                                <div>
                                    <div>Author: {question.author}</div>
                                </div>

                                <div>{question.content}</div> created_at: {question.created_at.getFullYear()}.{question.created_at.getMonth()}.{question.created_at.getDay()}
                            </div>
                    )}
                </div>
                
            </div>
        );
    }
}

export default Wall;