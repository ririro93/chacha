import React from 'react';
import Chart from 'chart.js/auto';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            chart2: null
        };
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps != this.props) return true;
        return false;
    }

    componentDidUpdate() {
        const { mainQuestion } = this.props;
        if (mainQuestion) {
            let { chart, chart2 } = this.state;
            if (chart) chart.destroy();
            if (chart2) chart2.destroy();
            const labels = mainQuestion.choices.map(choice => choice.content);
            const data = mainQuestion.choices.map(choice => choice.value);
            const ctx = document.getElementById('chart').getContext('2d');
            const ctx2 = document.getElementById('chart2').getContext('2d');
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
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

            chart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
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
        this.setState({
            chart: chart,
            chart2: chart2
        });
       }
    }

    render() {
        const { mainQuestion } = this.props;
        return (
            <div className="py-5 mx-auto text-center carousel carousel-dark slide" id="carousel-main-question">
                <div className="carousel-innter">
                    <div className="carousel-item active">
                        <div className="d-block w-75 mx-auto">
                            <h1 className="display-4 fw-normal">{mainQuestion ? mainQuestion.content : ''}</h1>
                            <canvas id="chart" width="400" height="100"></canvas>
                            <p className="fs-5 text-muted">힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="d-block w-75 mx-auto">
                            <h1 className="display-4 fw-normal">{mainQuestion ? mainQuestion.content : ''}</h1>
                            <canvas id="chart2" width="400" height="100"></canvas>
                            <p className="fs-5 text-muted">힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉</p>
                        </div>
                    </div>
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
        )
    }
}

export default Main;