import React from 'react';
import HideComponent from 'bs_react_lib/components/HideComponent';
import NumberFormat from 'react-number-format';

export class TargetWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (isFilled) => {
        if (isFilled === true)
            this.props.onClick();
        else return false;
    }

    getAgeEnding = (age) => {
        debugger;
        if (age) {
            var ageStr = age.toString();
            if (ageStr.endsWith(1))
                return 'год';
            if (ageStr.endsWith(2) || ageStr.endsWith(3) || ageStr.endsWith(4))
                return 'года';
            return 'лет';
        }
    }


    render() {
        const { monthlyIncome, pensionAge, isFilled } = this.props;
        return (
            <div className="dash-widget-container" onClick={() => this.handleClick(isFilled)}>
                <div className="widget-title">
                    Цели
                  </div>
                <HideComponent isHide={isFilled === true}>
                    <div className="widget-empty-info">
                        То, что реально получить при текущей ситуации
                </div>
                </HideComponent>
                <HideComponent isHide={isFilled === false}>
                    <div className="widget-amount">
                        {/* {Math.round(monthlyIncome)}<span className="suffix"> &#8381;/мес</span> */}
                        <NumberFormat
                            value={Math.round(monthlyIncome)}
                            thousandSeparator=' '
                            displayType={'text'}
                        />
                        <span className="suffix"> &#8381;/мес</span>
                    </div>
                    возраст - {pensionAge} {this.getAgeEnding(pensionAge)}
                </HideComponent>
                <div className="widget-controls form-group">
                    <button className="add-finance">
                        {
                            isFilled === true
                                ? <span><img src="./assets/img/pencil_icon-w.svg" style={{ marginRight: 5 }} />Изменить</span>
                                : 'Задать цель'
                        }
                    </button>
                    <img src="assets/img/right_arrow.svg" />
                </div>
            </div>
        );
    }
}