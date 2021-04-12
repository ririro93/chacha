import React from 'react';
import Chart from 'chart.js/auto';
import ChoiceList from './ChoiceList';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartList: []
        };
    }

    shouldComponentUpdate(nextProps) {
        if (this.props != nextProps) return true;
        return false;
    }

    componentDidUpdate() {
        const { questionList } = this.props;
        if (questionList) {
            let { chartList } = this.state;
            for (let chart of chartList) {
                chart.destroy();
            }
        }
        const chartList = [];
        for (let [index, question] of questionList.entries()) {
            chartList.push(this.createChart(question, index));
        }
        this.setState({
            chartList: chartList
        });
    }

    createChart(question, index) {
        const labels = question.choices.map(choice => '');
        const ans_counts = question.choices.map(choice => choice.get_ans_count);
        const canvas = document.getElementById('canvas-'+index);
        const ctx = canvas.getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: ans_counts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 20
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    }

    render() {
        const { questionList, commentList } = this.props;
        if (questionList) {
            let { chartList } = this.state;
            for (let chart of chartList) {
                chart.destroy();
            }
        }
        
        return (
            <div>
                <h1>오늘의 질문</h1>
                <div className="py-5 mx-auto text-center carousel carousel-dark slide" id="carousel-main-question">
                    <div className="carousel-innter">
                        {
                            questionList ? 
                            questionList.map((question, index) => 
                                <div className={"carousel-item" + (index === 0 ? "active" : "")} key={index}>
                                    <div className="d-block w-75 mx-auto">
                                        <h2 className="display-4 fw-normal">{question.content}</h2>
                                            <ChoiceList choiceList={question.choices} questionId={question.id} ></ChoiceList>
                                        <canvas id={"canvas-"+index} width="400" height="100"></canvas>
                                        <p className="fs-5 text-muted">abc</p>
                                    </div>
                                </div>
                            )
                            : ''
                        }
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-main-question" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-main-question" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div>
                    <textarea placeholder="Write your comments"></textarea><button>Submit</button>
                    <div>
                        { commentList ? commentList.map(comment => <div key={comment.id}>{comment.content} author: {comment.author}, choice: {comment.choice}</div>) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;