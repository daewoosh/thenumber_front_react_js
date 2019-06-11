import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { observable, action, toJS, computed, reaction } from 'mobx';
import { ajaxReq } from '_services/WebApi';

export default class InvestmentStore extends BSMobxStore {
    @observable
    recommendedAmount = 0;

    @action 
    setRecommendedAmount(value){
        debugger;
        this.recommendedAmount = value;
    }
}
