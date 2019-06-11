import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { SuccessToast, ErrorToast } from '../_components/Notification';

import { observable, action, toJS, computed } from 'mobx';
import { ajaxReq } from '_services/WebApi';


export const getIncomeTypes = (params) => {
    const res = ajaxReq('GetIncomeTypes', 'POST', params, true)
    return res;
};

export const getExpencesTypes = (params) => {
    const res = ajaxReq('GetExpencesTypes', 'POST', params, true)
    return res;
};


export const getIncomeItems = (params) => {
    const res = ajaxReq('GetUserIncomesList', 'POST', params, true)
    return res;
};

export const getExpencesItems = (params) => {
    const res = ajaxReq('GetUserExpencesList', 'POST', params, true)
    return res;
};

export const removeBudgetItem = (params) => {
    const res = ajaxReq('RemoveBudgetItem', 'POST', params, true)
    return res;
};

export default class BudgetInputStore extends BSMobxStore {
    constructor() {
        super({
            action: getIncomeTypes,
        });
        //  this.loadParams = this.currentIndex;
    }

    @observable
    showModalForm = false;

    @observable
    modalFormMode = 'create';

    @observable
    modalTitle = '';

    @observable
    incomeItems = []

    @observable
    expenceItems = []

    @observable
    incomeTypes = []

    @observable
    expenceTypes = []

    @observable
    currentTypes = []

    @computed
    get incomeSum() {
        return this.incomeItems.reduce(function (prevSum, currentEl) {
            return prevSum + currentEl.Amount;
        }, 0);
    }

    @computed
    get expenceSum() {
        return this.expenceItems.reduce(function (prevSum, currentEl) {
            return prevSum + currentEl.Amount;
        }, 0);
    }

    @computed
    get budgetTotal() {
        return this.incomeSum - this.expenceSum;
    }

    @action
    loadIncomeItems() {
        var dt = getIncomeItems();
        dt.then((data) => {
            this.incomeItems = data;
            this.wasLoaded = true;
        });

    }

    @action
    loadIncomeTypes() {
        var dt2 = getIncomeTypes();
        dt2.then((data) => {
            this.incomeTypes = data;
        });
    }

    @action
    loadExpenceTypes() {
        var dt2 = getExpencesTypes();
        dt2.then((data) => {
            this.expenceTypes = data;
        });
    }

    @action
    addBudgetItem(item) {
        if (item.budgetDirection == '1')
            this.loadIncomeItems();
        else
            this.expenceItems.push(item);
    }

    @action
    loadExpenceItems() {
        var dt = getExpencesItems();
        dt.then((data) => {
            this.expenceItems = data;
        });

    }

    getBudgetTypesList(type) {
        if (type == '1')
            return this.incomeTypes;
        return this.expenceTypes;
    }

    @action
    setBudgetTypesList(type) {
        if (type == '1') {
            this.currentTypes = this.incomeTypes;
            this.modalTitle = 'дохода';
        }
        if (type == '2') {
            this.currentTypes = this.expenceTypes;
            this.modalTitle = 'расхода';
        }
    }

    @action
    toggleShowModal() {
        this.showModalForm = !this.showModalForm;
    }

    @action
    removeItem(id, budgetDirection) {
        var param = { id: id };
        var removeRes = removeBudgetItem(param);
        removeRes
            .then(() => {
                this.removeFromStore(id, budgetDirection);
                SuccessToast('Данные успешно удалены');
            })
            .catch((err) => { ErrorToast(err) });
        return removeRes;

    }

    removeFromStore(id, budgetDirection) {
        if (budgetDirection == '1') {
            var inputCopy = toJS(this.incomeItems);
            var myArray = inputCopy.filter(function (obj) {
                return obj.Id !== id;
            });
            this.incomeItems.replace(myArray);
        }
        if (budgetDirection == '2') {
            var inputCopy = toJS(this.expenceItems);
            var myArray = inputCopy.filter(function (obj) {
                return obj.Id !== id;
            });
            this.expenceItems.replace(myArray);
        }
    }
}