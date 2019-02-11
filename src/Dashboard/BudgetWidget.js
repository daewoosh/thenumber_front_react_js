import React from 'react';
import './Dashboard.less';
import HideComponent from 'bs_react_lib/components/HideComponent';
import NumberFormat from 'react-number-format';

export class BudgetWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { total, isFilled } = this.props;
        return (
            <div className="dash-widget-container" onClick={this.props.onClick}>
                <div className="widget-title">
                    бюджет
                    <span className="question"><img src="assets/img/question.svg" /></span>
                </div>


                <HideComponent isHide={isFilled === true}>
                    <div className="widget-empty-info">
                        Доходы и расходы, чтобы понять текущее финансовое состояние
                </div>
                    <div className="widget-controls form-group">
                        <button className="add-finance">Добавить</button>
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
                        <button className="add-finance">Добавить</button>
                        <img src="assets/img/right_arrow.svg" />
                    </div>
                </HideComponent>


            </div>
        );
    }
}