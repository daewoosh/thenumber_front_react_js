import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import bsAjaxMethod from 'bs_react_lib/utils/bsAjaxMethod';

import { observable, action, toJS, computed, reaction } from 'mobx';
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
        this.errors = {
            amount: '',
        }       
    }

    @observable
    datas = {}

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
    budgetDirection = 0;

    @observable
    id = 0;

    @observable
    errors = {};

    @computed
    get canFillDates() {
        const can = this.regularityId > 1;
        return can;
    }

    @computed
    get canSave() {
        return this.selectedTypeId > 0;
    }

    @action
    saveItem() {
        var validationRes = this.validate();
        if (validationRes === false)
            return false;
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

    validate = () => {
        if (this.canSave !== true)
            return false;
        var isValid = true;
        if (!this.amount) {
            this.errors['amount'] = "Обязательно для заполнения";
            isValid = false;
        }
        // else {
        //     this.errors['amount'] = "";
        // }
        if ((this.regularityId == 5 || this.regularityId == 1) && !this.eventDate) {
            this.errors['eventDateMonth'] = "Выберите месяц";
            isValid = false;
        }
        // else {
        //     this.errors['eventDateMonth'] = "";
        // }
        if (this.regularityId == 1 && !this.eventDate) {
            this.errors['eventDateDay'] = "Выберите дату";
            isValid = false;
        }
        // else {
        //     this.errors['eventDateDay'] = "";
        // }

        if (!this.regularityId || this.regularityId===0 ){
            this.errors['regularityId'] = "Выберите регулярность";
            isValid = false;
        }
        // else{
        //     this.errors['regularityId'] = "";
        // }

      
        this.setValidationReactions();
        return isValid;

    }

    @action
    setValidationReactions(){
        reaction(() => this.regularityId, () => {
            this.eventDate = "";
            this.errors["eventDateDay"] = "";
            this.errors["eventDateMonth"] = "";
        });
        reaction(() => this.eventDate, () => {
            this.errors["eventDateDay"] = "";
            this.errors["eventDateMonth"] = "";
        });
        reaction(() => this.amount, () => {
            this.errors["amount"] = "";
        });
        reaction(() => this.regularityId, () => {
            this.errors["regularityId"] = "";
        });
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
        this.label = data.Label;
        this.datas.amount = data.Amount;
        this.amount = data.Amount;
        this.selectedTypeId = data.BudgetTypeId;
        this.regularityId = data.RegularityId;

        this.startDate = data.StartDate;
        this.endDate = data.EndDate;
        this.id = data.Id;
        this.budgetDirection = data.BudgetDirection;
        if (data.StartDate || data.EndDate)
            this.hasDatesBorders = true;
        this.eventDate = data.EventDate;
        this.setValidationReactions();
    }
}