import React, { Fragment } from 'react';
import { observer, toJS } from 'mobx-react';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { getComp } from '../../bs_react_lib/utils/bsDI';
import { ajaxReq } from '_services/WebApi';
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


const saveRecommendation = (params) => {
    const res = ajaxReq('AcceptOpenBrokerageAccountRecommendation', 'POST', {}, true)
    return res;
}

const rejectRecommendation = (params) => {
    const res = ajaxReq('RejectOpenBrokerageAccountRecommendation', 'POST', params, true)
    return res;
}

const getRejectedTemplate = (rec) => {
    return (
        <AccordionItem className="rec-item">
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className="rec-item-heading">
                        <span><img src="./assets/img/cancel_rounded.svg" /></span>
                        {rec.Title}
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="rec-item-content">
                    <h6>{rec.Description}</h6>
                    <p>{rec.HintText}</p>
                    <p>{'Вы отказались от открытия ИИС счета '}</p>
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
                        <span><img src="./assets/img/check_rounded.svg" /></span>
                        {rec.Title}
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="rec-item-content">
                    <h6>{rec.Description}</h6>
                    <p>{rec.HintText}</p>
                    <p>{'Вы открыли брокерский счет'}</p>
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    );
}

@observer
export class BrokerageAccountRecommendation extends React.Component {
    constructor(props) {
        super(props);

    }

    onSaveClick = () => {
        var saveRes = saveRecommendation();
        saveRes.then(() => {
            SuccessToast('Брокерский счет создан');
            const reportStore = getComp('CalcStore');
            reportStore.getReport(true);

        })
            .catch(err => {
                ErrorToast(err);
            });
    }
    onRejectClick = () => {
        var rejectRes = rejectRecommendation();
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
        const { recommendation, index } = this.props;       
        const notWorked = recommendation.IsAccepted === null;//определяем принималась/отклонялась рекомендация. если тру - значит нет
        let template;
               if (recommendation.IsAccepted === true)
            template = getAcceptedTemplate(recommendation);
        if (recommendation.IsAccepted === false)
            template = getRejectedTemplate(recommendation);
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
                            <div className="rec-item-content">
                                <h6>{recommendation.Description}</h6>
                                <p>{recommendation.HintText}</p>
                                <div className="rec-item-action">
                                    {/* <FormInput type='select' options={options} value={selectedItem} onChange={(el) => this.handleSelectionChange(el)} /> */}
                                    <div className="rec-item-input">
                                        <button className="button" onClick={this.onSaveClick}>Готово</button>
                                    </div>
                                    <button className="button rec-cancel-btn" onClick={this.onRejectClick}>Отказаться от выполнения</button>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem >
                </HideComponent>
            </Fragment >
        );
    }
}