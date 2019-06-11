import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { getComp } from '../../bs_react_lib/utils/bsDI';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';
import { RecInnerContent, RecComp2 } from "./RecInnerContent";

//import  ReserveFundRecStore  from './ReserveFundRecStore';
import FormInput from '../FormInput/FormInput';
import { SuccessToast, ErrorToast } from '../Notification';
//import { getComp } from '../bs_react_lib/utils/bsDI';


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
                    <p>Вы отказались от открытия резервного счета</p>
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
                    <p>Вы выбрали  "{rec.FinanceLabel}" в качестве резервного</p>
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    );
}


@observer
export class ReserveFundOpenRecommendation extends React.Component {
    constructor(props) {
        super(props);
        //  this.store = getComp('ReserveFundRecStore');
        //  const { recommendation, index } = this.props;
        //this.handleSelectionChange = this.handleSelectionChange.bind(this);
        //  const notWorked = recommendation.IsAccepted === null;//определяем принималась/отклонялась рекомендация. если тру - значит нет
        this.state = { selectedAccount: 0 };
    }

    // componentDidMount() {
    //     const notWorked = this.props.recommendation.IsAccepted === null;//определяем принималась/отклонялась рекомендация. если тру - значит нет


    //     if (notWorked === true) {

    //         var loadRes = this.store.loadHoldings();
    //         // loadRes.then(() => {
    //         //     this.availableHoldings = this.store.holdings;
    //         //     debugger;
    //         // });

    //     }
    // }


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
        const { recommendation, index } = this.props;
        // this.availableHoldings = this.store.holdings;
        // const { selectedItem, holdings, holdingsOptions } = this.store;
        // let opts = [];
        // debugger;
        // if (holdingsOptions && holdingsOptions.length > 0) {
        //     opts = toJS(holdingsOptions);
        //     opts.push({ value: 999, label: 'Создать новый' });
        // }
        const notWorked = recommendation.IsAccepted === null;//определяем принималась/отклонялась рекомендация. если тру - значит нет
        //  let options = [];
        let template;
        // if (notWorked === true) {
        //     for (let index = 0; index < this.availableHoldings.length; index++) {
        //         const element = this.availableHoldings[index];
        //         options.push({ value: element.Id, label: element.Label })
        //     }
        // }
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
                    <AccordionItem className="rec-item" key={recommendation.Title + ' ' + index}>
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
                            <RecComp2 recommendation={recommendation}/>
                        </AccordionItemPanel>
                    </AccordionItem >
                </HideComponent>
            </Fragment >
        );
    }
}