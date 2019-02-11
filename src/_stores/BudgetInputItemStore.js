import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import bsAjaxMethod from 'bs_react_lib/utils/bsAjaxMethod';

import { observable, action, toJS, computed } from 'mobx';
import { ajaxReq } from '_services/WebApi';

export const getBudgetItemById = (params) => {
    const res = ajaxReq('GetBudgetItemById', 'POST', params, true)
    return res;
};

export const getRecommendationFullInfo = (params = {}) => {
    const res = bsAjaxMethod({
        serverMethodName: 'GetBudgetItemById ',
        sendMethod: 'POST',
        params,
        actionId: 'GetBudgetItemById',
        //successMessage: 'Рекомендация успешно отклонена',
    });
    return res;
};

export const saveBudgetItem = (params) => {
    const res = ajaxReq('SaveBudgetItem', 'POST', params, true)
    return res;
};


export default class BudgetInputItemStore extends BSMobxStore {
    constructor() {
        super({
            // action: getIncomeTypes,
        });
    }

    @observable
    label = '';

    @observable
    amount = '';

    @observable
    selectedTypeId = 0;

    @observable
    regularityId = 0;

    @observable
    eventDate = '';

    @observable
    startDate = '';

    @observable
    endDate = '';

    @observable
    showDatesInputes = false;

    @observable
    hasDatesBorders = false;

    @observable
    budgetDirection = 0

    @observable
    id = 0;

    @computed
    get canFillDates() {
        debugger;
        const can = this.regularityId > 1;
        return can;
    }

    saveItem() {
        const param = {
            Label: this.label,
            Amount: this.amount,
            BudgetTypeId: this.selectedTypeId,
            EventDate: this.eventDate,
            StartDate: this.startDate,
            EndDate: this.endDate,
            RegularityId: this.regularityId,
            BudgetDirection: this.budgetDirection,
            Id: this.id,
        }
        var saveRes = saveBudgetItem(param);
        // saveRes.then(() => {
        //     //todo add new Item to list store

        // }).catch((err) => {
        //     //to do show error toast
        // });
        return saveRes;
    }

    @action
    loadItem(id) {
        const params = {
            id: id,
        }
        var res = getBudgetItemById(params);
        res.then((data) => {
            this.fillItem(data)
        })
            .catch((err) => {
                //TODO Error toast
            });
    }

    @action
    fillItem = (data) => {
        debugger;
        this.label = data.Label;
        this.amount = data.Amount;
        this.selectedTypeId = data.BudgetTypeId;
        this.eventDate = data.EventDate;
        this.startDate = data.StartDate;
        this.endDate = data.EndDate;
        this.regularityId = data.RegularityId;
        this.id = data.Id;
        this.budgetDirection = data.BudgetDirection;
        if (data.StartDate || data.EndDate)
            this.hasDatesBorders = true;
    }

}