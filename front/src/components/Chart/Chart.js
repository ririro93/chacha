import React from 'react';
import Chart from 'chart.js/auto';
import { Empty } from 'antd';

class MyChart extends React.Component {
    constructor(props) {
        super(props);
        this.chart = null;
        this.canvasRef = React.createRef();

        
    }

    /*
    shouldComponentUpdate(nextProps) {
        const nextQuestion = nextProps.question;
        const { question } = this.props;
        console.log(question, nextQuestion, this.chart);
        if (question !== nextQuestion) return true;
        return false;
    }
    */

    componentDidMount() {
        const { question } = this.props;
        if (question !== null && this.chart === null) {
            this.chart = this.createChart(question);
        }
    }

    componentDidUpdate() {
        const { question } = this.props;
        if (question === null) return;
        if (this.chart !== null) {
            this.chart.destroy();
        }
        this.chart = this.createChart(question);
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    createChart(question) {
        const labels = question.choices.map(choice => 'Vote to check the result');
        const ans_counts = question.choices.map(choice => choice.get_ans_count);
        const canvas = this.canvasRef.current;
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
        const { question, style } = this.props;
        return (
            <canvas ref={this.canvasRef} width="400" height="400" style={style}></canvas>
        );
    }
}

export default MyChart;