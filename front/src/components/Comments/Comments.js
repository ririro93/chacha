import React from 'react';
import './Comments.css';

class Comments extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { commentList } = this.props;
        return (
            <div className="d-flex flex-column">
                <textarea className="w-100 mb-2" style={{resize: 'none'}} placeholder="Write your comments"></textarea>
                <button className="btn btn-primary align-self-end mb-3">Submit</button>
                <div className="d-flex flex-column gap-3">
                    { commentList ? commentList.map(comment => 
                        <div key={comment.id} className="comment-item">{comment.content} 
                            <div className="comment-item-info">author: {comment.author}, choice: {comment.choice}</div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Comments;