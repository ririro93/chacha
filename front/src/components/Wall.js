import React from 'react';

class Wall extends React.Component {
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
                                    <div>
                                        <span className="text-secondary"><small>written by</small></span> <span>{question.author}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-secondary">
                                        <small>created_at: </small> 
                                    </span>
                                    <small>
                                        {question.created_at.getFullYear()}.{question.created_at.getMonth()}.{question.created_at.getDay()}
                                    </small>
                                </div>
                                <div>
                                    {question.content}
                                </div> 
                                
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Wall;