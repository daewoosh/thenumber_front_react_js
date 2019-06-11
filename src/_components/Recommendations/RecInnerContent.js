import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { getComp } from '../../bs_react_lib/utils/bsDI';
import FormInput from '../FormInput/FormInput';
import { SuccessToast, ErrorToast } from '../Notification';
import { ajaxReq } from '_services/WebApi';
import InvestmentStore from './InvestmentStore';

const saveInvestmentReq = (params) => {
    const res = ajaxReq('AcceptInvestmentRecommendation', 'POST', params, true)
    return res;
}

const rejectInvestmentRec = (params) => {
    const res = ajaxReq('RejectInvestmentRecommendation', 'POST', params, true)
    return res;
}

@observer
export class RecInnerContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { description, hintText } = this.props;
        debugger;
        return (
            <div className="rec-item-content">
                <h6>{description}</h6>
                <p>{hintText}</p>
                <div className="rec-item-action">
                    <div className="rec-item-input">
                        <FormInput type='select' options={this.props.options} value={this.props.selectedAccount} onChange={this.props.onChange} />
                        <button className="button" onClick={this.props.onSaveClick}>Готово</button>
                    </div>
                    <button className="button rec-cancel-btn" onClick={this.props.onRejectClick}>Отказаться от выполнения</button>
                </div>
            </div>
        );
    }
}

@observer
export class RecComp2 extends React.Component {
    constructor(props) {
        super(props);
        this.store = getComp('ReserveFundRecStore');
    }

    componentDidMount() {
        var loadRes = this.store.loadHoldings();
    }

    handleSelectionChange = (selectedFinance) => {
        debugger;
        this.store.setSelection(selectedFinance.value);
        this.setState({ selectedAccount: selectedFinance.value });
        this.forceUpdate()
    }
    onSaveClick = () => {
        var saveRes = this.store.save();
        saveRes.then(() => {
            SuccessToast('Вклад помечен как резервный');
            const reportStore = getComp('CalcStore');
            reportStore.getReport(true);

        })
            .catch(err => {
                ErrorToast(err);
            });
    }
    onRejectClick = () => {
        var rejectRes = this.store.reject();
        rejectRes.then(() => {
            SuccessToast('Рекомендация отклонена');
            const reportStore = getComp('CalcStore');
            reportStore.getReport(true);

        })
            .catch(err => {
                ErrorToast(err);
            });
    }

    render() {
        const { selectedItem, holdings, holdingsOptions } = this.store;
        const { recommendation } = this.props;
        let opts = [];
        debugger;
        if (holdingsOptions && holdingsOptions.length > 0) {
            opts = toJS(holdingsOptions);
        }
        opts.push({ value: 999, label: 'Создать новый' });
        return (
            <div className="rec-item-content">
                <h6>{recommendation.Description}</h6>
                <p>{recommendation.HintText}</p>
                <div className="rec-item-action">
                    <div className="rec-item-input">
                        <FormInput type='select' options={opts} value={selectedItem} onChange={this.handleSelectionChange} />
                        <button className="button" onClick={this.onSaveClick}>Готово</button>
                    </div>
                    <button className="button rec-cancel-btn" onClick={this.onRejectClick}>Отказаться от выполнения</button>
                </div>
            </div>
        );
    }
}

@observer
export class InvestmentRecInner extends React.Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = { amount: props.recommendation.RecommendedAmount };
        this.store = new InvestmentStore();
    }
    componentDidMount() {

        this.store.setRecommendedAmount(this.props.recommendation.RecommendedAmount);
    }

    onAmountChange = (value) => {
        debugger;
        this.setState({ amount: value.value });
        this.store.setRecommendedAmount(this.props.recommendation.RecommendedAmount);
    }

    onSaveClick = () => {
        debugger;
        const { recommendation } = this.props;
        const { recommendedAmount } = this.store;
        debugger;
        const params = {
            Amount: Math.round(recommendedAmount),
            RecommendationType: recommendation.RecommendationType
        };
        var saveRes = saveInvestmentReq(params);
        saveRes.then(() => {
            SuccessToast('Рекомендация по инвестированию принята');
            const reportStore = getComp('CalcStore');
            reportStore.getReport(true);

        })
            .catch(err => {
                ErrorToast(err);
            });
    }
    onRejectClick = () => {
        const { recommendation } = this.props;
        const params = {
            RecommendationType: recommendation.RecommendationType
        };
        var saveRes = rejectInvestmentRec(params);
        saveRes.then(() => {
            SuccessToast('Рекомендация по инвестированию отклонена');
            const reportStore = getComp('CalcStore');
            reportStore.getReport(true);

        })
            .catch(err => {
                ErrorToast(err);
            });
    }

    render() {
        const { recommendation } = this.props;
        const {recommendedAmount} = this.store;
        const hasError = (recommendation.ErrorText != null && recommendation.ErrorText.length > 0);//Если есть ошибка, сделать кнопку Сохранить неактивной
        return (
            <div className="rec-item-content">
                <h6>{recommendation.Description}</h6>
                <p>{recommendation.HintText}</p>
                <div className="rec-item-action">
                    <div className="rec-item-input">
                        <FormInput type='money' value={recommendedAmount} label={'Сумма перевода, Р '} onChange={this.onAmountChange} />
                        <button className="button" disabled={hasError} onClick={this.onSaveClick}>Перевел</button>
                    </div>
                    {
                        hasError
                            ? <p className="rec-error">{recommendation.ErrorText}</p>
                            : null
                    }

                    <button className="button rec-cancel-btn" onClick={this.onRejectClick}>Отказаться от выполнения</button>
                </div>
            </div>
        );
    }


}