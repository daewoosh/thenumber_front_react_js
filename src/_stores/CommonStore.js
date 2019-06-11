import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import { observable, action, toJS, computed, reaction } from 'mobx';
import { ajaxReq } from '_services/WebApi';

export default class CommonStore extends BSMobxStore {
    constructor() {
        super({
            action: () => { },
        });
    }

    @observable
    changeAvatar = true;

    @action
    toggleRefreshAvatar = () => {
        this.changeAvatar = !this.changeAvatar;
    }

}