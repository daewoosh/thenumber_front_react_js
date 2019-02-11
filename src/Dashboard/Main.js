import React, { Fragment } from 'react';
import BarChartComponent from '../_components/BarChartComponent';
import UserInfoWidget from './UserInfoWidget';
import UserTargetStepsComponent from './UserTargetStepsComponent';
import InvestmentPlanComponent from './InvestmentPlanComponent';
import { getComp } from '../bs_react_lib/utils/bsDI';
import { observer } from 'mobx-react';
import HideComponent from 'bs_react_lib/components/HideComponent';
import PeriodExpencesComponent from './PeriodExpencesComponent';

@observer
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.reportStore = getComp('CalcStore');
    }

    selectOtherPeriod = (period) => {
        debugger;
        this.reportStore.selectPeriod(period.CurrentYear);
    }

    render() {
        const { selectedPeriod, decemberPeriods, reportFilled } = this.reportStore;
        return (
            <Fragment>
                <HideComponent isHide={reportFilled === true}>
                    <div className="dash-empty">
                        <div className="dash-empty-content">
                            <img src="assets/img/chart.svg" />
                            <div className="flex-center title">
                                <span>Финансовый план</span>
                            </div>
                            <div className="info">
                                <div>Введенные параметры не позволяют произвести расчет. </div>
                                <div>Проверьте введенные данные в разделе финансы и бюджет.</div>
                            </div>
                        </div>
                    </div>
                </HideComponent>
                <HideComponent isHide={reportFilled === false}>
                    <BarChartComponent
                        data={decemberPeriods}
                        onBarClick={this.selectOtherPeriod}
                    />
                    <div className="variable-data">
                        <UserInfoWidget
                            age={selectedPeriod.CurrentAge}
                            funds={selectedPeriod.Kapital}
                            expense={selectedPeriod.TotalExpencesWithPrevious}
                        />
                        <div className="user-plans-wrapper">
                            {/* <UserTargetStepsComponent /> */}
                            <InvestmentPlanComponent store={this.reportStore}/>
                            <PeriodExpencesComponent selectedPeriod = {selectedPeriod}/>
                        </div>
                    </div>
                </HideComponent>
            </Fragment>
        );
    }
}