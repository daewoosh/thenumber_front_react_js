import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { SuccessToast, ErrorToast } from '../_components/Notification';

import { observable, action, toJS, computed } from 'mobx';
import { ajaxReq } from '_services/WebApi';

export const getActivesItems = (params) => {
    const res = ajaxReq('GetActivesList', 'POST', params, true)
    return res;
};

export const getPassiveItems = (params) => {
    const res = ajaxReq('GetPassivesList', 'POST', params, true)
    return res;
};

export const getPassiveTypes = (params) => {
    const res = ajaxReq('GetPasssiveTypes', 'POST', params, true)
    return res;
};

export const getActiveTypes = (params) => {
    const res = ajaxReq('GetActiveTypes', 'POST', params, true)
    return res;
};

export const getFinanceSubTypes = (params) => {
    const res = ajaxReq('GetFinanceSubTypes', 'POST', params, true)
    return res;
}

export const getAdditionalFields = (params) => {
    const res = ajaxReq('GetAdditionalFields', 'POST', params, true)
    return res;
}



export default class FinanceInputStore extends BSMobxStore {
    constructor() {
        super();
    }

    @observable
    showModalForm = false;

    @observable
    formType = '';

    @observable
    modalFormMode = 'create';

    @observable
    modalTitle = '';

    @observable
    activeItems = [];

    @observable
    passiveItems = [];

    @observable
    activeTypes = [];

    @observable
    passiveTypes = [];

    @observable
    currentTypes = [];

    @observable
    currentSubTypes = [];

    @observable
    additionalFields = []

    @computed
    get activeSum() {
        return this.activeItems.reduce(function (prevSum, currentEl) {            
            return prevSum + currentEl.Amount;
        }, 0);
    }

    @computed
    get passiveSum() {
        return this.passiveItems.reduce(function (prevSum, currentEl) {            
            return prevSum + currentEl.Amount;
        }, 0);
    }

    @computed
    get financeTotal() {
        return this.activeSum - this.passiveSum;
    }


    @action
    loadActiveItems() {
        var getRes = getActivesItems();
        getRes.then((data) => {
            this.activeItems = data;
        });
    }

    @action
    loadPassiveItems() {
        var getRes = getPassiveItems();
        getRes.then((data) => {
            this.passiveItems = data;
        });
    }
    @action
    setFinanceTypesList(type) {
        if (type == '1')
            this.currentTypes = this.activeTypes;
        if (type == '2')
            this.currentTypes = this.passiveTypes;
    }

    @action
    loadFinanceSubTypes(id) {
        const param = { id: id };
        var getRes = getFinanceSubTypes(param);
        getRes.then((data) => {
            this.currentSubTypes = data;
        })
            .catch((err) => {
                //TODO
            });
    }

    // @action
    // loadAdditionalFields(id) {
    //     const param = { subTypeId: id };
    //     var getRes = getAdditionalFields(param);
    //     getRes.then((data) => {
    //         this.additionalFields = data;
    //     });
    //     return getRes;
    // }

    activeTypesLoaded = false;
    @action
    getActiveTypes() {
        if (this.activeTypesLoaded === false) {
            var loadRes = getActiveTypes();
            loadRes.then((data) => {
                this.activeTypes = data;
                this.activeTypesLoaded = true;
            });
        }
    }

    passiveTypesLoaded = false;
    @action
    getPassiveTypes() {
        if (this.passiveTypesLoaded === false) {
            var loadRes = getPassiveTypes();
            loadRes.then((data) => {
                this.passiveTypes = data;
                this.passiveTypesLoaded = true;
            });
        }
    }

    @action
    toggleShowModal() {
        this.showModalForm = !this.showModalForm;
    }

}