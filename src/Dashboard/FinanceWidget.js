import React from 'react';
import './Dashboard.less';
import HideComponent from 'bs_react_lib/components/HideComponent';
import NumberFormat from 'react-number-format';

export class FinanceWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    goToFinance = () => {
        document.location.hash = '/finance';
    }

    render() {
        const { total, isFilled } = this.props;
        return (
            <div className="dash-widget-container" onClick={this.props.onClick}>
                <div className="widget-title">
                    финансы
                    <span className="question" data-tip='Стоимость вашего имущества минус кредиты'><img src="assets/img/question.svg" /></span>

                </div>
                <HideComponent isHide={isFilled === true}>
                    <div className="widget-empty-info">
                        В данном разделе необходимо заполнить  информацию о вас и вашем имуществе.
                </div>
                    <div className="widget-controls form-group">
                        <button className="add-finance">Добавить актив</button>
                        <img src="assets/img/right_arrow.svg" />
                    </div>
                </HideComponent>

                <HideComponent isHide={isFilled === false}>
                    <div className="widget-amount">
                        <NumberFormat
                            value={total}
                            thousandSeparator=' '
                            displayType={'text'}
                        />
                        <span className="suffix"> &#8381;</span>
                    </div>
                    <div className="widget-controls form-group">

                        <div className="finance-img-group">
                            <span><img src="assets/img/apartment_filled.svg" /></span>
                            <span><img src="assets/img/car_filled.svg" /></span>
                            <span><img src="assets/img/dollar_filled.svg" /></span>
                            <span><img src="assets/img/home_filled.svg" /></span>
                        </div>
                        <img src="assets/img/right_arrow.svg" />
                    </div>
                </HideComponent>
            </div>
        );
    }
}