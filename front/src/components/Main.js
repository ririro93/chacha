import React from 'react';
import Chart from 'chart.js/auto';


class Main extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps) return true;
        return false;
    }

    componentDidUpdate() {
        const { mainQuestion } = this.props;
        if (mainQuestion) {
            const labels = mainQuestion.choices.map(choice => choice.content);
            const data = mainQuestion.choices.map(choice => choice.value);
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
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
       }
    }

    render() {
        const { mainQuestion } = this.props;
        return (
            <div className="py-5 container mx-auto text-center">
                <h1 className="display-4 fw-normal">{mainQuestion ? mainQuestion.content : ''}</h1>
                <canvas id="myChart" width="400" height="100"></canvas>
                <p className="fs-5 text-muted">힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉힝냥닝냥농뇽늉늉</p>
            </div>
        )
    }
}

export default Main;