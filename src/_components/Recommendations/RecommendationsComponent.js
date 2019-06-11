import React, { Fragment } from 'react';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { observer, toJS } from 'mobx-react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

//import Accordion from 'react-responsive-accordion';

import { ReserveFundOpenRecommendation } from './ReserveFundOpenRecommendation';
import { InvestmentRecommendation } from './InvestmentRecommendation';
import { IISAccountRecommendation } from './IISAccountRecommendation';
import {BrokerageAccountRecommendation} from './BrokerageAccountRecommendation';

import 'react-accessible-accordion/dist/fancy-example.css';

const getReserveFundOpenTemplate = (recommendation, index) => {
    const p =<ReserveFundOpenRecommendation recommendation={recommendation} index={index} />;
    return p;
}

const getInvestmentRecommendatioTemplate = (recommendation, index) => {
    return <InvestmentRecommendation recommendation={recommendation} index={index} />
}

const getOpenIISAccountTemplate = (recommendation, index) => {
    return <IISAccountRecommendation recommendation={recommendation} index={index} />
}

const getOpenBrokerageAccountTemplate = (recommendation, index) => {
    return <BrokerageAccountRecommendation recommendation={recommendation} index={index} />
}

const getRecommendationTemplate = (recommendation, index) => {
    let template = null;
    if (recommendation.RecommendationType == "1")
        template = getReserveFundOpenTemplate(recommendation, index);
    if (recommendation.RecommendationType == "4")
        template = getOpenIISAccountTemplate(recommendation, index);
    if (recommendation.RecommendationType == "7")
        template = getOpenBrokerageAccountTemplate(recommendation, index);
    if (recommendation.RecommendationType == "2"
        || recommendation.RecommendationType == "3"
        || recommendation.RecommendationType == "5"
        || recommendation.RecommendationType == "6"
        || recommendation.RecommendationType == "8"
        || recommendation.RecommendationType == "9")
        template = getInvestmentRecommendatioTemplate(recommendation, index);
    return template;
}

@observer
export class RecommendationComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { recommendations } = this.props;
        return (
            <div className="user-plans-container">
            
                <h5>В этом месяце мы рекомендуем</h5>
                {/* <ReserveFundOpenRecommendation recommendation={recommendations[0]} index={1} /> */}
                <Accordion allowZeroExpanded={true}>
                    {recommendations.map((rec, i) => {
                        let title = rec.Title;
                        let template = getRecommendationTemplate(rec, i);
                        return (
                            <Fragment key={rec.OrderNumber}>
                                {template}
                            </Fragment>
                        )
                    })}
                </Accordion>
            </div>
        );
    }
}

