import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import bsAjaxMethod from 'bs_react_lib/utils/bsAjaxMethod';

import { observable, action, toJS, computed, reaction } from 'mobx';
import { ajaxReq } from '_services/WebApi';
import { getComp } from '../bs_react_lib/utils/bsDI';
import moment from 'moment';


export const getAdditionalFields = (params) => {
    const res = ajaxReq('GetAdditionalFields', 'POST', params, true)
    return res;
}

export const saveFinanceItem = (params) => {
    const res = ajaxReq('SaveFinanceItem', 'POST', params, true)
    return res;
}

export const getFinanceItemById = (params) => {
    const res = ajaxReq('GetFinanceItemById', 'POST', params, true)
    return res;
}

export const removeFinanceItem = (params) => {
    const res = ajaxReq('RemoveFinanceItem', 'POST', params, true)
    return res;
}


export default class FinanceInputItemStore extends BSMobxStore {
    constructor() {
        super({
            // action: getIncomeTypes,
        });
        reaction(() => this.financeTypeId, this.updateFinanceSubTypes.bind(this));
        reaction(() => this.financeSubTypeId, this.getAdditionalFields.bind(this));
    }

    @observable
    id = 0;

    @observable
    financeGlobalTypeId = 0;

    @observable
    financeTypeId = 0;

    @observable
    financeSubTypeId = null;

    @observable
    amount = '';

    @observable
    additionalFields = []

    @observable
    subTypeSelected = false;

    @action
    updateFinanceSubTypes = () => {
        const financeStore = getComp('FinanceInputStore');
        financeStore.loadFinanceSubTypes(this.financeTypeId);
        this.financeSubTypeId = false;
        this.subTypeSelected = false;
        
    }

    @action
    getAdditionalFields() {
        var loadRes = this.loadAdditionalFields(this.financeSubTypeId);
    }


    @action
    saveItem() {
        const param = {
            Id: this.id,
            FinanceSubTypeId: this.financeSubTypeId,
            AdditionalFields: this.additionalFields,
            amount: this.amount,
        }
        var saveRes = saveFinanceItem(param);
        // saveRes.then((data) => {
        //     debugger;
        // });
        return saveRes;
    }

    @action
    loadAdditionalFields(id) {
        if (id > 0) {
            const param = { FinanceSubTypeId: id };
            debugger;
            if (this.id != '0')
                param.FinanceId = this.id;
            var getRes = getAdditionalFields(param);
            getRes.then((data) => {
                this.additionalFields = data;
                this.subTypeSelected = true;
            });
            return getRes;
        }
    }

    @action
    updateFieldValue = (value, fieldType, id) => {
        const val = this.getValue(value, fieldType);
        this.changeValue(val, id);
    }

    getValue(value, fieldType) {
        let val;
        if (fieldType == 'date')
            val = moment(value).toISOString();
        if (fieldType == 'simpleText')
            val = value.target.value;
        if (fieldType == 'percent'
            || fieldType == 'money'
            || fieldType == 'currency'
            || fieldType == 'country'
            || fieldType == 'region')
            val = value.value;
        return val;
    }

    changeValue = (value, id) => {
        var copy = toJS(this.additionalFields);
        const objIndex = copy.findIndex((obj => obj.Id == id));
        copy[objIndex].Value = value;
        this.additionalFields.replace(copy);
    }

    @action
    loadItem(id) {
        const params = { id: id };
        var getRes = getFinanceItemById(params);
        getRes.then((data) => {
            this.fillItem(data);
        });
    }

    fillItem = (data) => {
        debugger;
        this.id = data.Id;
        this.financeGlobalTypeId = data.FinanceGlobalTypeId;
        this.financeTypeId = data.FinanceTypeId;
        this.amount = data.Amount;
        this.additionalFields = data.AdditionalFields;
        this.financeSubTypeId = data.FinanceSubTypeId;
    }

    @action
    removeItem = (id) => {
        const param = { id: id };
        var removeRes = removeFinanceItem(param);
        return removeRes;
    }
}