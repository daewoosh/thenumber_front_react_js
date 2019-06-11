import React, { Fragment } from 'react';
import { observer, toJS } from 'mobx-react';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { getComp } from '../../bs_react_lib/utils/bsDI';
import { ajaxReq } from '_services/WebApi';
import NumberFormat from 'react-number-format';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import { ReserveFundRecStore } from './ReserveFundRecStore';
import FormInput from '../FormInput/FormInput';
import { SuccessToast, ErrorToast } from '../Notification';
import {InvestmentRecInner} from './RecInnerContent';

const saveInvestmentReq = (params) => {
    const res = ajaxReq('AcceptInvestmentRecommendation', 'POST', params, true)
    return res;
}

const rejectInvestmentRec = (params) => {
    const res = ajaxReq('RejectInvestmentRecommendation', 'POST', params, true)
    return res;
}


const getRejectedTemplate = (rec) => {
    return (
        <AccordionItem className="rec-item">
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className="rec-item-heading">
                        <span><img src="./assets/img/cancel_rounded.svg"/></span>
                        {rec.Title}
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="rec-item-content">
                    <h6>{rec.Description}</h6>
                    <p>{rec.HintText}</p>
                    <p>{'Вы отказались от инвестирования'}</p>
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    );
}


const getAcceptedTemplate = (rec) => {
    return (
        <AccordionItem className="rec-item">
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className="rec-item-heading">
                        <span><img src="./assets/img/check_rounded.svg"/></span>
                        {rec.Title}
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="rec-item-content">
                    <h6>{rec.Description}</h6>
                    <p> {rec.HintText}</p>
                    <p>Вы перевели <span> <NumberFormat
                            value={Math.round(rec.Amount)}
                            thousandSeparator=' '
                            displayType={'text'}
                            suffix=' &#8381;'
                        /></span></p>
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    );
}


@observer
export class InvestmentRecommendation extends React.Component {
    constructor(props) {
        super(props);
        //this.store = props.store;
        
    }

    state = { amount: this.props.recommendation.RecommendedAmount };
    // componentWillMount() {
    //     debugger;
    //     this.setState({ amount: this.props.recommendation.RecommendedAmount });
    // }

    onAmountChange = (value) => {
        debugger;
        this.setState({ amount: value.value });
    }

    onSaveClick = () => {
        debugger;
        const { recommendation } = this.props;
        const { amount } = this.state;
        debugger;
        const params = {
            Amount: amount,
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
        //const {investmentAmount}
        const { recommendation, index } = this.props;
        const notWorked = recommendation.IsAccepted === null;//определяем принималась/отклонялась рекомендация. если тру - значит нет
        let template;
        if (recommendation.IsAccepted === true)
            template = getAcceptedTemplate(recommendation);
        if (recommendation.IsAccepted === false)
            template = getRejectedTemplate(recommendation);
        const hasError = (recommendation.ErrorText != null && recommendation.ErrorText.length>0);//Если есть ошибка, сделать кнопку Сохранить неактивной
        return (
            <Fragment>
                <HideComponent isHide={notWorked === true}>
                    {template}
                </HideComponent>
                <HideComponent isHide={notWorked !== true}>
                    <AccordionItem className="rec-item">
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="rec-item-heading">
                                    <span 
                                        //className={'_current'}
                                    >
                                        {(index + 1)}
                                    </span>
                                    <h4>{' ' + recommendation.Title}</h4>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <InvestmentRecInner recommendation={recommendation}/>
                        </AccordionItemPanel>
                    </AccordionItem >
                </HideComponent>
            </Fragment>
        );
    }

}