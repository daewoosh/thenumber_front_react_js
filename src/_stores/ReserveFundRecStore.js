import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { observable, action, toJS, computed, reaction } from 'mobx';
import { ajaxReq } from '_services/WebApi';


const loadAvailableHoldings = (params) => {
    const res = ajaxReq('GetAvailableHoldings', 'POST', params, true)
    return res;
};

const saveFinanceAsReserve = (params) => {
    const res = ajaxReq('MarkFinanceAsReserve', 'POST', params, true)
    return res;
}

const rejectOpenReserveRec = () => {
    const res = ajaxReq('RejectOpenReserveRecommendation', 'POST', {}, true)
    return res;
}


const initState = {
    holdings: [],
    selectedItem: 0,
    holdingsOptions: [],
}

export default class ReserveFundRecStore extends BSMobxStore {
    constructor() {
        super({
            // action: () => { },
            initState,
        });
    }

    @observable
    holdings = []

    @observable
    selectedItem = "0";

    @observable
    holdingsOptions = [];

    @action
    loadHoldings() {

        const params = {};
        var res = loadAvailableHoldings(params);
        res.then((data) => {
            // this.holdings = data;
            // // let options = [];
            // debugger;
            // for (let index = 0; index < this.holdings.length; index++) {
            //     const element = this.holdings[index];
            //     this.holdingsOptions.push({ value: element.Id, label: element.Label })
            // }
            this.setData(data);
        }).catch(err=>{});

        return res;
    }

    @action
    setData(data) {
        debugger;
        this.holdings = data;
        this.holdingsOptions = [];
        for (let index = 0; index < this.holdings.length; index++) {
            debugger;
            const element = this.holdings[index];
            this.holdingsOptions.push({ value: element.Id, label: element.Label })
        }
        this.selectedItem = 0;
    }

    @action
    setSelection(id) {
        this.selectedItem = id;
    }

    @action
    save() {
        const param = { financeId: this.selectedItem };
        var saveRes = saveFinanceAsReserve(param);
        return saveRes;
    }

    reject() {
        var rejectRes = rejectOpenReserveRec();
        return rejectRes;
    }
}