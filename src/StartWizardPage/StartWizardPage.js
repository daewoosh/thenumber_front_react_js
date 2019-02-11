import React, { Fragment } from 'react';
import { API_PATH } from '../_constants';
import { UserProfileComponent } from '../_components/UserProfileComponent';
import { getComp } from '../bs_react_lib/utils/bsDI';
import { FinanceComponent } from '../FinancePage/FinanceComponent';
import { BudgetComponent } from '../BudgetPage/BudgetComponent';
import HideComponent from 'bs_react_lib/components/HideComponent';
import cx from 'classnames';

export class StartWizardPage extends React.Component {
    constructor(props) {
        super(props);
        this.userStore = getComp('UserProfileStore');
        this.state = {
            currentStep: 1,
            buttonCaption : "Следующий шаг",
        }
        this.financeStore = getComp('FinanceInputStore');
        this.budgetStore = getComp('BudgetInputStore');
    }

    componentDidMount() {
        this.userStore.load();
        this.financeStore.loadActiveItems();
        this.financeStore.loadPassiveItems();
        this.budgetStore.loadIncomeItems();
        this.budgetStore.loadExpenceItems();
    }

    handleGoNext = () => {
        var curStep = this.state.currentStep;
        if (curStep===1)
        {
            var saveRes= this.userStore.saveChanges();
            saveRes.then(()=>{
                this.setState({ currentStep: curStep + 1 });
            }).catch(()=>{});
            return true;
        }
        if (curStep ===2)
        {
            this.setState({buttonCaption : "Завершить"});
        }
        if (curStep ===3)
        {
            document.location.hash = '/home';
            return true;
        }
        this.setState({ currentStep: curStep + 1 });
    }

    render() {
        const avatarUrl = `${API_PATH}/getUserAvatar?userId=${this.userStore.Id}&refresh=${new Date().getTime()}`;
        return (
            <div className="wizard-container">
                <div className="wizard-message">
                    <div className="avatar-container">
                        <img className="user-info-avatar" src={avatarUrl} />
                        <span className="avatar-check">
                            <img src="./assets/img/check-white.svg"/>
                        </span> 
                    </div>
                    <div className="message-txt">
                        <h6>Аккаунт создан!</h6>
                        <p>Для формирования финансового плана Вам нужно рассказать о себе</p>
                    </div>
                </div>
                <div className="wizard-stepper">
                    <div className={cx(
                        'step',
                        {
                            _active: this.state.currentStep === 1,
                            _completed: this.state.currentStep === 2 || this.state.currentStep === 3
                        }
                    )}>
                        {
                            this.state.currentStep === 2 || this.state.currentStep === 3 ?
                            <span className="step-number">
                                <img src="./assets/img/check-blue.svg"/>
                            </span> 
                            :<span className="step-number">1</span>
                        }
                        <span className="step-title">Профиль</span>
                    </div>
                    <hr/>
                    <div className={cx(
                        'step',
                        {
                            _active: this.state.currentStep === 2,
                            _completed: this.state.currentStep === 3
                        }
                    )}>
                        {
                            this.state.currentStep === 3 ?
                            <span className="step-number">
                                <img src="./assets/img/check-blue.svg"/>
                            </span> 
                            :<span className="step-number">2</span>
                        }
                        <span className="step-title">Финансы</span>
                    </div>
                    <hr/>
                    <div className={cx(
                        'step',
                        {
                            _active: this.state.currentStep === 3,
                        }
                    )}>
                        <span className="step-number">3</span>
                        <span className="step-title">Бюджет</span>
                    </div>
                </div>
                <div className="wizard-content">
                    <HideComponent isHide={this.state.currentStep !== 1}>
                        <UserProfileComponent showAvatar={false} />
                    </HideComponent>
                    <HideComponent isHide={this.state.currentStep !== 2}>
                        <FinanceComponent name={'Финансы'}/>
                    </HideComponent>
                    <HideComponent isHide={this.state.currentStep !== 3}>
                        <BudgetComponent name={'Бюджет'}/>
                    </HideComponent>
                    <div className="form-group">
                        <button 
                            className="button-wide" 
                            onClick={this.handleGoNext}
                        >
                            {this.state.buttonCaption}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

//export default StartWizardPage;