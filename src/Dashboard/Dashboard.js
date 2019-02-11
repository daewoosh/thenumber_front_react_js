import React from 'react';
import './Dashboard.less';
import { FinanceWidget } from './FinanceWidget';
import { BudgetWidget } from './BudgetWidget';
import { TargetWidget } from './TargetWidget';
import { Main } from './Main';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { getComp } from '../bs_react_lib/utils/bsDI';
import { observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'

@observer
export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: false,
        }
        this.financeStore = getComp('FinanceInputStore');
        this.budgetStore = getComp('BudgetInputStore');
        this.reportStore = getComp('CalcStore');
    }

    componentDidMount() {
        this.financeStore.loadActiveItems();
        this.financeStore.loadPassiveItems();
        this.budgetStore.loadIncomeItems();
        this.budgetStore.loadExpenceItems();
        this.reportStore.getReport();
    }

    onHideClick = () => {
        const currentHide = this.state.hide;
        this.setState({
            hide: !currentHide,
        })
    }
    goTo = (path) => {
        document.location.hash = '/' + path;
    }

    render() {
        const { hide } = this.state;
        const { financeTotal, activeItems, passiveItems } = this.financeStore;
        const { budgetTotal, incomeItems, expenceItems } = this.budgetStore;
        const financeFilled = activeItems.length > 0 || passiveItems.length > 0;
        const budgetFilled = incomeItems.length > 0 || expenceItems.length > 0;
        const { monthlyIncome, pensionAge, reportFilled } = this.reportStore;
        return (
            <div className="dash-container main-flex-container">
                <div className="dash-hide-panel">
                    <h5>Мои данные</h5>
                    {!hide && <div className="dash-hide-control navigation-control" onClick={this.onHideClick}>
                        <img src="assets/img/arrow_up.svg" />
                        <span className="dash-hide-label navigation-label">Скрыть</span>
                    </div>}
                    {hide && <div className="dash-hide-control navigation-control" onClick={this.onHideClick}>
                        <img src="assets/img/arrow_up.svg" className="arrow-rotate" />
                        <span className="dash-hide-label navigation-label">Показать</span>
                    </div>}
                </div>
                <HideComponent isHide={hide}>
                    <div className="dash-widget-panel">
                        <FinanceWidget onClick={(e) => this.goTo('finance')} total={financeTotal} isFilled={financeFilled} />

                        <BudgetWidget onClick={(e) => this.goTo('budget')} total={budgetTotal} isFilled={budgetFilled} />

                        <TargetWidget
                            onClick={(e) => this.goTo('aims')}
                            monthlyIncome={monthlyIncome}
                            pensionAge={pensionAge}
                            isFilled={reportFilled}
                        />
                    </div>
                </HideComponent>
                <div className="dash-main main-panel">
                    <Main />
                </div>
                <ReactTooltip effect="solid"/>
            </div>
        );
    }
}