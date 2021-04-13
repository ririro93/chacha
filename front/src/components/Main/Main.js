import React from 'react';
import Chart from 'chart.js/auto';
import ChoiceList from 'components/ChoiceList';
import Comments from 'components/Comments';


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

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    createChart(question, index) {
        const labels = question.choices.map(choice => 'Vote to check the result');
        const ans_counts = question.choices.map(choice => choice.get_ans_count);
        const canvas = document.getElementById('canvas-'+index);
        const ctx = canvas.getContext('2d');
        const colors = [];
        for (let i = 0; i < question.choices.length; i++) {
            colors.push(this.getRandomColor());
        }
        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: ans_counts,
                    borderWidth: 1,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: false,
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
            <div className="p-5">
                <h1 className="text-center">오늘의 질문</h1>
                <div className="py-5 mx-auto text-center carousel carousel-dark slide" id="carousel-main-question">
                    <div className="carousel-innter">
                        {
                            questionList ? 
                            questionList.map((question, index) => 
                                <div className={"carousel-item" + (index === 0 ? "active" : "")} key={index}>
                                    <div className="d-flex flex-column gap-5 align-items-center w-75 mx-auto">
                                        <h2 className="fw-normal">{question.content}</h2>
                                        <ChoiceList choiceList={question.choices} questionId={question.id} ></ChoiceList>
                                        <canvas id={"canvas-"+index} width="400" height="400"></canvas>
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
                    <Comments commentList={commentList} ></Comments>
                </div>
            </div>
        )
    }
}

export default Main;