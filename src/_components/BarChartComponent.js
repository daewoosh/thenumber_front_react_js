import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { observable, action, toJS } from 'mobx';
import NumberFormat from 'react-number-format';


class CustomTooltip extends React.Component {

    render() {
        const { active } = this.props;

        if (active) {
            const { payload, label } = this.props;
            return (
                <div className="barChart-tooltip">
                    <div className="tooltip-col">
                        <span className="tooltip-col-title">Капитал</span>
                        <span className="tooltip-col-value">
                            <NumberFormat
                                value={Math.round(`${payload[0].value}`)}
                                thousandSeparator=' '
                                displayType={'text'}
                                suffix=' &#8381;'
                            />
                        </span>
                    </div>
                    <div className="tooltip-col">
                        <span className="tooltip-col-title">Расходы</span>
                        <span className="tooltip-col-value">
                            <NumberFormat
                                value={Math.round(`${payload[1].value}`)}
                                thousandSeparator=' '
                                displayType={'text'}
                                suffix=' &#8381;'
                            />
                        </span>
                    </div>
                </div>
            );
        }
        return (
            <div className="barChart-tooltip">
                <div className="tooltip-col">
                    <span className="tooltip-col-title">Капитал</span>
                </div>
                <div className="tooltip-col">
                    <span className="tooltip-col-title">Расходы</span>

                </div>
            </div>
        );
    }
}




class BarChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.chart = null;
        this.translatedWidth = 0;
        this.myChart = React.createRef()
    }

    componentDidMount() {
        this.chart = document.getElementById('translated-block');
        this.currentClickCount = 0;//количество выполненных кликов по кнопкам скролла графика
    }

    handleTestBarClick = () => {
        alert('Клик на столбец!!!')
    }

    onBackClick = () => {
        if (this.currentClickCount === 0)//если находимся в начале, то график не смещаем
            return;
        this.translatedWidth = this.translatedWidth + this.translateOffset; //двигать надо не на 200, а на пол ширины контейнера с графиком
        this.chart.style.transform = `translateX(${this.translatedWidth}px)`;
        this.currentClickCount--; //при сдвиге влево уменьшаем счетчик
    }

    onFrontClick = () => {

        //TODO выполнять этот расчет один раз при получении графика
        //но пока что не получается из за того что в другом месте если вызываю то this.myChart.current === null

        const width = this.myChart.current.offsetWidth;//ширина контейнера с графиком
        this.translateOffset = width / 2; //двигаем картинку на половину
        this.maxClicks = Math.ceil(this.chartLength / this.translateOffset - 2);
        //определяем сколько раз можно сдвинуть график
        //нужно посчитать сколько частей ширины translateOffset составляет вся ширина графика
        //из полученный величины вычитаем видимую часть графика, т.к. она уже перед нами
        //TODO на resize контейнера с графиком пересчитывать все и двигать его в начало, а то сбивается количество кликов

        if (this.currentClickCount === this.maxClicks) //если накликали максимум , то график не двигаем
            return;
        this.translatedWidth = this.translatedWidth - this.translateOffset; //двигать надо не на 200, а на пол ширины контейнера с графиком
        this.chart.style.transform = `translateX(${this.translatedWidth}px)`;
        this.currentClickCount++; //при сдвиге вправо увеличиваем счетчик
    }

    calcOffset = (chartWidth) => {
        if (this.myChart.current) {
            const width = this.myChart.current.offsetWidth;
            this.translateOffset = width / 2;
            this.maxClicks = Math.floor((chartWidth / this.translateOffset) - width);
        }
    }

    render() {
        const { data } = this.props;
        const chartWidth = data.length * 80;
        //  this.calcOffset(chartWidth);
        this.chartLength = chartWidth;
        // this.maxClicks = Math.ceil(chartWidth / 400);//TODO нужно расчитать сколько раз можно пролистать график
        return (
            <div className="barChart-wrapper" ref={this.myChart}>
                <h4><span>Финансовый план </span><span className="question"><img src="assets/img/question.svg" /></span></h4>
                <div className="barChart-container">
                    <div id="translated-block">
                        <BarChart
                            width={chartWidth}
                            height={200}
                            data={data}
                            id={'chart'}
                        >
                            <CartesianGrid strokeDasharray="0 0" />
                            <XAxis dataKey="CurrentYear" />
                            {/* <YAxis/> */}
                            <Tooltip
                                content={<CustomTooltip />}
                                offset={-120}
                                //coordinate={{x: 30, y: 40}}
                                // position={{x: 0, y: 0}}
                            />
                            <Bar
                                barSize={60}
                                dataKey="Capital"
                                stackId="a"
                                fill="#3D6AC7"
                                onClick={this.props.onBarClick}
                            />
                            <Bar
                                barSize={60}
                                dataKey="TotalExpencesWithPrevious"
                                stackId="a"
                                fill="#39D0E7"
                                onClick={this.props.onBarClick}
                            />
                        </BarChart>
                    </div>
                </div>
                <div className="barChart-controls">
                    <a onClick={this.onBackClick} className="barChart-arrow _back">
                        <img src="./assets/img/right_arrow.svg" />
                    </a>
                    <a onClick={this.onFrontClick} className="barChart-arrow _front">
                        <img src="./assets/img/right_arrow.svg" />
                    </a>
                </div>
            </div>
        );
    }
}


export default BarChartComponent;