import React from 'react';
import NumberFormat from 'react-number-format';
import { RoundIcon } from '../_components/SvgIcon';


class InvestmentPlanComponent extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.store;
    }
    calcPercent = (curr, prev) => {
        let persent;
        if (prev !== 0 ) {
            persent = Math.round(((curr/prev)-1)*100);

            return  <span>{persent>0 && '+'}{persent}%</span>;
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
        const prevTotal = prevInvestmentAmount+prevModerateAmount+prevConservativeAmount+prevAgressiveAmount;
        const savedTotal = TotalInvestments+SavedModerateInvestments+SavedConservativeInvestments+SavedAgressiveInvestments;
        return (
            <div className="user-plans-container">
                <h5>Инвестиционный план на год</h5>
                <div className="user-plans-list items-list">
                    <div className="user-input-list-item">
                        <div className="list-item-left">
                            <div className="list-item-icon">
                                <RoundIcon type={'building'} filled={true} />
                            </div>
                            <div className="list-item-title-container">
                                <div className="list-item-title">
                                    Вклад
                                </div>
                            </div>
                        </div>
                        <div className="list-item-right">
                            <div>{Math.round(prevInvestmentAmount)}&#8381;</div>
                            <div>{Math.round(TotalInvestments)}&#8381;</div>
                            <div>{this.calcPercent(TotalInvestments,prevInvestmentAmount)}</div>
                        </div>
                    </div>
                    <div className="user-input-list-item">
                        <div className="list-item-left">
                            <div className="list-item-icon">
                                <RoundIcon type={'dollar'} filled={true} />
                            </div>
                            <div className="list-item-title-container">
                                <div className="list-item-title">
                                    Уверенно
                                </div>
                            </div>
                        </div>
                        <div className="list-item-right">
                            <div>{Math.round(prevModerateAmount)}&#8381;</div>
                            <div>{Math.round(SavedModerateInvestments)}&#8381;</div>
                            <div>{this.calcPercent(SavedModerateInvestments,prevModerateAmount)}</div>
                        </div>
                    </div>
                    <div className="user-input-list-item">
                        <div className="list-item-left">
                            <div className="list-item-icon">
                                <RoundIcon type={'house'} filled={true} />
                            </div>
                            <div className="list-item-title-container">
                                <div className="list-item-title">
                                    Консервативно
                                </div>
                            </div>
                        </div>
                        <div className="list-item-right">
                            <div>{Math.round(prevConservativeAmount)}&#8381;</div>
                            <div>{Math.round(SavedConservativeInvestments)}&#8381;</div>
                            <div>{this.calcPercent(SavedConservativeInvestments,prevConservativeAmount)}</div>
                        </div>
                    </div>
                    <div className="user-input-list-item">
                        <div className="list-item-left">
                            <div className="list-item-icon">
                                <RoundIcon type={'car'} filled={true} />
                            </div>
                            <div className="list-item-title-container">
                                <div className="list-item-title">
                                    Агрессивно
                                </div>
                            </div>
                        </div>
                        <div className="list-item-right">
                            <div>{Math.round(prevAgressiveAmount)}&#8381;</div>
                            <div>{Math.round(SavedAgressiveInvestments)}&#8381;</div>
                            <div>{this.calcPercent(SavedAgressiveInvestments,prevAgressiveAmount)}</div>
                        </div>
                    </div>
                    <div className="user-input-list-item _total">
                        <div className="list-item-left">
                            <div className="list-item-title-container">
                                <div className="list-item-title">
                                    Всего
                                </div>
                            </div>
                        </div>
                        <div className="list-item-right">
                            <div>{Math.round(prevTotal)}&#8381;</div>
                            <div>{Math.round(savedTotal)}&#8381;</div>
                            <div>{this.calcPercent(savedTotal,prevTotal)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default InvestmentPlanComponent;