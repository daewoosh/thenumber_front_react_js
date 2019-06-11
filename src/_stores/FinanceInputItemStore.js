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
    label = "";

    @observable
    labelError = "";

    @observable
    subTypeUniqueCode = "";

    @observable
    subTypeSelected = false;

    @observable
    isReserve = false;

    @computed
    get canSave() {
        return this.financeTypeId > 0 && this.financeSubTypeId > 0;
    }

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
        var validationRes = this.validate();
        if (validationRes === false)
            return false;

        const param = {
            Id: this.id,
            FinanceSubTypeId: this.financeSubTypeId,
            AdditionalFields: this.additionalFields,
            amount: this.amount,
            Label: this.label,
            UniqueCode: this.subTypeUniqueCode,
            IsReserve: this.isReserve,
        }
        var saveRes = saveFinanceItem(param);
        // saveRes.then((data) => {
        //     debugger;
        // });
        return saveRes;
    }

    validate = () => {
        if (this.canSave !== true)
            return false;
        var isValid = true;
        if (!this.label) {
            isValid = false;
            this.labelError = "Обязательное поле";
        }
        for (var i = 0; i < this.additionalFields.length; i++) {
            var item = this.additionalFields[i];
            if (this.additionalFields[i].UniqueCode == "$F_L4_AMOUNT" && !this.additionalFields[i].Value) {
                this.additionalFields[i].error = "Обязательное поле";
                isValid = false;
            }
            if (this.additionalFields[i].UniqueCode == "$F_L4_PERCENT" && !this.additionalFields[i].Value) {
                this.additionalFields[i].error = "Обязательное поле";
                isValid = false;
            }
            if (this.additionalFields[i].UniqueCode == "$F_L4_OPEN_DATE" && !this.additionalFields[i].Value) {
                this.additionalFields[i].error = "Обязательное поле";
                isValid = false;
            }
        }
        return isValid;
    }

    @action
    loadAdditionalFields(id) {
        if (id > 0) {
            const param = { FinanceSubTypeId: id };
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
        copy[objIndex].error = "";//при смене значения в доп полне снимаем ошибку на нем
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
        this.id = data.Id;
        this.financeGlobalTypeId = data.FinanceGlobalTypeId;
        this.financeTypeId = data.FinanceTypeId;
        this.amount = data.Amount;
        this.additionalFields = data.AdditionalFields;
        this.financeSubTypeId = data.FinanceSubTypeId;
        this.label = data.Label;
        this.subTypeUniqueCode = data.UniqueCode;
        this.isReserve = data.IsReserve;
    }

    @action
    removeItem = (id) => {
        const param = { id: id };
        var removeRes = removeFinanceItem(param);
        return removeRes;
    }
}