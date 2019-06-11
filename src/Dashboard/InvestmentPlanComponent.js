import React from 'react';
import NumberFormat from 'react-number-format';
import { RoundIcon } from '../_components/SvgIcon';


class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { prev, current, iconType, name } = this.props;
        return (
            <div className="user-input-list-item">
                <div className="list-item-left">
                    <div className="list-item-icon">
                        <RoundIcon type={iconType} filled={true} />
                    </div>
                    <div className="list-item-title-container">
                        <div className="list-item-title">
                            {name}
                        </div>
                    </div>
                </div>
                <div className="list-item-right">
                    <div>
                        <NumberFormat
                            value={Math.round(prev)}
                            thousandSeparator=' '
                            displayType={'text'}
                            suffix=' &#8381;'
                        />
                    </div>
                    <div>
                        <NumberFormat
                            value={Math.round(current)}
                            thousandSeparator=' '
                            displayType={'text'}
                            suffix=' &#8381;'
                        />
                    </div>
                    <div>{this.props.calcPercent(current, prev)}</div>
                </div>
            </div>
        );
    }
}

class InvestmentPlanComponent extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.store;
    }
    calcPercent = (curr, prev) => {
        let persent;
        if (prev !== 0) {
            persent = Math.round(((curr / prev) - 1) * 100);

            return <span>{persent > 0 && '+'}{persent}%</span>;
        } else return null
    }
    render() {
        // const prevInvestmentAmount = 1000000;
        // const TotalInvestments = 1082000;
        const {
            prevInvestmentAmount,
            prevModerateAmount,
            prevConservativeAmount,
            prevAgressiveAmount,
            TotalInvestments,
            SavedModerateInvestments,
            SavedConservativeInvestments,
            SavedAgressiveInvestments,
        } = this.store.selectedPeriod;
        const prevTotal = prevInvestmentAmount + prevModerateAmount + prevConservativeAmount + prevAgressiveAmount;
        const savedTotal = TotalInvestments + SavedModerateInvestments + SavedConservativeInvestments + SavedAgressiveInvestments;
        return (
            <div className="user-plans-container">
                <h5>Инвестиционный план на год</h5>
                <div className="user-plans-list items-list">
                    <ListItem
                        iconType='building'
                        name='Вклад'
                        prev={prevInvestmentAmount}
                        current={TotalInvestments}
                        calcPercent = {this.calcPercent}
                    />
                    <ListItem
                        iconType='dollar'
                        name='Уверенно'
                        prev={prevModerateAmount}
                        current={SavedModerateInvestments}
                        calcPercent = {this.calcPercent}
                    />
                    <ListItem
                        iconType='house'
                        name='Консервативно'
                        prev={prevConservativeAmount}
                        current={SavedConservativeInvestments}
                        calcPercent = {this.calcPercent}
                    />
                    <ListItem
                        iconType='car'
                        name='Агрессивно'
                        prev={prevAgressiveAmount}
                        current={SavedAgressiveInvestments}
                        calcPercent = {this.calcPercent}
                    />
                    <div className="user-input-list-item _total">
                        <div className="list-item-left">
                            <div className="list-item-title-container">
                                <div className="list-item-title">
                                    Всего
                                </div>
                            </div>
                        </div>
                        <div className="list-item-right">
                            <div>
                                <NumberFormat
                                    value={Math.round(prevTotal)}
                                    thousandSeparator=' '
                                    displayType={'text'}
                                    suffix=' &#8381;'
                                />
                            </div>
                            <div>
                                <NumberFormat
                                    value={Math.round(savedTotal)}
                                    thousandSeparator=' '
                                    displayType={'text'}
                                    suffix=' &#8381;'
                                />
                            </div>
                            <div>{this.calcPercent(savedTotal, prevTotal)}</div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


export default InvestmentPlanComponent;